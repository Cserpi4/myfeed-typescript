import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async ({ subreddit, postId }, { rejectWithValue }) => {
    try {
      // 🔥 getComments helyett fetchComments-et hívunk, mert ez van a fájlban!
      return await feedApi.fetchComments(subreddit, postId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch comments');
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
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