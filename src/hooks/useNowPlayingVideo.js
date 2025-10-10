import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const useNowPlayingVideo = (props) => {
    const [videoId, setVideoId] = useState("");
    const [completeVideoIdData, setcompleteVideoIdData] = useState("")
    
    
    const query = encodeURIComponent( props);
    // console.log("now playing movie is : ",props);
    
    
    const fetchMovieDetails = async () => {
        const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
        
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;

        try {
            const response = await fetch(url);

            const movieDetails = await response.json();
            
            setVideoId(movieDetails?.items[0].id.videoId);
            setcompleteVideoIdData(movieDetails?.items[0])
        } catch (error) {
            toast.warning("Please refresh the page ...")
            // console.error("Failed to fetch movie details:", error);
            return null;
        }
    };

    useEffect(()=>{
        fetchMovieDetails();
    },[props])


    return {completeVideoIdData,videoId};
}

export default useNowPlayingVideo;