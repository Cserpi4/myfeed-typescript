import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async (_, { rejectWithValue }) => {
    try {
      return await feedApi.fetchSubreddits();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch subreddits');
    }
  }
);

export const fetchPostsBySubreddit = createAsyncThunk(
  'subreddits/fetchPostsBySubreddit',
  async (id, { rejectWithValue }) => {
    try {
      return await feedApi.fetchSubreddit(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch subreddit posts');
    }
  }
);

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: [],
    activeSubredditId: null,
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setActiveSubredditId(state, action) {
      state.activeSubredditId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.loading = false;
        state.subreddits =
          action.payload?.data?.children?.map((child) => child.data) || [];
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.subreddits = [];
      })
      .addCase(fetchPostsBySubreddit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsBySubreddit.fulfilled, (state, action) => {
        state.loading = false;
        state.posts =
          action.payload?.data?.children?.map((child) => child.data) || [];
      })
      .addCase(fetchPostsBySubreddit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.posts = [];
      });
  },
});

export const { setActiveSubredditId } = subredditSlice.actions;
export default subredditSlice.reducer;