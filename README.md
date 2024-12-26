<br>
<p align="center">
  <img src="./frontend/assets/github/logo.png" alt="Logo" width=125/>
</p>
<p align="center">
  Cross-platform mobile application for personalized restaurant recommendations 
</p>
<br>

# 📖 About The Project
Nom Appetit is a restaurant discovery and recommendation mobile application designed to help you answer the timeless question: "Where should I eat today?"

Key Features:

1. **Restaurant Discovery:**
Explore a wide variety of restaurants with an intuitive and user-friendly search. Save your favorite spots for quick access whenever you need them.

2. Personalized Recommendations:
Using content-based filtering trained on Yelp's dataset, Nom Appetit provides tailored restaurant recommendations based on your preferences, making it easy to find the perfect place to dine.

With Nom Appetit, discovering your next meal is quick, personalized, and effortless, making the decision of where to eat an enjoyable experience every time.


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

### Frontend
1. Navigate to the `frontend` directory.
2. To install the necessary Node.js modules, run the following command:
```
npm install
```
3. Start the application and follow the on-screen instructions in the terminal:
```
npx expo start
```

# 🤝 Contributing
Contributions are what make the community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
2. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the Branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request
