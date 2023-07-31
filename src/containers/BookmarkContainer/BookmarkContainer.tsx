import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "app/hooks";
import NcBookmark, { NcBookmarkProps } from "components/NcBookmark/NcBookmark";
import { bookmarkBlog } from '../../Actions/PostAction';
import { selectBlogLoading } from "app/blog/blogSlice";
import  {
          addNewSavedByPostId,
          removeSavedByPostId,
          selectRecentSaveds,
          selectRecentRemoveds,
        } from "app/bookmarks/bookmarksSlice";
import  { setAlert, 
          selectConfirmAlert, 
          onRemoveConfirmAlert, 
          removeAlert 
        } from "app/auth/auth";
export type BookmarkContainerProps = Omit<NcBookmarkProps, "isBookmarked"> & {
  initBookmarked: boolean;
  loading?: boolean;
  bookmark: any
};

const BookmarkContainer: React.FC<BookmarkContainerProps> = (props) => {
  const history = useHistory()
  const confirmAlert = useAppSelector(selectConfirmAlert);
  const { postId, initBookmarked, bookmark } = props;
  const recentSaveds = useAppSelector(selectRecentSaveds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const loading = useAppSelector(selectBlogLoading)
  interface UserInfo {
    name: string;
    email: string;
    role: string;
    _id: string;
  }
  const userInfoString = localStorage.getItem('userInfo');
  const user: UserInfo | null = (userInfoString && JSON.parse(userInfoString)) || null;

  const dispatch = useAppDispatch();
  const isBookmarked = () => {
    if(postId){
      if (user && recentSaveds.includes(postId)) {
        return true;
      }
      if ( (Array.isArray(bookmark) && bookmark?.includes(user?._id)) 
        && !recentRemoveds.includes(postId)) {
        return true;
      }
    }

    return false;
  };

  const handleClickBookmark = () => {
    if(user){
      if(postId){
        bookmarkBlog(postId).then((res) => {
        })
        if (isBookmarked()) {
          dispatch(removeSavedByPostId(postId));
        } else {
          dispatch(addNewSavedByPostId(postId));
        }
      }
    }else{
      dispatch(setAlert({
        children: "Please Login to Save!",
        containerClassName: "",
        type: "default",
        title: "Login",
        emoji: "🚫",
        showCloseButton: true,
        showConfirmButton: true,
        alertAction : 'save',
        showCancel: true,
        confirmButtonText: "Login",
        cancelButtonText: "Stay",
      }));
    }
  };
  useEffect(()=>{
    if(confirmAlert === 'save'){
      dispatch(onRemoveConfirmAlert())
      dispatch(removeAlert())
      history.push("/login");
    }
  },[confirmAlert])
  useEffect(()=>{
    if(Array.isArray(bookmark))
      if(bookmark?.includes(user?._id)){
        if(postId)
          if(!recentSaveds.includes(postId)){
            dispatch(addNewSavedByPostId(postId));
          }
      }
  },[])

  return (
    <NcBookmark
      onClick={handleClickBookmark}
      isBookmarked={isBookmarked()}
      {...props}
    />
  );
};

export default BookmarkContainer;
