from sklearn.neighbors import NearestNeighbors
import pandas as pd

class RecommenderSystem:
    def __init__(self):
        self.model = NearestNeighbors(n_neighbors=10)
        self.df = None
        self.df_ohe = None
        self.categories = None

    def train(self, path, city):
        df = pd.read_json(path, lines=True)

        # filter out rows with empty categories
        df = df[df["categories"].notnull()]
        
        # filter city & restaurants
        df = df[df["city"] == city]
        df = df[df["categories"].str.contains("Restaurants")]
        self.df = df

        # one hot encode categories
        df['categories_split'] = df['categories'].str.split(", ")
        df_ohe = pd.get_dummies(df['categories_split'].explode()).groupby(level=0).sum()
        df_ohe = pd.concat([df[['business_id', 'name']], df_ohe], axis=1)
        self.df_ohe = df_ohe

        # fit model
        knn = self.model
        knn.fit(df_ohe.iloc[:, 2:])

        # save all category names
        self.categories = df_ohe.columns[2:].to_numpy()

    def recommend(self, user_preferences):
        query_point = pd.DataFrame(0, columns=self.categories, index=[0])

        # update the dataframe to reflect the user's preferences
        for category in user_preferences:
            if category in query_point.columns:
                query_point[category] = 1

        # compute the distances and indices of the nearest neighbors to the query point
        distances, indices = self.model.kneighbors(query_point)
        
        # return restaurants
        restaurants = []
        for i in indices[0]:
            restaurants.append(self.df.iloc[i].to_dict())

        return restaurants
