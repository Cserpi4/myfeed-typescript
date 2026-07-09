import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

export const fetchPosts = createAsyncThunk(
  'home/fetchPosts',
  async ({ subreddit, searchTerm }, { rejectWithValue }) => {
    try {
      if (searchTerm) {
        return await feedApi.search(searchTerm);
      }

      if (subreddit && subreddit !== 'popular') {
        return await feedApi.fetchSubreddit(subreddit);
      }

      return await feedApi.fetchPosts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts =
          action.payload?.data?.children?.map((child) => child.data) || [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.posts = [];
      });
  },
});

export default homeSlice.reducer;