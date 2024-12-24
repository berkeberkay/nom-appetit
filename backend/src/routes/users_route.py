from services.users_service import * 
from services.profiles_service import * 
from services.token_service import *
from flask import Blueprint, request
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY") 

users = Blueprint("users", __name__)

@users.post("/users")
def post_users_route():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        if not username:
            raise Exception("username is missing") 
        if not password:
            raise Exception("password is missing")
        response_users = post_user(username, password)
        if response_users and "error" in response_users:
            raise Exception(response_users.get("error"))
        response_profiles = post_profile(username)
        if response_profiles and "error" in response_profiles:
            raise Exception(response_profiles.get("error"))
        response_token = post_token(username, password, SECRET_KEY)
        if response_token and "error" in response_token:
            raise Exception(response_token.get("error"))
        return {"token" : response_token}, 200

    except Exception as e:
        return {"error" : str(e)}, 400