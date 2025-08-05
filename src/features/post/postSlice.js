// src/features/post/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Példa async thunk, amivel post adatok jönnek egy Reddit API végpontról (pl. egy adott subreddit postjai)
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (subreddit = 'popular') => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data.data.children.map(child => child.data);
  }
);

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
