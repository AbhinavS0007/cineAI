import React from "react";
import MovieList from "./MovieList";
import useDifferentTypeOfMovies from "../../hooks/useDifferentTypeOfMovies";

const SecondaryContainer = () => {

  // const { PopularMovies, loading, recentlyAddedMovies, allTime2024Hits, trendingMovies, upCommingMovies } = useDifferentTypeOfMovies();
  const PopularMovies =[
    "tt0111161",
    "tt0068646",
    "tt0071562",
    "tt0110912",
    "tt0060196",
    "tt0468569",
    "tt0050083",
    "tt0108052",
    "tt0167260",
    "tt0137523",
    "tt0109830",
    "tt0120737",
    "tt0120815",
    "tt0118799",
    "tt0172495",
    "tt0114369",
    "tt0080684",
    "tt0119698",
    "tt0102926",
    "tt0073486",
    "tt0253474",
    "tt0245429",
    "tt0076759",
    "tt0107207",
    "tt0088763",
    "tt0062622",
    "tt0120586",
    "tt1853728",
    "tt0082971",
    "tt0099685",
    "tt0078748",
    "tt0209144",
    "tt0047396",
    "tt0057012",
    "tt0054042",
    "tt0097216",
    "tt0054215",
    "tt0056322",
    "tt0113247",
    "tt0044741",
    "tt0052572",
    "tt0083922",
    "tt0043014",
    "tt0053114",
    "tt0100234",
    "tt0038650",
    "tt0087884",
    "tt0045152",
    "tt0072684",
    "tt0111341",
    "tt0057115",  // approximate, double-check title
    "tt0046912",
    "tt0053604",
    "tt0064116",
    "tt0072612",
    "tt0095765",
    "tt0048473",
    "tt0060827",
    "tt0081505",
    "tt0076759",
    "tt0090605",
    "tt0114709",
    "tt0112573",
    "tt0083658",
    "tt0048452",
    "tt0095327",
    "tt0103064",
    "tt0103065",
    "tt0096283",
    "tt0032553",
    "tt0032138",
    "tt0053217",
    "tt0052838",
    "tt0095016",
    "tt0087544",
    "tt0102926",
    "tt0145487",
    "tt0071315",
    "tt0050774",
    "tt0117951",
    "tt0057565",
    "tt0112573",
    "tt0107290",
    "tt0022100",
    "tt0050212",
    "tt0055630",
    "tt0110413",
    "tt0034583",
    "tt0105046",
    "tt0041959",
    "tt0042876",
    "tt0071853",
    "tt0050378",
    "tt0025316",
    "tt0031381",
    "tt0088363",
    "tt0032553"
  ]
  const allTimeBollywoodHits = [
    "tt10295212",
    "tt11934846",
    "tt14107554",
    "tt10895576",
    "tt8983228",
    "tt10350626",
    "tt10230422",
    "tt12567088",
    "tt10515526",
    "tt8110330",
    "tt7805960",
    "tt11651796",
    "tt8983164",
    "tt10731264",
    "tt9766280",
    "tt8983166",
    "tt9637132",
    "tt8108274",
    "tt10295212",
    "tt11934846",
    "tt14107554",
    "tt10895576",
    "tt8983228",
  ];
  const allTime2024Hits = [

  "tt15239678",
  "tt8999762",
  "tt30321095",
  "tt5040012",
  "tt29623480",
  "tt12037194",
  "tt17526714",
  "tt21823606",
  "tt28491891",
  "tt20215234",
  "tt26446278",
  "tt24216998",
  "tt1684562",
  "tt15239678",
  "tt8999762",
  "tt30321095",
  "tt5040012",
  "tt29623480",
  "tt12037194",
  "tt17526714",
  "tt21823606",
  "tt28491891",
  "tt20215234",
  "tt26446278",
  "tt24216998",

  ];
  if (!PopularMovies && !allTimeBollywoodHits && !allTime2024Hits) return null;


  return (
    <div className="bg-black ">
      <div className=" md:-mt-48 pl-4 md:pl-12 relative z-20 ">
      {allTimeBollywoodHits && <MovieList title={"Bollywood Movies . . ."} movies={allTimeBollywoodHits} />}
      {/* {PopularMovies && <MovieList title={"Popular Movies . . ."} movies={PopularMovies} />}
      {allTime2024Hits && <MovieList title={"All time 2024 Hits . . ."} movies={allTime2024Hits} />}
      {allTimeBollywoodHits && <MovieList title={"Bollywood Movies . . ."} movies={allTimeBollywoodHits} />}
      {PopularMovies && <MovieList title={"Popular Movies . . ."} movies={PopularMovies} />}
      {allTime2024Hits && <MovieList title={"All time 2024 Hits . . ."} movies={allTime2024Hits} />} */}
      </div>
    </div>
  );
};

export default SecondaryContainer;
