import React, { FC } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import CommentCard, { CommentType } from "components/CommentCard/CommentCard";

export interface SingleCommentListsProps {
  comments: CommentType[];
  blog_id: any;
  blog_user_id: any;
  setComments: (data: any) => void;
  viewMoreComments?: () => void;
  totalComments: String | null;
  loading?: boolean; 
  commentMoreLoading?: boolean;
  remainingCommentCount?: number;
  commentLoading?: boolean;
  setCommentLoading?: (data: any) => void;
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({ comments, loading, blog_id,
  blog_user_id, setComments, totalComments, commentMoreLoading, viewMoreComments,
  remainingCommentCount, commentLoading, setCommentLoading }) => {
  let cmtLv1 = comments ? comments.filter((item: CommentType) => !item.parentId) : [];

  const renderCommentItemChild = (comment: CommentType, parentCommentId: any) => {
    return (
      <li key={comment._id || comment.id}>
        <CommentCard size="normal" comment={comment} blog_id={blog_id} 
          blog_user_id={blog_user_id} setComments={setComments} comments={comments}
          parentId={parentCommentId} commentLoading={commentLoading}
          setCommentLoading={setCommentLoading}
        />
        {comment.children && (
          <ul className="pl-4 mt-5 space-y-5 md:pl-9">
            {comment.children.map((childComment: CommentType) => renderCommentItemChild(childComment, comment._id))}
          </ul>
        )}
      </li>
    ); 
  };

  const renderCommentItem = (comment: CommentType) => {
    return (
      <li key={comment._id || comment.id}>
        <CommentCard comment={comment} blog_id={blog_id} blog_user_id={blog_user_id} 
          setComments={setComments} comments={comments} 
          commentLoading={commentLoading} setCommentLoading={setCommentLoading}
        />
        {comment.replyCM && (
          <ul className="pl-4 mt-5 space-y-5 md:pl-11">
            {comment.replyCM.map((childComment: CommentType) => renderCommentItemChild(childComment, comment._id))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {cmtLv1.map(renderCommentItem)}
      {
        remainingCommentCount ? (remainingCommentCount > 0 &&
                <ButtonPrimary onClick={viewMoreComments} className="dark:bg-primary-700 w-full">
                  View full comments {remainingCommentCount && <span>(+{remainingCommentCount} comments)</span>}
                </ButtonPrimary>) : ''
      }
    </ul>
  );
};

export default SingleCommentLists;
