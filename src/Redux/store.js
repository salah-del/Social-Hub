import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice'
import randomVideos from './slices/randomVideos'
import trendyVideos from './slices/trendyVideos'

const store = configureStore({
    reducer: {
        user:userSlice,
        randomVideos: randomVideos,
        trendyVideos: trendyVideos,
    }
}
)

export default store;