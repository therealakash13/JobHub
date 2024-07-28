import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import jobslice from "./jobslice";

const store = configureStore({
  reducer: {
    auth: authslice,
    job:jobslice,
  },
});

export default store;
