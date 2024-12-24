<br>
<p align="center">
  <img src="./frontend/assets/gallery/logo.png" alt="Logo" width=125/>
</p>
<p align="center">
  Cross-platform mobile app for restaurant discovery and recommendations 
</p>
<br>

# 🚀 Getting Started

### Prerequisites

- [Python](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Third-Party APIs
- [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro)

## Installation
To get a local copy up and running follow these simple example steps:

### Backend
1. Navigate to the `backend` directory
2. Set up the `.env` file with the following environment variables:
```
DB_USER = [PostgreSQL username]
DB_PASS = [PostgreSQL password]
DB_HOST = [PostgreSQL host (default: localhost)]
DB_PORT = [PostgreSQL port (default: 5432)]
DB_NAME = [PostgreSQL database]
SERVER_KEY = [JWT secret key]             
```
3. Install the required Python modules
```
pip install -r requirements.txt
```
4. Run the server
```
flask run
```
