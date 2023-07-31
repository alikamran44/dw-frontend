import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface Tag {
  _id: string;
  slug: string;
  name: string;
  created_at: string; // You may use a different type for 'created_at', e.g., Date, if applicable
}
interface TagState {
  tags: Tag[];
  loading: boolean;
}

const initialState: TagState = {
  tags: [],
  loading: false,
};
const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    fetchTas: (state, action: PayloadAction<{ tags: Tag[] }>) => {
      state.tags = action.payload.tags;
    },
    createTag: (state, action: PayloadAction<Tag>) => {
      state.tags = state.tags.map((data: any) =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    updateTag: (state, action: PayloadAction<Tag>) => {
      state.tags = state.tags.map((data: any) =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((data: any) => data._id !== action.payload);
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
