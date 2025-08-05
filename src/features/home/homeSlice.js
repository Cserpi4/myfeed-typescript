// src/features/home/homeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['Popular', 'News', 'Sports', 'Technology'],
  selectedCategory: 'Popular',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = homeSlice.actions;

export default homeSlice.reducer;
