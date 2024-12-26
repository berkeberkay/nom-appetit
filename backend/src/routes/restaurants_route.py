from services.restaurants_service import *
from utils.token_required import token_required
from flask import Blueprint, request

restaurants = Blueprint("restaurants", __name__)

@restaurants.get("/restaurants")
@token_required
def get_restaurants_route():
    try:
        location = request.args.get('location')
        latitude = request.args.get('latitude')
        longitude = request.args.get('longitude')
        keywords = request.args.get('keywords')
        response = search_restaurants(location, latitude, longitude, keywords)
        if "error" in response:
            raise Exception(response.get("error")) 
        return {"data" : response}, 200

    except Exception as e:
        return {"error" : str(e)}, 400