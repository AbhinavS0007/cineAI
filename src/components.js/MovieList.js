import React, { useState, useEffect } from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  const [allMovies, setAllMovies] = useState([]);
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  

  const extractImage = async (IMDB_ID) => {
    try {
      const url = `https://www.omdbapi.com/?i=${IMDB_ID}&apikey=${OMDB_API_KEY}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.Response === "True" && result.Poster !== "N/A") {
        return result.Poster;
      }
      // return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPosters = async () => {
      const promiseArray = movies.map(async (movie) => {
        const poster = await extractImage(movie.imdb_id);
        return { ...movie, poster };
      });

      const updatedMovies = await Promise.all(promiseArray);
      setAllMovies(updatedMovies);
    };

    if (movies?.length > 0) {
      fetchPosters();
    }
  }, [movies]);

  // console.log(allMovies);

  if(!allMovies) return null;
  

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {allMovies.map((movie) => (
            <MovieCards
              key={movie.imdb_id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
