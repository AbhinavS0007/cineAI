import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggleEvents",
    initialState: {
        mute : false
    },
    reducers: {
        toggleMuteOption(state,action){
            state.mute = !state.mute;
        }
    },
})

// export actions
export const {toggleMuteOption} = toggleSlice.actions;

// export reducer to configure store
export default toggleSlice.reducer