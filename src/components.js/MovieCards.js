import React from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies, removeNowPlayingMovies } from "../utils.js/movieSlice";

const MovieCards = ({ movie }) => {
  const movieImage = movie.poster;
  const movieName = movie.title;
  const movieId = movie.imdb_id;
  const dispatch = useDispatch();

  if (!movieImage) return null;

  const addMovietoTrailer = (movieName, movieId) => {
    dispatch(removeNowPlayingMovies());
    dispatch(addNowPlayingMovies({ movieName, movieId }));
  };

  return (
    <div
      className="min-w-44 max-h-64 overflow-hidden pr-4 cursor-pointer"
      // onClick={() => addMovietoTrailer(movieName, movieId)}
    >
      <img src={movieImage} alt={movieName} />
    </div>
  );
};

export default MovieCards;
