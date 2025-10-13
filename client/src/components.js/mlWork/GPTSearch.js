import React, { useState, useRef } from "react";
import Header from "../header/Header"; // Optional
import { Search_Options } from "../../utils.js/constents";
import { toast } from "react-toastify";

const GPTSearch = () => {
  const Search_Value = useRef(null);
  const [SuggestedMovies, setSuggestedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

  const Handle_GPT_Search_Button = async (e) => {
    e.preventDefault();
    const Search_Curr_Value = Search_Value.current ? Search_Value.current.value : "";

    if (!Search_Curr_Value) {
      toast.warning("Please enter a search value")
      return;
    }

    setIsLoading(true);
    try {
      const prompt =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        Search_Curr_Value +
        ". Only give me names of 5 movies, comma separated like the example result. Example Result: Inception, Titanic, Interstellar, Avatar, Joker";

      const result = await model.generateContent(prompt);

      
      const response = await result.response;
      const Movies_list_Array = await response
        .text()
        .split(",")
        .map((movie) => movie.trim())
        .filter((movie) => movie);

      // promiseArray stores array of Promises, not actual movie data yet.
      // Movies_list_Array = ["Inception", "Avatar"];
      // promiseArray = [
      //   Promise<movieDataForInception>,
      //   Promise<movieDataForAvatar>
      // ]

      const promiseArray = Movies_list_Array.map((movie) =>
        gptSearchfun(movie)
      );

      //Promise.all() waits until all the Promises in promiseArray finish.
      const fullMovies = await Promise.all(promiseArray);
      //.filter(Boolean) removes any falsy values (false, null, undefined, 0, "" (empty string), NaN)from the array.
      const allMovies = fullMovies.filter(Boolean);

      setSuggestedMovies(fullMovies);
    } catch (error) {
      toast.error("Error while fetching content")
      console.error("Error fetching content:", error);
    }
    setIsLoading(false);
  };

  

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#B9BAA3] to-[#e2e4cc]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-20">
        <form
          onSubmit={Handle_GPT_Search_Button}
          className="flex flex-col pt-24 sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <input
            ref={Search_Value}
            className="w-full sm:w-96 p-4 rounded-lg border border-gray-300 focus:outline-none text-black"
            type="text"
            placeholder="Search for movies, genres, actors..."
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap  justify-center gap-6 min-h-[24rem]">
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

export default GPTSearch;


