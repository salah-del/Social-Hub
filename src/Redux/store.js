import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice'
import randomVideos from './slices/randomVideos'

const store = configureStore({
    reducer: {
        user:userSlice,
        randomVideos: randomVideos,
    }
}
)

export default store;