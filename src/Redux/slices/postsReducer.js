import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";
import { showToast } from "../../Utils/showToast";

// Async Thunks

// Get Posts
export const fetchPostsUser = createAsyncThunk(
  "posts/fetchPostsUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API.getPostsUser}/${userId}`);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Add Post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.addPost, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete Post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (idPost, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API.deletePost}/${idPost}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Update Post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ idPost, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API.updatePost}/${idPost}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Like Post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (idPost, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.likePost(idPost));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Dislike Post
export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (idPost, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.dislikePost(idPost));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Save Post
export const savePost = createAsyncThunk(
  "posts/savePost",
  async (idPost, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.savePost}/${idPost}`, {
        idPost,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Unsave Post
export const unsavePost = createAsyncThunk(
  "posts/unsavePost",
  async (idPost, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API.unsavePost}/${idPost}`, {
        idPost,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetPostsState(state) {
      state.posts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPostsUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostsUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload || [];
      })
      .addCase(fetchPostsUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Post
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        showToast("success", "Post added successfully");
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        // البحث عن البوست باستخدام id أو _id حسب ما تفضل
        const postIndex = state.posts.findIndex(
          (post) => post._id === action.meta.arg
        );
        if (postIndex !== -1) {
          // splice هنحذف البوست باستخدام
          state.posts.splice(postIndex, 1);
        }
        showToast("success", "Post deleted successfully");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.meta.arg.idPost
        );
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...action.payload };
        }
        showToast("success", "Post updated successfully");
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Like Post
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.meta.arg
        );
        if (index !== -1) {
          const userId = action.payload.userId; // ID المستخدم اللي عمل لايك
          // لو المستخدم موجود في الديسلايك، احذفه
          state.posts[index].dislikes = state.posts[index].dislikes.filter(
            (id) => id !== userId
          );
          // لو مش موجود في اللايك، أضفه
          if (!state.posts[index].likes.includes(userId)) {
            state.posts[index].likes.push(userId);
          }
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Dislike Post
      .addCase(dislikePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.meta.arg
        );
        if (index !== -1) {
          const userId = action.payload.userId; // ID المستخدم اللي عمل ديسلايك
          // لو المستخدم موجود في اللايك، احذفه
          state.posts[index].likes = state.posts[index].likes.filter(
            (id) => id !== userId
          );
          // لو مش موجود في الديسلايك، أضفه
          if (!state.posts[index].dislikes.includes(userId)) {
            state.posts[index].dislikes.push(userId);
          }
        }
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Save Post
      .addCase(savePost.fulfilled, (state, action) => {
        showToast("success", "Post saved successfully");
      })
      .addCase(savePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Unsave Post
      .addCase(unsavePost.fulfilled, (state, action) => {
        showToast("success", "Post unsaved successfully");
      })
      .addCase(unsavePost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError , resetPostsState } = postsSlice.actions;
export default postsSlice.reducer;
