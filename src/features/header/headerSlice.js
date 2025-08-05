// src/features/header/headerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    clearSearchTerm(state) {
      state.searchTerm = '';
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = headerSlice.actions;

export default headerSlice.reducer;
