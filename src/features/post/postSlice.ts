import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

interface Post {
  id: string;
  title: string;
  [key: string]: any;
}

interface PostState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchPostFeed = createAsyncThunk(
  'post/fetchPostFeed',
  async (subreddit: string = 'popular', { rejectWithValue }) => {
    try {
      const response =
        subreddit === 'popular'
          ? await feedApi.fetchPosts()
          : await feedApi.fetchSubreddit(subreddit);

      return response?.data?.children?.map((child: any) => child.data) || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

const initialState: PostState = {
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
      .addCase(fetchPostFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPostFeed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || null;
        state.posts = [];
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;