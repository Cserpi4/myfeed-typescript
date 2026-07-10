import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  searchTerm: string;
}

const initialState: HeaderState = {
  searchTerm: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state) {
      state.searchTerm = '';
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = headerSlice.actions;

export default headerSlice.reducer;