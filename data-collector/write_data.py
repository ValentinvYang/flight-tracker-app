import json
import os
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['flight-tracker']
collection = db['school']

# Load JSON data from file
filename = 'flight_offers.json'
script_dir = os.path.dirname(os.path.abspath(__file__))
filepath = os.path.join(script_dir, filename)
with open(filepath, 'r') as file:
    data = json.load(file)

# Insert data into MongoDB
# If the JSON file contains a dictionary representing one document:
if isinstance(data, dict):
    result = collection.insert_one(data)
    print(f"Inserted one document with id: {result.inserted_id}")

# If the JSON file contains a list of documents:
elif isinstance(data, list):
    result = collection.insert_many(data)
    print(f"Inserted {len(result.inserted_ids)} documents.")

else:
    print("Unexpected JSON format: must be a dict or list of dicts.")
