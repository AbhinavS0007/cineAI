import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        adduser : (state , action) => {
            return action.payload;
        },
        removeUser : (state , action) => {
            return null
        },
    },
})

// export actions
export const {adduser , removeUser} = userSlice.actions;

// export reducer to configure store
export default userSlice.reducer