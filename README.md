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

### Backend
1. Navigate to the `backend` directory.
2. Create a `data` directory at the root level.
3. Download the dataset from [Kaggle](https://www.kaggle.com/datasets/yelp-dataset/yelp-dataset/versions/3) and place the `yelp_academic_dataset_business.json` file inside the `data` directory.
4. Configure the `.env` file with the following environment variables:
```
DB_USER = [PostgreSQL Username]  
DB_PASS = [PostgreSQL Password]  
DB_HOST = [PostgreSQL Host]  
DB_PORT = [PostgreSQL Port]  
DB_NAME = [PostgreSQL Database Name]  
JWT_KEY = [JWT Secret]  
YELP_KEY = [Yelp Fusion API Key]  
```
5. Install the required Python packages by running:
```
pip install -r requirements.txt
```
6. Navigate to the `src` directory and start the server by running:
```
flask run
```
