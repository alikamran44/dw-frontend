import React, { FC, useEffect, useRef } from "react";
import NcModal from "components/NcModal/NcModal";
import SingleCommentForm from "containers/PageSingle/SingleCommentForm";
import { CommentType } from "./CommentCard";
import { updateComment } from '../../Actions/CommentAction';

export interface ModalEditCommentProps {
  comment: CommentType;
  show: boolean;
  onCloseModalEditComment: () => void;
  setComments: (data: any) => void;
  id?: string | number;
  comments: any;
}

const ModalEditComment: FC<ModalEditCommentProps> = ({
  comment,
  show,
  onCloseModalEditComment,
  id = '',
  setComments,
  comments
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 400);
    }
  }, [show]);

  const editCommentHandler = (values: any) => {
    if(values){
      values._id = id;
      // values.reply_user_id = user?._id
      updateComment(values).then((res: CommentType) => {
        const updateBlog = comments.map((rec: CommentType) => rec._id === res._id ? res : rec)
        setComments(updateBlog)
        onCloseModalEditComment()
      })
    }
  }

  const renderContent = () => {
    return (
      <SingleCommentForm
        className="mt-0"
        onClickCancel={onCloseModalEditComment}
        onClickSubmit={editCommentHandler}
        defaultValue={comment.content}
        textareaRef={textareaRef}
        rows={8}
        children={comment.content}
      />
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEditComment}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Editing comment"
    />
  );
};

export default ModalEditComment;
