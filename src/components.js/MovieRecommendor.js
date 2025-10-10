import React, { useEffect, useState } from "react";
import Header from "./Header";
import Select from "react-select"; // ✅ Import Select
import { Search_Options } from "../utils.js/constents";

const MovieRecommendor = () => {
  const [recommendedMovies, setrecommendedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [SuggestedMovies, setSuggestedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieOptions,setMovieOptions] = useState([]);


const gptSearchfun = async (movie) => {
    
    const Search_url =
      "https://online-movie-database.p.rapidapi.com/auto-complete?q=" + movie;
    try {
      const response = await fetch(Search_url, Search_Options);
      const result = await response.json();
      return result.d?.[0];
    } catch (error) {
      console.error("Movie search error:", error);
    }
  };

  const fetchSelectOptions = async() =>{
    try {
        const res = await fetch("http://127.0.0.1:5000/movies", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          const movieList = data.movies
          const formattedMovies = movieList.map((movie) => ({
            value: movie,
            label: movie,
        }));
        setMovieOptions(formattedMovies);
          
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  useEffect(()=>{
    fetchSelectOptions();
    
  },[])


  const Handle_Recommend_Button = async (e) => {
    e.preventDefault(); 

    setIsLoading(true);
    try {
        const res = await fetch("http://127.0.0.1:5000/recommend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({ movie: selectedMovie.label }), 
          });
          const data = await res.json(); 
          setrecommendedMovies(data.recommendations)
          const promiseArray = recommendedMovies.map((movie) =>
            gptSearchfun(movie)
          );
          const fullMovies = await Promise.all(promiseArray);
          setSuggestedMovies(fullMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if(movieOptions.length === 0) return (<div>Loading..</div>)
    
    

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#B9BAA3] to-[#e2e4cc]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-20">
        <form
          onSubmit={Handle_Recommend_Button}
          className="flex flex-col pt-24 sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Select
            options={movieOptions}
            value={selectedMovie}
            onChange={setSelectedMovie}
            isSearchable
            placeholder="Search movies..."
            className="w-full sm:w-96 p-4 rounded-lg border border-gray-300 focus:outline-none text-black bg-pink-300" 
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-4 bg-red-300 text-white rounded-lg hover:bg-red-800 transition"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-6 min-h-[24rem]">
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <div className="w-14 h-14 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" />
            </div>
          ) : SuggestedMovies.length > 0 ? (
            SuggestedMovies.slice(0, 5).map((movie, index) => (
              <div
                key={index}
                className="w-40 sm:w-48 md:w-56 h-auto flex flex-col items-center gap-2"
              >
                <img
                  src={movie?.i?.imageUrl}
                  alt={`Suggested movie ${index + 1}`}
                  className="w-full h-60 object-cover rounded-xl shadow-md"
                />
                <p className="text-center text-sm font-medium text-gray-700">
                  {movie?.l || "Untitled"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center w-full">
              No suggestions yet. Try searching!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendor;
