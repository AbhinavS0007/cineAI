import { useEffect, useState } from "react";
import { ALL_TIME_2024_HITS, ALL_TIME_2024_HITS_Options, PopularMovies_Options, PopularMovies_URL, RecentlyAddedMovies, RecentlyAddedMovies_Options, TrendingMovies_Options, TrendingMovies_URL, upcommingMovies, upcommingMovies_Options } from "../utils.js/constents";


const useDifferentTypeOfMovies = () =>{
    const [PopularMovies, setPopularMovies] = useState("");
    const [recentlyAddedMovies, setrecentlyAddedMovies] = useState("");
    const [allTime2024Hits, setallTime2024Hits] = useState("");
    const [trendingMovies, settrendingMovies] = useState("");
    const [upCommingMovies, setupCommingMovies] = useState("");
    const [loading, setLoading] = useState(true);

    console.log(PopularMovies);
    


  const GetMovies = async () => {
    try {
      const response1 = await fetch(PopularMovies_URL, PopularMovies_Options);
      // const response2 = await fetch(RecentlyAddedMovies, RecentlyAddedMovies_Options);
      // const response3 = await fetch(ALL_TIME_2024_HITS, ALL_TIME_2024_HITS_Options);
      // const response4 = await fetch(TrendingMovies_URL, TrendingMovies_Options);
      // const response5 = await fetch(upcommingMovies, upcommingMovies_Options);
      console.log(response1);
      

      // const result1 = await response1.json();
      // const result2 = await response2.json();
      // const result3 = await response3.json();
      // const result4 = await response4.json();
      // const result5 = await response5.json();


      // setPopularMovies(result1?.movie_results);
      // setrecentlyAddedMovies(result2?.movie_results)
      // setallTime2024Hits(result3?.movie_results)
      // settrendingMovies(result4?.movie_results)
      // setupCommingMovies(result5?.movie_results)
    }
    catch (error) {
      console.error(error);
    }
    finally {
        setLoading(false)
    }
  };

  useEffect(() => {
    GetMovies();
  }, []);

  return {PopularMovies,loading,recentlyAddedMovies,allTime2024Hits,trendingMovies,upCommingMovies};
}

export default useDifferentTypeOfMovies;