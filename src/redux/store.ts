import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 在这里添加更多的 reducers
  },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;