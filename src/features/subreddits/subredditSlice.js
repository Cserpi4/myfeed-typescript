import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import redditApi from '../../api/redditApi';

// --- Fetch popular subreddits ---
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async (_, { rejectWithValue }) => {
    try {
      return await redditApi.fetchSubreddits();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch subreddits');
    }
  }
);

// --- Fetch posts for selected subreddit ---
export const fetchPostsBySubreddit = createAsyncThunk(
  'subreddits/fetchPostsBySubreddit',
  async (subreddit, { rejectWithValue }) => {
    try {
      return await redditApi.fetchSubreddit(subreddit);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch subreddit posts');
    }
  }
);

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: [],
    activeSubreddit: 'popular',
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setActiveSubreddit(state, action) {
      state.activeSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Load subreddit list ---
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

      // --- Load posts by subreddit (NORMALIZÁLT) ---
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

export const { setActiveSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;
