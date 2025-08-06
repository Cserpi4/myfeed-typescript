import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API hívás thunk
export const fetchPosts = createAsyncThunk('home/fetchPosts', async () => {
  const response = await fetch('https://api.example.com/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return await response.json();
});

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    categories: [],
    selectedCategory: null,
  },
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = homeSlice.actions;

export default homeSlice.reducer;
