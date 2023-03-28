import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import tasksSlice from "./features/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    auth: authSlice,
  },
});
