import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CommentType } from "components/CommentCard/CommentCard";
import {
  selectCommentRecentLikeds,
  selectCommentRecentRemoveds,
  removeLikedByPostId,
  addNewLikedByPostId,
} from "app/commentLikes/commentLikes";
import CommentCardLikeReply, {
  CommentCardLikeReplyProps,
} from "components/CommentCardLikeReply/CommentCardLikeReply";
import { likeComment } from '../../Actions/CommentAction';
import  { setAlert, 
          selectConfirmAlert, 
          onRemoveConfirmAlert, 
          removeAlert 
        } from "app/auth/authSlice";

export interface CommentCardLikeReplyContainerProps
  extends Pick<CommentCardLikeReplyProps, "onClickReply"> {
  className?: string;
  comment: CommentType;
  parentId: string | null;
}

const CommentCardLikeReplyContainer: FC<CommentCardLikeReplyContainerProps> = ({
  className = "",
  comment,
  parentId,
  ...args
}) => {
  const { like, id, content, _id } = comment;
  const history = useHistory()
  const confirmAlert = useAppSelector(selectConfirmAlert);
  const user = JSON.parse(localStorage.getItem('userInfo')) || null;
  const recentLikeds = useAppSelector(selectCommentRecentLikeds);
  const recentRemoveds = useAppSelector(selectCommentRecentRemoveds);
  const dispatch = useAppDispatch();

   useEffect(()=>{
    if(like?.users?.includes(user?._id) && _id){
      if(!recentLikeds.includes(_id)){
        dispatch(addNewLikedByPostId(_id));
      }
    }
  },[_id])
  useEffect(()=>{
    if(confirmAlert === 'like'){
      dispatch(onRemoveConfirmAlert())
      dispatch(removeAlert())
      history.push("/login");
    }
  },[confirmAlert])

  const isLiked = () => {
    if (recentLikeds.includes(_id)) {
      return true;
    }
    return false;
  };
  const getLikeCount = (): number => {
    // Recent Liked
    if (user && recentLikeds.includes(_id) ) {
      if(like.users?.includes(user?._id) ){
        return like.count
      }
      return like.count + 1;
    }
    if (like?.users?.includes(user?._id) && recentRemoveds.includes(_id)) {
      return like?.count - 1;
    }
    return like?.count;
  };

  const handleClickLike = () => {
    if(user){
      likeComment(_id).then((res) => { })
      if (isLiked()) {
        dispatch(removeLikedByPostId(_id));
      } else {
        dispatch(addNewLikedByPostId(_id));
      }
    }else{
      dispatch(setAlert({
        children: "Please Login to like comment!",
        containerClassName: "",
        type: "default",
        showCloseButton: true,
        showConfirmButton: true,
        alertAction : 'like_comment',
        showCancel: true,
        confirmButtonText: "Login",
        cancelButtonText: "Stay",
      }));
    }
  };

  return (
    <CommentCardLikeReply
      className={className}
      onClickLike={handleClickLike}
      commentId={_id}
      isLiked={isLiked()}
      hasComment={ content ? true : false}
      likeCount={getLikeCount()}
      parentId={parentId}
      {...args}
    />
  );
};

export default CommentCardLikeReplyContainer;
