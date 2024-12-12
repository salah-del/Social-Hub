import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";

export const fetchUserData = createAsyncThunk(
  "user/userData",
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

//  الخاص ببيانات المستخدم Slice
const userDataSlice = createSlice({
  name: "userData", // slice اسم واضح للـ
  initialState: {
    userData: null, // dataUser بدلاً من
    status: "idle", // حالة التحميل
    error: null, // خطأ في حال وجوده
    hasFetched: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading"; // جاري التحميل
        state.error = null; // لا توجد أخطاء حالياً
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload; // تحديث البيانات
        state.status = "succeeded"; // حالة النجاح
        state.hasFetched = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload; // تسجيل الخطأ
        state.status = "failed"; // حالة الفشل
      });
  },
});

// التصدير
export default userDataSlice.reducer;
