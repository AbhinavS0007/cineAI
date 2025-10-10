import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { adduser, removeUser } from "../utils.js/userSlice";
import Browser from "./Browser";
import GPTSearch from "./GPTSearch";
import MovieRecommendor from "./MovieRecommendor";

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const { uid, email, displayName } = user;

        dispatch(adduser({ uid: uid, email: email, displayName: displayName }));
      } else {
        dispatch(removeUser());
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={!user ? <Login /> : < Navigate to="/browser"/>}/>
        <Route path="/browser" element={user ? <Browser /> : <Navigate to="/"/>}/>
        <Route path="/browser/recommend" element={user ? <MovieRecommendor /> : <Navigate to="/"/>}/>
        <Route path="/browser/gpt" element={user ? <GPTSearch /> : <Navigate to="/"/>}/>
      </Routes>
    </div>
  );
};

export default Body;
