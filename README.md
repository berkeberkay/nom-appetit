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
To set up a local copy, follow these steps:

### Recommendation
1. Navigate to the `recommendation` directory.
2. Download the dataset from [Kaggle](https://www.kaggle.com/datasets/yelp-dataset/yelp-dataset/versions/3), and place `yelp_academic_dataset_business.json` into the `data` directory.
3. Install the required Python packages.
```
pip install -r requirements.txt
```
4. Run the server.
```
flask run
```

### Backend
1. Navigate to the `backend` directory.
2. Configure the `.env` file with the following environment variables:
```
YELP_KEY = [YELP FUSION API KEY]
SECRET_KEY = [JWT SECRET KEY]     
DB_USER = [POSTGRES USERNAME]
DB_PASS = [POSTGRES PASSWORD]
DB_HOST = [POSTGRES HOST]
DB_PORT = [POSTGRES PORT]
DB_NAME = [POSTGRES DATABASE NAME]
```
3. Install the required Python packages.
```
pip install -r requirements.txt
```
4. Run the server.
```
flask run
```
