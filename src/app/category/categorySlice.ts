import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface CategoryState {
  categories: any[]; // Replace 'any' with the actual type of your categories
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
};
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategories: (state, action: PayloadAction<{ categories: any[] }>) => {
      state.categories = action.payload.categories;
    },
    createCategory: (state, action: PayloadAction<{ newCategory: any }>) => {
      state.categories.unshift(action.payload.newCategory);
    },
    updateCategory: (state, action: PayloadAction<any>) => {
      state.categories = state.categories.map((data: any) =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    deleteCategory: (state, action: PayloadAction<any>) => {
      state.categories = state.categories.filter((data: any) => data._id !== action.payload);
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    loadMoreLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  startLoading,
  stopLoading,
  loadMoreLoading,
} = categorySlice.actions;

export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategoryLoading = (state: RootState) => state.category.loading;

export default categorySlice.reducer;
