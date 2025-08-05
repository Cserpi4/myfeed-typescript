import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserAvatar: null,  // pl. avatar URL
  status: 'idle',           // idle | loading | succeeded | failed
  error: null,
};

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar(state, action) {
      state.currentUserAvatar = action.payload;
      state.status = 'succeeded';
    },
    clearAvatar(state) {
      state.currentUserAvatar = null;
      state.status = 'idle';
    },
    setLoading(state) {
      state.status = 'loading';
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setAvatar, clearAvatar, setLoading, setError } = avatarSlice.actions;

export default avatarSlice.reducer;
