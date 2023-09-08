import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null },
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                    user: action.payload
            }
        },
        setCredentials: (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                    token: action.payload
            }
        },
        logOut: (state, action) => {
            return {
                ...state,
                    user: null,
                    token: null
            }
        }
    }
});

export default authSlice;
export const { setCredentials, logOut, setUser } = authSlice.actions;
