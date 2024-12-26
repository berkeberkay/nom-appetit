from services.recommendations_service import * 
from utils.token_required import token_required
from utils.recommender_system import RecommenderSystem
from flask import Blueprint, request

recommender = RecommenderSystem()
recommender.train("../data/yelp_academic_dataset_business.json", "Vancouver")

recommendations = Blueprint("recommendations", __name__)

@recommendations.get("/recommendations")
@token_required
def get_recommendations_route():
    try: 
        user_preferences = request.args.get('user_preferences').split(", ")
        if not user_preferences:
            raise Exception("User preferences are required") 
        response = generate_recommendations(user_preferences, recommender)
        if "error" in response:
            raise Exception(response.get("error")) 
        return {"recommendations" : response}, 200
    
    except Exception as e:
        return {"error" : str(e)}, 400