from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS  # ✅ allow frontend requests

app = Flask(__name__)
CORS(app)  # ✅ important for React frontend on a different port

# Load your trained model or similarity data
movie_dict = pickle.load(open("movie_dict.pkl", "rb"))
movies = pd.DataFrame(movie_dict)
similarity = pickle.load(open("similarity.pkl", "rb"))

def get_recommendations(movie_name):
    movie_index = movies[movies['title'] == movie_name].index[0]
    distances = similarity[movie_index]
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    recommended_movies = [movies.iloc[i[0]].title for i in movie_list]
    return recommended_movies

# ✅ Endpoint 1: recommend movies
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    movie_name = data.get("movie")
    recommendations = get_recommendations(movie_name)
    return jsonify({"recommendations": recommendations})

# ✅ Endpoint 2: get all movies for dropdown
@app.route("/movies", methods=["GET"])
def get_movies():
    titles = movies['title'].values.tolist()
    return jsonify({"movies": titles})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
