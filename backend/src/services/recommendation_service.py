def generate_recommendation(user_preferences, model):
    response = model.recommend(user_preferences)
    return response