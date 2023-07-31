
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { likeBlog } from '../../Actions/PostAction';
import { selectBlogLoading } from "app/blog/blogSlice";
import { PostDataType } from "data/types";
import  {
          selectRecentLikeds,
          selectRecentRemoveds,
          removeLikedByPostId,
          addNewLikedByPostId,
        } from "app/postLikes/postLikes";
import  { setAlert, 
          selectConfirmAlert, 
          onRemoveConfirmAlert, 
          removeAlert 
        } from "app/auth/auth";
import  PostCardLikeAction, 
        {
          PostCardLikeActionProps,
        } from "components/PostCardLikeAction/PostCardLikeAction";

export interface PostCardLikeContainerProps
  extends Omit<PostCardLikeActionProps, "isLiked" | "likeCount"> {
  like: PostDataType["like"];
  postId: any;
}
const PostCardLikeContainer: FC<PostCardLikeContainerProps> = ({
  like,
  postId,
  onClickLike,
  ...args
}) => {
  const history = useHistory()
  const confirmAlert = useAppSelector(selectConfirmAlert);
  const recentLikeds = useAppSelector(selectRecentLikeds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const loading = useAppSelector(selectBlogLoading)
  const dispatch = useAppDispatch();
  interface UserInfo {
    name: string;
    email: string;
    role: string;
    _id: string;
  }
  const userInfoString = localStorage.getItem('userInfo');
  const user: UserInfo | null = (userInfoString && JSON.parse(userInfoString)) || null;

  useEffect(()=>{
    if(like.users?.includes(user?._id)){
      if(!recentLikeds.includes(postId)){
        dispatch(addNewLikedByPostId(postId));
      }
    }
  },[])

  useEffect(()=>{
    if(confirmAlert === 'like'){
      dispatch(onRemoveConfirmAlert())
      dispatch(removeAlert())
      history.push("/login");
    }
  },[confirmAlert])

  const isLiked = () => {
    if (recentLikeds.includes(postId) ) {
      return true;
    }
    return false;
  };

  const getLikeCount = (): number => {
    // Recent Liked
    if (user && recentLikeds.includes(postId) ) {
      if(like.users?.includes(user?._id) ){
        return (like.count ?? 0)
      }
      return (like.count ?? 0) + 1;
    }
    if (like.users?.includes(user?._id) && recentRemoveds.includes(postId)) {
      return (like.count ?? 0) - 1;
    }
    return (like.count ?? 0);
  };

  const handleClickLike = () => {
    if(user){
      dispatch(likeBlog(postId)).then((res: any) => { })
      if (isLiked()) {
        dispatch(removeLikedByPostId(postId));
      } else {
        dispatch(addNewLikedByPostId(postId));
      }
      onClickLike && onClickLike(postId);
    }else{
      dispatch(setAlert({
        children: "Please Login to like!",
        containerClassName: "",
        title: "Login",
        emoji: "🚫",
        type: "default",
        showCloseButton: true,
        showConfirmButton: true,
        alertAction : 'like',
        showCancel: true,
        confirmButtonText: "Login",
        cancelButtonText: "Stay",
      }));
    }
  };

  return (
    <PostCardLikeAction
      {...args}
      isLiked={recentLikeds.includes(postId)}
      likeCount={getLikeCount()}
      postId={postId}
      onClickLike={handleClickLike}
    />
  );
};

export default PostCardLikeContainer;
