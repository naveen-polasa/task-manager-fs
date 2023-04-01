import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = "https://task-manager-fs.onrender.com";

export const loginThunk = createAsyncThunk(
  "loginThunk",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(`${url}/api/auth/login`, user);
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
      const { data } = await axios.post(`${url}/api/auth/register`, user);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("token")) ? true : false,
  authToken: JSON.parse(localStorage.getItem("token")) || "",
  username: "user",
  isError: false,
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
      toast.success("Logged Out Successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.rejected, (state) => {
        state.isError = true;
        toast.error(
          "Name & Password Should Be More Than 6 & Mail Should Be Unique"
        );
      })
      .addCase(
        registerThunk.fulfilled,
        (state, { payload: { token, user } }) => {
          toast.success("Registration Successful");
          state.isError = false;
          state.username = user.name;
          state.authToken = token;
          localStorage.setItem("token", JSON.stringify(token));
          state.isLoggedIn = true;
        }
      )
      .addCase(loginThunk.rejected, (state, { payload: { response } }) => {
        toast.error(response.data.msg);
        state.isLoggedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload: { token, user } }) => {
        state.username = user.name;
        state.authToken = token;
        localStorage.setItem("token", JSON.stringify(token));
        state.isLoggedIn = true;
        toast.success("Logged In Successfully");
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
