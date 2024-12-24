from services.profiles_service import * 
from flask import Blueprint, request

profiles = Blueprint("profiles", __name__)

@profiles.get("/profiles/<username>")
def get_profiles_route(username):
    try:
        if not username:
            raise Exception("username is missing") 
        response = get_profile(username)
        if "error" in response:
            raise Exception(response.get("error")) 
        return {"data" : response}, 200

    except Exception as e:
        return {"error" : str(e)}, 400