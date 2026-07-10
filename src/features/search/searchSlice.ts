import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedApi from '../../api/feedApi';

interface SearchResult {
  id: string;
  title?: string;
  display_name_prefixed?: string;
  [key: string]: any;
}

interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await feedApi.search(query);
      return response?.data?.children?.map((child: any) => child.data) || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch search results');
    }
  }
);

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearResults(state) {
      state.results = [];
      state.loading = false;
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
        state.results = action.payload || [];
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || null;
        state.results = [];
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;