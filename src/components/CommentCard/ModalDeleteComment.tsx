import React, { FC, useEffect, useRef } from "react";
import NcModal from "components/NcModal/NcModal";
import { CommentType } from "./CommentCard";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { deleteComment } from '../../Actions/CommentAction';

export interface ModalDeleteCommentProps {
  commentId: CommentType["id"];
  show: boolean;
  onCloseModalDeleteComment: () => void;
  setComments: () => void;
  parentId: string | null;
}

const ModalDeleteComment: FC<ModalDeleteCommentProps> = ({
  commentId,
  show,
  onCloseModalDeleteComment,
  id,
  comments,
  setComments, 
  parentId
}) => {
  const textareaRef = useRef(null);

  const handleClickSubmitForm = () => {
    deleteComment(id).then((res) => {
        let updateBlog = null
        if(!parentId){
          updateBlog = comments.filter((rec) => rec._id !== id && rec)
        }else{
          updateBlog = comments.map((rec) => ({
            ...rec,
            replyCM: rec.replyCM.filter((reply) => reply._id !== id)
          }));
        }
        if(updateBlog){
          setComments(updateBlog)
          onCloseModalDeleteComment()
        }
      })
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Delete comment
        </h3>
        <span className="text-sm">
          Are you sure you want to delete this comment? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDeleteComment}>
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDeleteComment}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDeleteComment;
