import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

interface Comment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
  [key: string]: any;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

interface FetchCommentsArgs {
  subreddit: string;
  postId: string;
}

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async ({ subreddit, postId }: FetchCommentsArgs, { rejectWithValue }) => {
    try {
      const response = await feedApi.fetchComments(subreddit, postId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch comments');
    }
  }
);

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearComments(state) {
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload || [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || null;
        state.comments = [];
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;