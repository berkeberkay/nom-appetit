from functools import wraps
from dotenv import load_dotenv
from flask import request, g
import jwt
import os

load_dotenv()

JWT_KEY = os.getenv("JWT_KEY") 

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                raise Exception("authorization header is missing") 
            token = request.headers["Authorization"].split()[1]
            if not token:
                raise Exception("Token is missing")
            try: 
                jwt.decode(token, JWT_KEY, algorithms="HS256")
            except jwt.InvalidTokenError:
                raise Exception("Token is invalid")
            except jwt.ExpiredSignatureError:
                raise Exception("Token has expired")

        except Exception as e:
            return {"error" : str(e)}, 401
        
        return func(*args, **kwargs)

    return decorated