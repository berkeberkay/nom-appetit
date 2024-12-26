from services.recommendation_service import * 
from utils.token_required import token_required
from utils.recommender_system import RecommenderSystem
from flask import Blueprint, request

recommender = RecommenderSystem()
recommender.train("../data/yelp_academic_dataset_business.json", "Vancouver")

recommendation = Blueprint("recommendation", __name__)

@recommendation.get("/recommendation")
@token_required
def get_recommendations_route():
    try: 
        user_preferences = request.args.get('user_preferences').split(", ")
        response = generate_recommendation(user_preferences, recommender)
        if "error" in response:
            raise Exception(response.get("error")) 
        return {"data" : response}, 200
    
    except Exception as e:
        return {"error" : str(e)}, 400