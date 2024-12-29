import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";

export const getTrendyVideos = createAsyncThunk(
    'trendyVideos/getTrendyVideos',
    async (page = 1, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API.getTrendVideos}?page=${page}`);
            return res.data;
        } catch (error) {
        // Handle network errors
        if (!error.response) {
            console.error('Network error:', error.message);
            return rejectWithValue('Network error, please check your connection and try again.');
        }

        // Handle backend errors
        if (error.response?.data) {
            return rejectWithValue(error.response.data.message || 'Something went wrong with the backend.');
        }

        // Fallback for other types of errors
        console.error('Unexpected error:', error.message);
        return rejectWithValue(error.message || 'An unexpected error occurred.');
        }
    }
);

const trendyVideos = createSlice({
    name: 'trendyVideos',
    initialState: {
        videos: [],
        status: 'idle',
        error: null,
        currentPage: 1,
        hasMore: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTrendyVideos.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getTrendyVideos.fulfilled, (state, action) => {
            if (action.payload?.videos.length > 0) {
                state.videos = [...state.videos, ...action.payload.videos];
                state.currentPage += 1;
            } else {
                state.hasMore = false;
            }
            state.status = 'succeeded';
        })
        .addCase(getTrendyVideos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Failed to fetch videos.';
        });
    },
});

export default trendyVideos.reducer;