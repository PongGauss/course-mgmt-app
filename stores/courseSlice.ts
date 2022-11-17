import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
interface AuthState {
  courseName: string;
  courseDate: string;
  isLoading: boolean;
}

// Initial state
const initialState: AuthState = {
  courseName: '',
  courseDate: new Date().toISOString().slice(0, 10),
  isLoading: false,
};

// Actual Slice
export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {

    // Action to set the authentication status
    setCourseSearchingState(state, action) {
      state.courseName = action.payload.courseName;
      state.courseDate = action.payload.courseDate;
    },

    setCourseLoadingState(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCourseSearchingState, setCourseLoadingState } = courseSlice.actions;

export const selectCourseSearchingState = (state: AppState) => state.course;

export const selectCourseLoadingState = (state: AppState) => state.course.isLoading;

export default courseSlice.reducer;