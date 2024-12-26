from services.token_service import *
from flask import Blueprint, request
from dotenv import load_dotenv
import os

load_dotenv()

JWT_KEY = os.getenv("JWT_KEY") 

token = Blueprint("token", __name__)

@token.post("/token")
def post_token_route():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        if not username:
            raise Exception("username is missing") 
        if not password:
            raise Exception("password is missing")
        response = create_token(username, password, JWT_KEY)
        if "error" in response:
            raise Exception(response.get("error")) 
        return {"data" : response}, 200

    except Exception as e:
        return {"error" : str(e)}, 400
