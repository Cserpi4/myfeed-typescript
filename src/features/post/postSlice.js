import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

export const fetchPostFeed = createAsyncThunk(
  'post/fetchPostFeed',
  async (subreddit = 'popular', { rejectWithValue }) => {
    try {
      const response =
        subreddit === 'popular'
          ? await feedApi.fetchPosts()
          : await feedApi.fetchSubreddit(subreddit);

      return (
        response?.data?.children?.map((child) => child.data) || []
      );
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

const initialState = {
  posts: [],
  status: 'idle', // idle | loading | succeeded | failed
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
      .addCase(fetchPostFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPostFeed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.posts = [];
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;