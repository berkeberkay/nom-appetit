from flask import Flask
from routes.users_route import users
from routes.token_route import token
from routes.profiles_route import profiles
from routes.restaurants_route import restaurants
from routes.recommendation_route import recommendation

app = Flask(__name__)

# routes
app.register_blueprint(users)
app.register_blueprint(token)
app.register_blueprint(profiles)
app.register_blueprint(restaurants)
app.register_blueprint(recommendation)