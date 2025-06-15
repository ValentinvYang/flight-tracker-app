from datetime import datetime
from amadeus import Client, ResponseError
from pymongo import MongoClient

# Replace these with your Amadeus API credentials
API_KEY = 'OsDkj8KrE3G0gG0DdsgzAM6SCG3Cz0qM'
API_SECRET = 'GxUX4izJB2cawtju'

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['flight-tracker']
collection = db['flight-data']

def fetch_flight_offers(origin, destination, departure_date, adults=1):
    amadeus = Client(client_id=API_KEY, client_secret=API_SECRET)
    try:
        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=origin,
            destinationLocationCode=destination,
            departureDate=departure_date,
            adults=adults,
            max=5  # increase as needed
        )
        return response.data
    except ResponseError as error:
        print(f"Error fetching flight offers: {error}")
        return None

def insert_data_into_mongo(data):
    if not data:
        print("No data to insert.")
        return
    
    # Insert either a list of documents or a single document
    if isinstance(data, list):
        result = collection.insert_many(data)
        print(f"Inserted {len(result.inserted_ids)} documents into MongoDB.")
    elif isinstance(data, dict):
        result = collection.insert_one(data)
        print(f"Inserted one document with id: {result.inserted_id}")
    else:
        print("Unexpected data format for insertion.")

if __name__ == "__main__":
    origin = 'ZRH'         # Zurich
    destination = 'LAX'    # Reykjavik
    departure_date = '2025-12-23'
    adults = 1

    print(f"Fetching flight offers from {origin} to {destination} on {departure_date}...")
    flight_data = fetch_flight_offers(origin, destination, departure_date, adults)

    if flight_data:
        insert_data_into_mongo(flight_data)
    else:
        print("No data fetched.")
