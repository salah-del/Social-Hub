import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";
import { showToast } from "../../Utils/showToast";

// Helper function to handle errors
const handleError = (error, rejectWithValue) => {
  if (!error.response) {
    console.error("Network error:", error.message);
    return rejectWithValue(
      "Network error, please check your connection and try again."
    );
  }
  if (error.response?.data) {
    console.error("Backend error:", error.response.data);
    return rejectWithValue(
      error.response.data.message || "Something went wrong with the backend."
    );
  }
  console.error("Unexpected error:", error.message);
  return rejectWithValue(error.message || "An unexpected error occurred.");
};

// Thunks for API calls
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.getAllUsers);
      console.log("All user : ", response.data);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.getUserById}/${userID}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const subscribe = createAsyncThunk(
  "users/subscribe",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.subscribe}/${userID}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const unsubscribe = createAsyncThunk(
  "users/unsubscribe",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.unsubscribe}/${userID}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const addFriend = createAsyncThunk(
  "users/addFriend",
  async (friendID, { rejectWithValue }) => {
    console.log("friendId: ", friendID);
    
    try {
      const response = await axios.put(`${API.AddFriend}/${friendID}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(response);

      return handleError(error, rejectWithValue);
    }
  }
);

export const acceptFriend = createAsyncThunk(
  "users/acceptFriend",
  async ({ friendID, receiverId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.AcceptFriend}/${friendID}`, {
        receiverId,
      });
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, values }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API.updateUser}/${userId}`, values);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// export const deleteUser = createAsyncThunk(
//   "user/deleteUser",
//   async (userID, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`${API.deleteUser}/${userID}`);
//       return response.data;
//     } catch (error) {
//       return handleError(error, rejectWithValue);
//     }
//   }
// );

// Slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users || [];
        state.status = "succeeded";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // getUserById
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // subscribe
      .addCase(subscribe.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // unsubscribe
      .addCase(unsubscribe.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
      })
      .addCase(unsubscribe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // addFriend
      .addCase(addFriend.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // acceptFriend
      .addCase(acceptFriend.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
      })
      .addCase(acceptFriend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
        showToast("success", "Your information has been updated.");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        showToast("error", action.payload);
      });
    // deleteUser
    //   .addCase(deleteUser.pending, (state) => {
    //     state.status = "loading";
    //     state.error = null;
    //   })
    //   .addCase(deleteUser.fulfilled, (state, action) => {
    //     state.user = null;
    //     state.status = "succeeded";
    //   })
    //   .addCase(deleteUser.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   });
  },
});

export default userSlice.reducer;
