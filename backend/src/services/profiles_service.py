from utils.query_db import query_db

def post_profile(username):
    query = f"""
        INSERT INTO profiles (username, preferences, saved)
        VALUES ('{username}', '', ''); 
    """
    response = query_db(query)
    return response

def get_profile(username):
    query = f"""
        SELECT *
        FROM profiles
        WHERE username = '{username}'
    """
    params = ["username", "preferences", "saved"]
    response = query_db(query, params, "row")
    return response
