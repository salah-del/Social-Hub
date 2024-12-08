import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";


export const getRandomVideos = createAsyncThunk(
    'randomVideos/getRandomVideos',
async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API.getRandomVideos);
            return res.data;
        } catch (error) {
        // Handle network errors (e.g., no connection, server is down)
            if (!error.response) {
                console.error('Network error:', error.message);
                
                return rejectWithValue('Network error, please check your connection and try again.');
            }

            // Handle backend errors (e.g., wrong email/password)
            if (error.response?.data) {
                // console.error('Backend error:', error.response.data);
                return rejectWithValue(error.response.data.message || 'Something went wrong with the backend.');
            }

            // Fallback for other types of errors
            console.error('Unexpected error:', error.message);
            return rejectWithValue(error.message || 'An unexpected error occurred.');
        }
    }
);




const randomVideos = createSlice({
    name: 'randomVideos',
    initialState: {
        videos: null,
        status: "idle",
        error: null,
    },
    extraReducers: (builder) => {
        builder
        // Login user
        .addCase(getRandomVideos.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getRandomVideos.fulfilled, (state, action) => { 
            state.videos = action.payload;
            state.status = "succeeded";
        })
        .addCase(getRandomVideos.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    }
});

export default randomVideos.reducer;