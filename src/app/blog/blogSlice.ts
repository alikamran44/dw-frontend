import { createSlice,  PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "app/store";


interface BlogState {
  posts: any[]; // Replace 'any' with the actual type of your posts
  media_files: any[]; // Replace 'any' with the actual type of your media_files
  post: any; // Replace 'any' with the actual type of your post
  loading: boolean;
  loadingRecent: boolean;
  loadMoreLoading: boolean;
}

const initialState: BlogState = {
  posts: [],
  media_files: [],
  post: null,
  loading: false,
  loadingRecent: false,
  loadMoreLoading: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchMediaFiles: (state, action: PayloadAction<any[]>) => {
            state.media_files = action.payload;
        },
        uploadFile: (state, action: PayloadAction<any>) => {
            state.media_files = state.media_files.map((data) => data._id !== action.payload._id ? data : action.payload);
        },
        FetchPost: (state, action) => {
            state.post = action.payload;
        },
        FetchPosts: (state, action: PayloadAction<any[]>) => {
            state.posts = action.payload;
        },
        updateBlog: (state, action: PayloadAction<any>) => {
            state.posts = state.posts.map((data) => data._id !== action.payload._id ? data : action.payload);
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
        setLoadMoreLoading: (state, action: PayloadAction<boolean>) => {
            state.loadMoreLoading = action.payload;
        },
    }
});
export const { fetchMediaFiles, FetchPost, FetchPosts, updateBlog, toggleLoadingRecent, 
startLoading, stopLoading, setLoadMoreLoading, uploadFile, } = postSlice.actions;
export const selectPost = (state: RootState) => state.post;
export const selectBlogLoading = (state: RootState) => state.post.loading;
export const selectMediaFiles = (state: RootState) => state.post.media_files;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectLoadingRecent = (state: RootState) => state.post.loadingRecent;
export default postSlice.reducer;
