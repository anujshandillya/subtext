import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    generations: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setGenerations: (state, action) => {
            state.generations = action.payload.generations;
        },
    }
})

export const { setLogin, setLogout, setGenerations } = authSlice.actions;
export default authSlice.reducer;