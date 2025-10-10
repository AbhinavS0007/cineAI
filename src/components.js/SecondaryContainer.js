import React from "react";
import MovieList from "./MovieList";
import useDifferentTypeOfMovies from "../hooks/useDifferentTypeOfMovies";

const SecondaryContainer = () => {

  const { PopularMovies, loading, recentlyAddedMovies, allTime2024Hits, trendingMovies, upCommingMovies } = useDifferentTypeOfMovies();

  if (loading) return null;
  if (!PopularMovies) return null;

  return (
    <div className="bg-black ">
      <div className=" md:-mt-60 pl-4 md:pl-12 relative z-20 ">
        {PopularMovies && <MovieList title={"Upcomming Movies . . ."} movies={upCommingMovies} />}
        {PopularMovies && <MovieList title={"Trending Movies . . . "} movies={trendingMovies} />}
        {PopularMovies && <MovieList title={"Popular Movies . . ."} movies={PopularMovies} />}
        {PopularMovies && <MovieList title={"Recently Added Movies . . ."} movies={recentlyAddedMovies} />}
        {PopularMovies && <MovieList title={"All time 2024 Hits . . ."} movies={allTime2024Hits} />}
      </div>
    </div>
  );
};

export default SecondaryContainer;
