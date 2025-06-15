import json
import os
from datetime import datetime, timezone
from amadeus import Client, ResponseError
from pymongo import MongoClient, UpdateOne

# Replace these with your Amadeus API credentials
API_KEY = 'OsDkj8KrE3G0gG0DdsgzAM6SCG3Cz0qM'
API_SECRET = 'GxUX4izJB2cawtju'

# Setup Amadeus client
amadeus = Client(client_id=API_KEY, client_secret=API_SECRET)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['flight-tracker']
collection = db['flight-data']

def get_user(username):
    return collection.find_one({"username": username})

def route_exists(username, departure, arrival, departure_date):
    return collection.find_one({
        "username": username,
        "routes.depature": departure,
        "routes.arrival": arrival,
        "routes.departureDate": departure_date
    }) is not None

def add_route(username, departure, arrival, departure_date, tracked_flight_entry):
    new_route = {
        "departure": departure,
        "arrival": arrival,
        "departureDate": departure_date,
        "trackedFlights": [tracked_flight_entry]
    }
    collection.update_one(
        {"username": username},
        {"$push": {"routes": new_route}}
    )
    print(f"Added new route {departure}->{arrival} for user {username}")

def add_tracked_flight_to_route(username, departure, arrival, tracked_flight_entry):
    collection.update_one(
        {
            "username": username,
            "routes.departure": departure,
            "routes.arrival": arrival
        },
        {
            "$push": {"routes.$.trackedFlights": tracked_flight_entry}
        }
    )
    print(f"Added tracked flight to existing route {departure}->{arrival} for user {username}")

def create_user_with_route(username, departure, arrival, departure_date, tracked_flight_entry):
    new_doc = {
        "username": username,
        "routes": [
            {
                "departure": departure,
                "arrival": arrival,
                "departureDate": departure_date,
                "trackedFlights": [tracked_flight_entry]
            }
        ]
    }
    collection.insert_one(new_doc)
    print(f"Created new user and added route {departure}->{arrival} for user {username}")

def fetch_flight_offers(departure, arrival, departure_date, adults=1):
    try:
        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=departure,
            destinationLocationCode=arrival,
            departureDate=departure_date,
            adults=adults,
            max=1  # increase as needed
        )
        return response.data
    except ResponseError as error:
        print(f"Amadeus API error for flight {departure}->{arrival} on {departure_date}: {error}")
        return None

def process_user_flights(user_data):
    username = user_data.get("username")
    flights = user_data.get("flights", [])

    if not username or not flights:
        print("Invaled user data: missing username or flights")
        return
    
    # Build updates for each flight
    for flight in flights:
        departure = flight.get("departure")
        arrival = flight.get("arrival")
        departure_date = flight.get("departureDate")

        if not departure or not arrival or not departure_date:
            print(f"Skipping invalid flight entry: {flight}")
            continue

        flight_offers = fetch_flight_offers(departure, arrival, departure_date)
        if not flight_offers:
            print(f"No offers for {departure} -> {arrival} on {departure_date}")
            continue

        tracked_flight_entry = {
            "departureDate": departure_date,
            "offers": flight_offers,
            "trackedAt": datetime.now(timezone.utc)
        }

        user_doc = get_user(username)

        if not user_doc:
            # No user yet
            create_user_with_route(username, departure, arrival, departure_date, tracked_flight_entry)
            continue

        if route_exists(username, departure, arrival, departure_date):
            add_tracked_flight_to_route(username, departure, arrival, tracked_flight_entry)
        else:
            add_route(username, departure, arrival, departure_date, tracked_flight_entry)
    

if __name__ == "__main__":

    script_dir = os.path.dirname(os.path.abspath(__file__))  # folder where the script lives
    json_path = os.path.join(script_dir, "example.json")    # full path to example.json

    # Simulate loading JSON input from your own API or file
    with open(json_path, "r") as f:
        user_request_data = json.load(f)

    process_user_flights(user_request_data)
