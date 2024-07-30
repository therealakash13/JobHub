import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "job",
  initialState: {
    allJobs:[],
    singleJob:null
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  }
});

export const { setAllJobs,setSingleJob } = appSlice.actions;
export default appSlice.reducer;