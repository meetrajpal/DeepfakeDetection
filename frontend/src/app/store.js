import { configureStore } from "@reduxjs/toolkit";
import curUserReducer from "../reducers/curUserReducer";

export const store = configureStore({
  reducer: {
    current_user: curUserReducer,
  },
});
