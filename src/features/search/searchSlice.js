import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import redditApi from '../../api/redditApi';

// --- Async thunk for Reddit search ---
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query, { rejectWithValue }) => {
    try {
      const response = await redditApi.search(query);

      return (
        response?.data?.children?.map((child) => child.data) || []
      );
    } catch (error) {
      return rejectWithValue(error.message || 'Search failed');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],   // ⚠️ mindig tömb
    loading: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearResults(state) {
      state.results = [];
      state.query = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.results = [];
      });
  },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
