import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";
import { showToast } from "../../Utils/showToast";

// Async Thunks

// Get Comments
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (idPost, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.getComments}/${idPost}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
// Add Comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.addComment, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Reply to Comment
export const replyComment = createAsyncThunk(
  "comments/replyComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.replyComment, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (idComment, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API.deleteComment}/${idComment}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Comments
      .addCase(getComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload || [];
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        showToast("success", "Comment added successfully");
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Reply to Comment
      .addCase(replyComment.fulfilled, (state, action) => {
        const { objectId, ...newReply } = action.payload;
        const comment = state.comments.find((c) => c._id === objectId);
        if (comment) {
          comment.replies = comment.replies || [];
          comment.replies.push(newReply);
        }
        showToast("success", "Reply added successfully");
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (comment) => comment._id === action.meta.arg
        );
        if (index !== -1) {
          state.comments.splice(index, 1);
        }
        showToast("success", "Comment deleted successfully");
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = commentsSlice.actions;
export default commentsSlice.reducer;
