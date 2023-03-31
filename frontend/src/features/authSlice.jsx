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
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  userCreated: null,
  isLoggedIn: JSON.parse(localStorage.getItem("token")) ? true : false,
  authToken: JSON.parse(localStorage.getItem("token")) || "",
  errorMsg: "",
  username: "user",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.username = "user";
      state.authToken = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.rejected, (state, { payload }) => {
        console.log(payload);
        state.userCreated = false;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, { payload: { token, user } }) => {
          state.username = user.name;
          state.userCreated = true;
          state.authToken = token;
          localStorage.setItem("token", JSON.stringify(token));
          state.isLoggedIn = true;
        }
      )
      .addCase(loginThunk.rejected, (state, { payload: { response } }) => {
        state.errorMsg = response.data.msg;
        console.log(state.errorMsg);
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload: { token, user } }) => {
        state.username = user.name;
        state.authToken = token;
        localStorage.setItem("token", JSON.stringify(token));
        state.isLoggedIn = true;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
