import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../../Api/Api";
import { showToast } from "../../Utils/showToast";

// Async Thunks

// Get Posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.getPosts);
      return response.data;
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
      const response = await axios.post(`${API.likePost}/${idPost}/like`);
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
      const response = await axios.post(`${API.dislikePost}/${idPost}/dislike`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Copy URL for Post
export const copyUrlForPost = createAsyncThunk(
  "posts/copyUrlForPost",
  async (idPost, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API.copyUrlForPost}/${idPost}/copyUrl`
      );
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
      const response = await axios.post(`${API.savePost}/savePost`, {
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
      const response = await axios.post(`${API.unsavePost}/unsavePost`, {
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
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Post
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.meta.arg);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.meta.arg.idPost
        );
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...action.payload };
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Like Post
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.meta.arg
        );
        if (index !== -1) {
          state.posts[index].likes += 1;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Dislike Post
      .addCase(dislikePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.meta.arg
        );
        if (index !== -1) {
          state.posts[index].likes -= 1;
        }
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Copy URL for Post
      .addCase(copyUrlForPost.fulfilled, (state, action) => {
        console.log("Post URL copied successfully:", action.payload);
      })
      .addCase(copyUrlForPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Save Post
      .addCase(savePost.fulfilled, (state, action) => {
        console.log("Post saved successfully:", action.payload);
      })
      .addCase(savePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Unsave Post
      .addCase(unsavePost.fulfilled, (state, action) => {
        console.log("Post unsaved successfully:", action.payload);
      })
      .addCase(unsavePost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;
