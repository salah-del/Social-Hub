import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import randomVideos from "./slices/randomVideos";
import trendyVideos from "./slices/trendyVideos";
import getUserSlice from "./slices/getUserById";
import postsSlice from "./slices/postsReducer";
import usersSlice from "./slices/usersSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    randomVideos: randomVideos,
    trendyVideos: trendyVideos,
    getUser: getUserSlice,
    posts: postsSlice,
    users: usersSlice,
  },
});

export default store;
