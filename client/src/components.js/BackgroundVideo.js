import React, { useEffect, useRef } from "react";
import useNowPlayingVideo from "../hooks/useNowPlayingVideo";
import { useSelector } from "react-redux";

const BackgroundVideo = ({ bg_imdb_id }) => {
  console.log("his is movie name",bg_imdb_id);
  
  const { videoId } = useNowPlayingVideo(bg_imdb_id);
  const mute = useSelector((store) => store.toggleEvents?.mute);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && playerRef.current.contentWindow) {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: mute ? "mute" : "unMute",
        }),
        "*"
      );
    }
  }, [mute]);

  return (
    <div className="video-container">
      <iframe
        ref={playerRef}
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&controls=0&rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BackgroundVideo;
