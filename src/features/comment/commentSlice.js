import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Példa: ha lekérnénk kommenteket egy API-ról (Reddit JSON API esetén)
// Itt most dummy async thunk, később megírhatjuk konkrét API hívással
export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId, thunkAPI) => {
    const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  comments: [],
  status: 'idle',
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearComments(state) {
      state.comments = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        // Reddit API JSON válasz komplex, itt csak példaként hozzuk létre a comments tömböt
        // valójában szűrni kellene a válaszból a komment adatokat
        state.status = 'succeeded';
        state.comments = action.payload[1].data.children.map(child => child.data);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearComments } = commentSlice.actions;

export default commentSlice.reducer;
