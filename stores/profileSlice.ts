import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

interface ProfileState {
  firstName: string;
  lastName: string;
  nickName: string;
  role: string;
  gender: string;
  birthDate: string;
  uuid: string;
}

// Initial state
const initialState: ProfileState = {
  firstName: '',
  lastName: '',
  nickName: '',
  role: '',
  gender: '',
  birthDate: '',
  uuid: '',
};

// Actual Slice
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {

    setProfileState(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.nickName = action.payload.nickName;
      state.role = action.payload.user_role;
      state.gender = action.payload.gender;
      state.birthDate = action.payload.birth_day.slice(0, 10);
      state.uuid = action.payload.uuid;
    },

    setProfilePartialState(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.nickName = action.payload.nickName;
      state.gender = action.payload.gender;
      state.birthDate = action.payload.birthDate;
    },

    setProfileInitialState(state, action) {
      if (action.payload) {
        state.firstName = '';
        state.lastName = '';
        state.nickName = '';
        state.role = '';
        state.gender = '';
        state.birthDate = '';
        state.uuid = '';
      }
    },

  },
});

export const { setProfileState, setProfilePartialState, setProfileInitialState } = profileSlice.actions;

export const selectProfileState = (state: AppState) => state.profile;

export default profileSlice.reducer;