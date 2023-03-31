import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  value: "",
  taskList: [],
  isEdit: false,
  editId: null,
  isLoading: false,
  isError: false,
};

export const searchTasks = createAsyncThunk(
  "tasksFind",
  async (authToken, thunkAPI) => {
    try {
      const { data } = await axios("http://localhost:5555/api/tasks", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToList = createAsyncThunk(
  "postData",
  async ({ value, authToken }, thunkAPI) => {
    if (!value) return;
    try {
      const {
        data: { data },
      } = await axios.post(
        "http://localhost:5555/api/tasks",
        {
          task: value,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  "deleteItem",
  async ({ id, authToken }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axios.delete(`http://localhost:5555/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editItem = createAsyncThunk(
  "editItem",
  async ({ editId, value, authToken }) => {
    try {
      const {
        data: { data },
      } = await axios.patch(
        `http://localhost:5555/api/tasks/${editId}`,
        {
          task: value,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    setValue: (state, { payload }) => {
      if (!payload) state.isEdit = false;
      state.value = payload;
    },
    toggleEdit: (state, { payload: { id, task } }) => {
      state.isEdit = !state.isEdit;
      state.value = task;
      state.editId = id;
      if (!state.isEdit) state.value = "";
    },
    resetTasks: (state) => {
      state.taskList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchTasks.fulfilled, (state, { payload: { tasks } }) => {
        state.isLoading = false;
        state.taskList = tasks;
      })
      .addCase(searchTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        console.log(payload);
      })
      .addCase(addToList.pending, (state) => {})
      .addCase(addToList.fulfilled, (state, { payload }) => {
        state.value = "";
        state.taskList = [...state.taskList, payload];
        toast.success("Task Added to List");
      })
      .addCase(addToList.rejected, (state, { payload }) => {
        console.log(payload);
      })
      .addCase(removeItem.pending, (state) => {})
      .addCase(removeItem.fulfilled, (state, { payload }) => {
        state.taskList = state.taskList.filter(
          (task) => task._id !== payload._id
        );
        toast.success("Task Deleted Successfully");
      })
      .addCase(removeItem.rejected, (state, { payload }) => {
        console.log(payload);
      })
      .addCase(editItem.pending, (state) => {})
      .addCase(editItem.fulfilled, (state, { payload: { _id } }) => {
        state.taskList = state.taskList.map((item) => {
          if (item._id === _id) {
            item.task = state.value;
            return item;
          }
          return item;
        });
        state.isEdit = false;
        state.value = "";
        toast.success("Task Edited Successfully");
      })
      .addCase(editItem.rejected, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export const { setValue, toggleEdit, resetTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
