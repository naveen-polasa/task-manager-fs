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
  isLoggedIn: JSON.parse(localStorage.getItem("token")) ? true : false,
  authToken: JSON.parse(localStorage.getItem("token")) || "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.authToken = "";
      localStorage.removeItem("token");
    },
  },
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
        localStorage.setItem("token", JSON.stringify(token));
        state.isLoggedIn = true;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
