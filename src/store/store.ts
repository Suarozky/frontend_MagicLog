// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Infer the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;