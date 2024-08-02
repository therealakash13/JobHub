import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    adminCreatedJob: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAdminCreatedJob: (state, action) => {
      state.adminCreatedJob = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAdminCreatedJob } =
  appSlice.actions;
export default appSlice.reducer;
