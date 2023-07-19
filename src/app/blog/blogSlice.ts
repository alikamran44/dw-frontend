import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: null,
    media_files: null,
    post: null,
    loading: false,
    loadingRecent: false,
    loadMoreLoading: false,
  },
  reducers: {
    fetchMediaFiles: (state, action) => {
      state.media_files = action.payload;
    },
    uploadFile: (state, action) => {
      state.media_files = state.media_files.map(data =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    FetchPost: (state, action) => {
      state.post = action.payload;
    },
    FetchPosts: (state, action) => {
      state.posts = action.payload;
    },
    updateBlog: (state, action) => {
      state.posts = state.posts.map(data =>
        data._id !== action.payload._id ? data : action.payload
      );
    },
    toggleLoadingRecent: (state) => {
      state.loadingRecent = !state.loadingRecent;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setLoadMoreLoading: (state, action) => {
      state.loadMoreLoading = action.payload;
    },
  }
});

export const {
  fetchMediaFiles,
  FetchPost,
  FetchPosts,
  updateBlog,
  toggleLoadingRecent,
  startLoading,
  stopLoading,
  setLoadMoreLoading,
  uploadFile,
} = postSlice.actions;

export const selectPost = (state: RootState) => state.post;
export const selectBlogLoading = (state: RootState) => state.post.loading;
export const selectMediaFiles = (state: RootState) => state.post.media_files;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectLoadingRecent = (state: RootState) => state.post.loadingRecent;

export default postSlice.reducer;