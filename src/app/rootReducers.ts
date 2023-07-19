import bookmarkReducer from "./bookmarks/bookmarksSlice";
import authReducer from "./auth/authSlice";
import blogReducer from "./blog/blogSlice";
import categoryReducer from "./category/categorySlice";
import tagReducer from "./tag/tagSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";

const rootReducers = {
  bookmark: bookmarkReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  pages: pagesReducer,
  mediaRunning: mediaRunningReducer,
  login: authReducer,
  post: blogReducer,
  category: categoryReducer,
  tag: tagReducer,
};

export default rootReducers;
