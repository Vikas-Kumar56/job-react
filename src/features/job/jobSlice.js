import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (obj) => {
  const { limit, offset } = obj;
  const response = await axios.get(
    `http://localhost:5000/api/v1/jobs?limit=${limit}&offset=${offset}`
  );
  return response.data.jobs;
});

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJobs.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchJobs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched jobs to the array
      state.jobs = state.jobs.concat(action.payload);
    },
    [fetchJobs.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
// export const {} = jobSlice.actions;

export default jobSlice.reducer;

export const selectAllJobs = (state) => state.jobs.jobs;
