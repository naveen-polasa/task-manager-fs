import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "loginThunk",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5555/api/auth/login",
        user
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "registerThunk",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5555/api/auth/register",
        user
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userCreated: null,
  isLoggedIn: null,
  authToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.rejected, (state) => {
        state.userCreated = false;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.userCreated = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload: { token } }) => {
        state.authToken = token;
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
