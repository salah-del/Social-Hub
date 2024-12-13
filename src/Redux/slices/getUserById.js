import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";

export const getUserById = createAsyncThunk(
  "getUser/getUserById",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.getUserById}/${userID}`);
      return response.data;
    } catch (error) {
      // Handle network errors (e.g., no connection, server is down)
      if (!error.response) {
        console.error("Network error:", error.message);

        return rejectWithValue(
          "Network error, please check your connection and try again."
        );
      }
      // Handle backend errors (e.g., wrong email/password)
      if (error.response?.data) {
        console.error("Backend error:", error.response.data);
        return rejectWithValue(
          error.response.data.message ||
            "Something went wrong with the backend."
        );
      }
      // Fallback for other types of errors
      console.error("Unexpected error:", error.message);
      return rejectWithValue(error.message || "An unexpected error occurred.");
    }
  }
);

const getUserSlice = createSlice({
  name: "getUser",
  initialState: {
    getUser: null,
    status: "idle",
    error: null,
    hasFetched: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.getUser = action.payload;
        state.status = "succeeded";
        state.hasFetched = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default getUserSlice.reducer;
