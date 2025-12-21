import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubreddits as fetchSubredditAPI, fetchPosts } from '../../api/redditApi';

// --- Fetch popular subreddits ---
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    const data = await fetchSubredditAPI();
    return data;
  }
);

// --- Fetch posts for selected subreddit ---
export const fetchPostsBySubreddit = createAsyncThunk(
  'subreddits/fetchPostsBySubreddit',
  async (subreddit) => {
    const data = await fetchPosts(subreddit);
    return data;
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
    setActiveSubreddit: (state, action) => {
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
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Load posts by subreddit ---
      .addCase(fetchPostsBySubreddit.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsBySubreddit.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsBySubreddit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setActiveSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;
