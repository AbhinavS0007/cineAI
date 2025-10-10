import React, { useState } from "react";
import { NETFLIX_LOGO } from "../utils.js/constents";

import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Profile_Image } from "../utils.js/constents";

const Header = () => {



  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  // if(user)
  // console.log(user);


  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("User Sign Out!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error While Signing Out");
      });
  };
  const HandleGPTSearch = () => {
    navigate("/browser/gpt")
  };

  const HandleMovieRecommendation = () => {
    navigate("/browser/recommend")
  };

  
  // console.log(user.displayName);
  // if(user.displayName) console.log(user.displayName);

  return (
    <div className="absolute w-screen px-8 py-2 flex justify-between items-center bg-gradient-to-b from-black z-10">
      <div>
        <img className="w-44" src={NETFLIX_LOGO} alt="Logo" />
      </div>
      {user && (
        <div className="flex space-x-6 w-auto font-sans   justify-around items-center ">
          <div className="text-white text-2xl">
            <ul className="flex text-2xl">
              <li>
                <Link to="/browser" className="px-6">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <button
            className="text-2xl px-3 bg-green-400 rounded-md"
            onClick={HandleMovieRecommendation}
          >
            Recommendor
          </button>

          <button
            className="text-2xl px-4 bg-green-400 rounded-md"
            onClick={HandleGPTSearch}
          >
            GPT
          </button>

          <div className="flex items-center space-x-2">
            <img className="w-10 h-10 rounded-md" src={user.photoURL ? user.photoURL : Profile_Image} alt="Profile" />
            <h1 className="text-2xl text-white">{user.displayName}</h1>
          </div>

          <button className="text-2xl text-white" onClick={handleSignout}>
            Sign-Out
          </button>
        </div>
      )}
    </div>
  );

};

export default Header;
