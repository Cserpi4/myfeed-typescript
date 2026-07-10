import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

interface Post {
  id: string;
  title: string;
  [key: string]: any;
}

interface Subreddit {
  display_name: string;
  title: string;
  subscribers: number;
  icon_img: string | null;
  [key: string]: any;
}

interface SubredditState {
  subreddits: Subreddit[];
  activeSubreddit: string;
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// --- Fetch popular subreddits ---
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async (_: void, { rejectWithValue }) => {
    try {
      return await feedApi.fetchSubreddits();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch subreddits');
    }
  }
);

// --- Fetch posts for selected subreddit ---
export const fetchPostsBySubreddit = createAsyncThunk(
  'subreddits/fetchPostsBySubreddit',
  async (subreddit: string, { rejectWithValue }) => {
    try {
      return await feedApi.fetchSubreddit(subreddit);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch subreddit posts');
    }
  }
);

const initialState: SubredditState = {
  subreddits: [],
  activeSubreddit: 'popular',
  posts: [],
  loading: false,
  error: null,
};

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    setActiveSubreddit(state, action: PayloadAction<string>) {
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
          action.payload?.data?.children?.map((child: any) => child.data) || [];
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || null;
        state.subreddits = [];
      })

      // --- Load posts by subreddit ---
      .addCase(fetchPostsBySubreddit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsBySubreddit.fulfilled, (state, action) => {
        state.loading = false;
        state.posts =
          action.payload?.data?.children?.map((child: any) => child.data) || [];
      })
      .addCase(fetchPostsBySubreddit.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || null;
        state.posts = [];
      });
  },
});

export const { setActiveSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;