// src/features/subreddit/subredditSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Reddit API: subredditek listázása
export const fetchSubreddits = createAsyncThunk(
  'subreddit/fetchSubreddits',
  async () => {
    const response = await fetch('https://www.reddit.com/subreddits.json');
    if (!response.ok) {
      throw new Error('Failed to fetch subreddits');
    }
    const data = await response.json();
    // data.data.children tartalmazza a subredditeket
    return data.data.children.map(child => child.data);
  }
);

const initialState = {
  subreddits: [],
  status: 'idle',
  error: null,
};

const subredditSlice = createSlice({
  name: 'subreddit',
  initialState,
  reducers: {
    clearSubreddits(state) {
      state.subreddits = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearSubreddits } = subredditSlice.actions;

export default subredditSlice.reducer;
