def generate_recommendations(user_preferences, model):
    response = model.recommend(user_preferences)
    return response