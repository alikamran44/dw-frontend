import React, { FC } from "react";
import PostCardCommentBtn from "components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "containers/PostCardLikeContainer/PostCardLikeContainer";
import { PostDataType } from "data/types";

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  postData: PostDataType;
  hiddenCommentOnMobile?: boolean;
  loading?: boolean;
  onClickLike?: (id: PostDataType["id"]) => void;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  postData,
  loading = false,
  onClickLike = () => {},
}) => {
   const pHref = postData.postType === 'audio' ? `/blog-audio/${postData.slug}` :
              postData.postType === 'video' ? `/blog-video/${postData.slug}` : postData.isSideBar ? 
              `/blog-view/${postData.slug}` : postData.postType === 'gallery' ? 
              `/blog-gallery/${postData.slug}` : `/blog/${postData.slug}`
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
      <PostCardLikeContainer
        className={itemClass}
        like={postData.like}
        onClickLike={onClickLike}
        postId={postData._id}
        loading={loading}
      />
      <PostCardCommentBtn
        href={pHref}
        loading={loading}
        commentCount={postData.comments ? postData.comments?.length : 4}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
      />
    </div>
  );
};

export default PostCardLikeAndComment;
