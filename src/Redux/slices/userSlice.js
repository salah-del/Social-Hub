import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";

export const loginUser = createAsyncThunk(
    'user/loginUser',
async ({ name, password }, { rejectWithValue }) => {
        console.log(name, password)
        try {
            const response = await axios.post(API.signin, { name, password });

            // If backend returns error status code (e.g., 400 or 401), manually throw an error
            // to excute loginUser.rejected 
            if (response.status !== 200) {
                throw new Error(response.data.message || 'Something went wrong with the backend.');
            }
            return response.data; // Return the data if everything is fine
        } catch (error) {
        // Handle network errors (e.g., no connection, server is down)
            if (!error.response) {
                console.error('Network error:', error.message);
                return rejectWithValue('Network error, please check your connection and try again.');
            }

            // Handle backend errors (e.g., wrong email/password)
            if (error.response?.data) {
                console.error('Backend error:', error.response.data);
                return rejectWithValue(error.response.data.message || 'Something went wrong with the backend.');
            }

            // Fallback for other types of errors
            console.error('Unexpected error:', error.message);
            return rejectWithValue(error.message || 'An unexpected error occurred.');
            }
    }
);


export const logUserOut = createAsyncThunk('user/logUserOut', async ( ) => {
    Cookies.remove("token"); 
    window.location.href = "/";
    return null;
});




const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // Login user
        .addCase(loginUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
            
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(logUserOut.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(logUserOut.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
            
        })
        .addCase(logUserOut.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;