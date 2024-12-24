from utils.query_db import query_db
import bcrypt

def create_user(username, password):
    try: 
        hash_password = bcrypt.hashpw(password.encode("UTF-8"), bcrypt.gensalt())
        query = f"""
            INSERT INTO users (username, password)
            VALUES ('{username}', '{hash_password.decode("UTF-8")}'); 
        """
        response = query_db(query)
        return response
    
    except Exception as e:
        if "duplicate key value violates unique constraint" in str(e):
            return {"error" : "username already exists"}
        else:
            return {"error" : str(e)}
