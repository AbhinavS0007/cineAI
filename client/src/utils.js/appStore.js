import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import moviesReducer from "./movieSlice.js";
import toggleReducer from "./toggleSlice"

// configureStore 
const appStore = configureStore({
    reducer :{
        user: userReducer,  // adding user slice to the store state
        movies:moviesReducer, // adding movies slice to the store state
        toggleEvents:toggleReducer,
    },
})

export default appStore;