import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserAvatar: null,
};

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar(state, action) {
      state.currentUserAvatar = action.payload;
    },
    clearAvatar(state) {
      state.currentUserAvatar = null;
    },
  },
});

export const { setAvatar, clearAvatar } = avatarSlice.actions;
export default avatarSlice.reducer;
