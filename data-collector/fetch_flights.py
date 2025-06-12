import os
import json
from datetime import datetime
from amadeus import Client, ResponseError

# Replace these with your Amadeus API credentials
API_KEY = 'OsDkj8KrE3G0gG0DdsgzAM6SCG3Cz0qM'
API_SECRET = 'GxUX4izJB2cawtju'

def fetch_flight_offers(origin, destination, departure_date, adults=1):
    amadeus = Client(client_id=API_KEY, client_secret=API_SECRET)
    try:
        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=origin,
            destinationLocationCode=destination,
            departureDate=departure_date,
            adults=adults,
            max=5  # limit the number of results
        )
        return response.data
    except ResponseError as error:
        print(f"Error fetching flight offers: {error}")
        return None

def save_data_locally(data, filename='flight_offers.json'):
    # Get absolute path of the folder
    script_dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(script_dir, filename)

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Saved data to {filepath}")

if __name__ == "__main__":
    # Example parameters
    origin = 'LON'  # London
    destination = 'NYC'  # New York City
    departure_date = '2025-07-01'  # YYYY-MM-DD
    adults = 1

    print(f"Fetching flight offers from {origin} to {destination} on {departure_date}...")
    flight_data = fetch_flight_offers(origin, destination, departure_date, adults)

    if flight_data:
        save_data_locally(flight_data)
    else:
        print("No data fetched.")
