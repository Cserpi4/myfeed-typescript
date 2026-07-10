import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';
import { Post } from '../../types/post';

interface HomeState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

interface FetchPostsArgs {
  subreddit?: string;
  searchTerm?: string;
}

export const fetchPosts = createAsyncThunk(
  'home/fetchPosts',
  async ({ subreddit, searchTerm }: FetchPostsArgs, { rejectWithValue }) => {
    try {
      if (searchTerm) {
        return await feedApi.search(searchTerm);
      }

      if (subreddit && subreddit !== 'popular') {
        return await feedApi.fetchSubreddit(subreddit);
      }

      return await feedApi.fetchPosts();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

const initialState: HomeState = {
  posts: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
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
          action.payload?.data?.children?.map((child: any) => child.data) || [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || null;
        state.posts = [];
      });
  },
});

export default homeSlice.reducer;