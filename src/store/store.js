// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ha szükséges, pl. nem serializálható adatok miatt
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
