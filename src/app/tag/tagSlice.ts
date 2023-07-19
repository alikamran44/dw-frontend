import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: null,
    loading: false,
  },
  reducers: {
    fetchTas: (state, action) => {
      state.tags = action.payload.tags;
    },
    createTag: (state, action) => {
      state.tags = state.tags.map(data =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    updateTag: (state, action) => {
      state.tags = state.tags.map(data =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter(data => data._id !== action.payload);
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
  fetchTas,
  createTag,
  updateTag,
  deleteTag,
  startLoading,
  stopLoading,
  loadMoreLoading,
} = tagSlice.actions;

export const selectTags = (state: RootState) => state.tag.tags;
export const selectTagLoading = (state: RootState) => state.tag.loading;

export default tagSlice.reducer;
