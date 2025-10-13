import React from "react";
import MainContainer from "./BackgroundVideo/MainContainer";
import SecondaryContainer from "./AllMovies/SecondaryContainer";
import Header from "./header/Header";

const Browser = () => {
  

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browser;