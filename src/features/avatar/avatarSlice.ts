import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AvatarState {
  currentUserAvatar: string | null;
}

const initialState: AvatarState = {
  currentUserAvatar: null,
};

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string>) {
      state.currentUserAvatar = action.payload;
    },
    clearAvatar(state) {
      state.currentUserAvatar = null;
    },
  },
});

export const { setAvatar, clearAvatar } = avatarSlice.actions;
export default avatarSlice.reducer;