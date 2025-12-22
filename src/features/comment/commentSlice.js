import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import redditApi from '../../api/redditApi';

// 🔥 Helper: Reddit comment tree flattenelése
const flattenComments = (comments, depth = 0) => {
  let result = [];

  comments.forEach((item) => {
    if (item.kind !== 't1') return;

    const comment = item.data;

    result.push({
      id: comment.id,
      author: comment.author,
      body: comment.body,
      score: comment.score,
      created: comment.created_utc,
      depth,
    });

    if (comment.replies?.data?.children?.length) {
      result = result.concat(
        flattenComments(comment.replies.data.children, depth + 1)
      );
    }
  });

  return result;
};

// --- Fetch comments for a post ---
export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async ({ subreddit, postId }, { rejectWithValue }) => {
    try {
      const response = await redditApi.fetchComments(subreddit, postId);

      const commentListing = response?.[1]?.data?.children || [];

      return flattenComments(commentListing);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch comments');
    }
  }
);

const initialState = {
  comments: [],      // ⚠️ mindig lapított tömb
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
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.comments = [];
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
