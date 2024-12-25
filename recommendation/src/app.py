from recommender_system import RecommenderSystem
from flask import Flask, request

app = Flask(__name__)

recommender = RecommenderSystem()
recommender.train("../data/yelp_academic_dataset_business.json", "Vancouver")

@app.get("/recommendations")
def get_recommendations_route():
    try: 
        user_preferences = request.args.get('user_preferences').split(", ")
        restaurants = recommender.recommend(user_preferences)
        return {"data" : restaurants}, 200
    
    except Exception as e:
        return {"error" : str(e)}, 400