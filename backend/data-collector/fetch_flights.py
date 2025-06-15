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

def fetch_flight_offers(origin, destination, departure_date, adults=1):
    try:
        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=origin,
            destinationLocationCode=destination,
            departureDate=departure_date,
            adults=adults,
            max=1  # increase as needed
        )
        return response.data
    except ResponseError as error:
        print(f"Amadeus API error for flight {origin}->{destination} on {departure_date}: {error}")
        return None

def process_user_flights(user_data):
    username = user_data.get("username")
    flights = user_data.get("flights", [])

    if not username or not flights:
        print("Invaled user data: missing username or flights")
        return
    
    # Build updates for each flight
    flight_docs = []
    for flight in flights:
        departure = flight.get("departure")
        arrival = flight.get("arrival")
        departure_date = flight.get("departureDate")

        if not departure or not arrival or not departure_date:
            print(f"Skipping invalid flight entry: {flight}")
            continue

        flight_offers = fetch_flight_offers(departure, arrival, departure_date)
        if flight_offers:
            flight_docs.append({
                "departure": departure,
                "arrival": arrival,
                "departureDate": departure_date,
                "offers": flight_offers,
                "trackedAt": datetime.now(timezone.utc)
            })

    if not flight_docs:
        print("No valid flight offers fetched.")
        return
    
    update_result = collection.update_one(
        {"username": username}, 
        {"$push": {"trackedFlights": {"$each": flight_docs}}},
        upsert=True
    )

    if update_result.upserted_id:
        print(f"Created new user document for {username} ✅")
    else:
        print(f"Updated flight data for user {username} ✅")
    

if __name__ == "__main__":

    script_dir = os.path.dirname(os.path.abspath(__file__))  # folder where the script lives
    json_path = os.path.join(script_dir, "example.json")    # full path to example.json

    # Simulate loading JSON input from your own API or file
    with open(json_path, "r") as f:
        user_request_data = json.load(f)

    process_user_flights(user_request_data)
