import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import tagReducer from "./tag/tagSlice";
import categoryReducer from "./category/categorySlice";
import authReducer from "./auth/auth";
import blogReducer from "./blog/blogSlice";

const rootReducers = {
  bookmark: bookmarkReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  pages: pagesReducer,
  mediaRunning: mediaRunningReducer,
  tag: tagReducer,
  category: categoryReducer,
  login: authReducer,
  post: blogReducer,
};

export default rootReducers;
