import React, { useEffect } from "react";
import MainVideoTitle from "./MainVideoTitle";
import BackgroundVideo from "./BackgroundVideo";
// import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useDifferentTypeOfMovies from "../hooks/useDifferentTypeOfMovies";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies, removeNowPlayingMovies } from "../utils.js/movieSlice";

const MainContainer = () => {

  const dispatch = useDispatch();

  const movieName =  useSelector((store)=> store.movies?.nowPlayingMovies?.movieName);
  const movieId =  useSelector((store)=> store.movies?.nowPlayingMovies?.movieId);

  const { PopularMovies, loading, recentlyAddedMovies,allTime2024Hits, trendingMovies } = useDifferentTypeOfMovies();

  const backgroundVideo = allTime2024Hits;

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
 

  useEffect(()=>{

    const randomIndex = getRandomArbitrary(0, backgroundVideo.length - 1);
    const randomMovieName = backgroundVideo[randomIndex]?.title;
    const randomMovieId =  backgroundVideo[randomIndex]?.imdb_id;

    if(randomMovieName && randomMovieId){
      dispatch(removeNowPlayingMovies());
      dispatch(addNowPlayingMovies({movieName:randomMovieName, movieId:randomMovieId}))
    }
  },[loading])


  if (loading ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="w-14 h-14 border-4 border-black border-dotted rounded-full animate-spin border-t-transparent"
        />
      </div>
    );
  }

  if (backgroundVideo.length === 0) {
    return <div>No movies found.</div>;
  }

  


  return (
    <div>
      {movieName && movieName.length > 0 ? (
        <>
          <BackgroundVideo bg_imdb_id={movieName} />
          <MainVideoTitle imdb_id={movieId} />
        </>
      ) : (
        <div>No movie selected.</div>
      )}
    </div>
  );
};

export default MainContainer;
