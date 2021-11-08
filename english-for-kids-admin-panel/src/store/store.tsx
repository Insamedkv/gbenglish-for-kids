import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './reducers/categoryReducer';

export const store = configureStore({
  reducer: {
    categoriesWithWords: categoriesReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
