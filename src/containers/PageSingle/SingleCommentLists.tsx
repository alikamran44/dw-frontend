import React, { FC } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import CommentCard, { CommentType } from "components/CommentCard/CommentCard";

export interface SingleCommentListsProps {
  comments: CommentType[];
  blog_id: any;
  blog_user_id: any;
  setComments: () => void;
  totalComments: String;
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({ comments, loading, blog_id,
  blog_user_id, setComments, totalComments }) => {
  let cmtLv1 = comments ? comments.filter((item) => !item.parentId) : [];

  const renderCommentItemChild = (comment: CommentType, parentCommentId: string) => {
    return (
      <li key={comment._id || comment.id}>
        <CommentCard size="normal" comment={comment} blog_id={blog_id} 
          blog_user_id={blog_user_id} setComments={setComments} comments={comments}
          parentId={parentCommentId}
        />
        {comment.children && (
          <ul className="pl-4 mt-5 space-y-5 md:pl-9">
            {comment.children.map(renderCommentItemChild)}
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
        />
        {comment.replyCM && (
          <ul className="pl-4 mt-5 space-y-5 md:pl-11">
            {comment.replyCM.map(childComment => renderCommentItemChild(childComment, comment._id))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {cmtLv1.map(renderCommentItem)}
      <ButtonPrimary className="dark:bg-primary-700 w-full">
        View full comments {totalComments && <span>(+{totalComments} comments)</span>}
      </ButtonPrimary>
    </ul>
  );
};

export default SingleCommentLists;
