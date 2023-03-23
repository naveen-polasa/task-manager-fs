import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: "",
  taskList: [],
};

export const searchTasks = createAsyncThunk("tasksFind", async () => {
  try {
    const { data } = await axios("http://localhost:5555/");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addToList = createAsyncThunk("postData", async (value) => {
  try {
    const { data } = await axios.post("http://localhost:5555/", {
      task: value,
    });
    return data.resp;
  } catch (error) {
    console.log(error);
  }
});

export const removeItem = createAsyncThunk("deleteItem", async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:5555/${id}`);
    console.log(data.resp);
    return data.resp;
  } catch (error) {
    console.log(error);
  }
});

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    setValue: (state, { payload }) => {
      state.value = payload;
    },
    toggleBtn: (state) => {
      state.btn = !state.btn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTasks.pending, (state) => {})
      .addCase(searchTasks.fulfilled, (state, { payload }) => {
        state.taskList = payload;
      })
      .addCase(searchTasks.rejected, (state) => {
        console.log("rejected");
      })
      .addCase(addToList.pending, (state) => {})
      .addCase(addToList.fulfilled, (state, { payload }) => {
        state.value = "";
        state.taskList = [...state.taskList, payload];
      })
      .addCase(addToList.rejected, (state) => {
        console.log("rejected");
      })
      .addCase(removeItem.pending, (state) => {})
      .addCase(removeItem.fulfilled, (state, { payload }) => {
        state.taskList = state.taskList.filter(
          (task) => task._id !== payload._id
        );
      })
      .addCase(removeItem.rejected, (state) => {});
  },
});

export const { setValue, toggleBtn } = tasksSlice.actions;

export default tasksSlice.reducer;
