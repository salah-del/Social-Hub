import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import randomVideos from "./slices/randomVideos";
import trendyVideos from "./slices/trendyVideos";
import getUserSlice from "./slices/getUserById";

const store = configureStore({
  reducer: {
    user: userSlice,
    randomVideos: randomVideos,
    trendyVideos: trendyVideos,
    getUser: getUserSlice,
  },
});

export default store;
