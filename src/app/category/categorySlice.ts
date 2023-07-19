import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: null,
    loading: false,
  },
  reducers: {
    fetchCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    createCategory: (state, action) => {
      state.categories.unshift(action.payload.newCategory);
    },
    updateCategory: (state, action) => {
      state.categories = state.categories.map(data =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(data => data._id !== action.payload);
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    loadMoreLoading: (state, action) => {
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
