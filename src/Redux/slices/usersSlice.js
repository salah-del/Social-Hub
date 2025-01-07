import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";
import { showToast } from "../../Utils/showToast";

// Helper function to handle errors
const handleError = (error, rejectWithValue) => {
  if (!error.response) {
    // console.error("Network error:", error.message);
    return rejectWithValue(
      "Network error, please check your connection and try again."
    );
  }
  if (error.response?.data) {
    // console.error("Backend error:", error.response.data);
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
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const searchByName = createAsyncThunk(
  "users/searchByName",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.searchByName}`, { query });
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

export const subscribe = createAsyncThunk(
  "users/subscribe",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API.subscribe}/${userID}`);
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
      const response = await axios.put(`${API.unsubscribe}/${userID}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const addFriend = createAsyncThunk(
  "users/addFriend",
  async (friendId, { rejectWithValue }) => {
    console.log("from addFriend func id : ", friendId);
    try {
      const response = await axios.put(`${API.addFriend}/${friendId}`);
      console.log("from addFriend func", response.data);

      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const acceptFriend = createAsyncThunk(
  "users/acceptFriend",
  async ({ senderId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API.acceptFriend}/${senderId}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const rejectFriend = createAsyncThunk(
  "users/rejectFriend",
  async ({ senderId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API.rejectFriend}/${senderId}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const blockUser = createAsyncThunk(
  "users/blockUser",
  async ({ userToBlockId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.blockUser, {
        userToBlockId,
      });
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const unBlockUser = createAsyncThunk(
  "users/unBlockUser",
  async ({ userToUnblockId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.unBlockUser, {
        userToUnblockId,
      });
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userData: null,
    status: "idle",
    statusUpdate: "idle",
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
      // searchByName
      .addCase(searchByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchByName.fulfilled, (state, action) => {
        state.users = action.payload.users || [];
        state.status = "succeeded";
      })
      .addCase(searchByName.rejected, (state, action) => {
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
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.statusUpdate = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.statusUpdate = "succeeded";
        state.userData = action.payload;
        showToast("success", "Your information has been updated.");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.error = action.payload;
        showToast("error", action.payload);
      })
      // subscribe
      .addCase(subscribe.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        showToast("success", "Followed successfully");
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // unsubscribe
      .addCase(unsubscribe.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        showToast("success", "Unfollowed successfully");
      })
      .addCase(unsubscribe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // addFriend
      .addCase(addFriend.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        showToast("success", "Friend request sent");
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // showToast("error", "Request wasn't sent");
      })
      // acceptFriend
      .addCase(acceptFriend.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        showToast("success", "Friend request accepted");
      })
      .addCase(acceptFriend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // rejectFriend
      .addCase(rejectFriend.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        showToast("success", "Friend request rejected");
      })
      .addCase(rejectFriend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // blockUser
      .addCase(blockUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        showToast("success", "User has been successfully blocked");
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // unblockUser
      .addCase(unBlockUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
        showToast("success", "User has been successfully unblocked");
      })
      .addCase(unBlockUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default userSlice.reducer;
