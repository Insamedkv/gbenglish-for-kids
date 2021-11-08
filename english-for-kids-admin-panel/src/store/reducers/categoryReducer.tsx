import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryWithWords } from '../../components/admin/dataInterfaces';

export interface CategoryState {
  categoriesWithWords: CategoryWithWords[] | null
}

const initialState: CategoryState = {
  categoriesWithWords: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesWithWords: (state, action: PayloadAction<CategoryWithWords[]>) => { state.categoriesWithWords = action.payload; },
  },
});

export const { setCategoriesWithWords } = categorySlice.actions;

export const categoriesReducer = categorySlice.reducer;
