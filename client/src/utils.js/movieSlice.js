import { createSlice } from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies: null
      },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        removeNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=null;
        }
    }
    
})

export const {addNowPlayingMovies,removeNowPlayingMovies}=movieSlice.actions; 
export default movieSlice.reducer;