from dotenv import load_dotenv
import requests
import os

load_dotenv('./services/secrets/.env')

YELP_KEY = os.getenv('YELP_KEY')
SEARCH_URL = "https://api.yelp.com/v3/businesses/search"

headers = {
    "accept": "application/json",
    "Authorization": 'Bearer %s' % YELP_KEY
}

def search_restaurants(location, latitude, longitude, keywords):
    try:
        params = {
            "radius": 25000,
            "sort_by": "rating",
            "limit": 25
        }
        if keywords: 
            params["term"] = "restaurant" + keywords
        else:
            params["term"] = "restaurant"
        if location:
            params["location"] = location
        elif longitude and latitude:
            params["longitude"] = longitude
            params["latitude"] = latitude
        else:
            raise Exception("a valid location or both longitude and latitude must be defined.")
        response = requests.get(SEARCH_URL, params=params, headers=headers).json()
        if "error" in response:
            raise Exception(response.get("error"))
        response_array = response.get("businesses")
        return response_array

    except Exception as e:
        return {"error" : str(e)}
    