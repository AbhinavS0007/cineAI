import React, { useEffect, useState } from "react";
import { AdvanceMovieAPI_options } from "../utils.js/constents";
import { useDispatch, useSelector } from "react-redux";
import { toggleMuteOption } from "../utils.js/toggleSlice";

const MainVideoTitle = ({ imdb_id }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const dispatch = useDispatch();
  const mute = useSelector((store) => store.toggleEvents?.mute)




  useEffect(() => {
    if (!imdb_id) return;

    const fetchMovieDetails = async () => {
      try {
        const url = `https://advanced-movie-search.p.rapidapi.com/movies/getdetails?movie_id=${imdb_id}`;
        const response = await fetch(url, AdvanceMovieAPI_options);
        const result = await response.json();
        setMovieDetails(result);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [imdb_id]);

  if (!movieDetails) return <div>Loading...</div>;

  function truncateText(text = "", wordLimit) {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : text;
  }

  return (
    <div className="absolute top-20 pt-54 left-12 w-1/2 text-white mt-44">
      <h1 className="text-2xl md:text-4xl px-3 font-bold leading-tight">
        {movieDetails.title}
      </h1>

      <div className="max-w-md m-4">
        <p className="text-md md:text-md">
          {truncateText(movieDetails.overview, 10)}
        </p>
      </div>

      <div className="flex gap-4 m-4">
        <button className="px-6 py-2 bg-slate-600 rounded-xl text-white bg-opacity-50 hover:bg-opacity-70 transition">
          Play
        </button>
        <button className="px-6 py-2 bg-slate-600 rounded-xl text-white bg-opacity-50 hover:bg-opacity-70 transition">
          More Info
        </button>
        <button onClick={() => { dispatch(toggleMuteOption()) }}>{mute === false ?
          <img className="w-10 rounded-lg" src="https://cdn-icons-png.flaticon.com/128/5949/5949045.png"></img>
          : <img className="w-10 rounded-lg" src="https://cdn-icons-png.flaticon.com/128/16359/16359618.png"></img>}</button>
      </div>

    </div>
  );
};

export default MainVideoTitle;
