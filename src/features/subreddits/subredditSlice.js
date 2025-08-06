import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    const response = await fetch('/subreddits/popular.json');
    const data = await response.json();
    return data.data.children.map((child) => child.data);
  }
);

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.loading = false;
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default subredditSlice.reducer;
