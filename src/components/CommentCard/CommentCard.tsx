import React, { FC, useRef, useState } from "react";
import Avatar from "components/Avatar/Avatar";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import NcDropDown from "components/NcDropDown/NcDropDown";
import CommentCardLikeReplyContainer from "containers/CommentCardLikeReplyContainer/CommentCardLikeReplyContainer";
import { PostAuthorType } from "data/types";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";
import SingleCommentForm from "containers/PageSingle/SingleCommentForm";
import ModalEditComment from "./ModalEditComment";
import ModalDeleteComment from "./ModalDeleteComment";
import ModalReportItem from "components/ModalReportItem/ModalReportItem";
import { replyComment } from '../../Actions/CommentAction';
import dateFormat from "hooks/useDateFormat";

export interface CommentType {
  id: number;
  author: PostAuthorType;
  date: string;
  content: string;
  children?: CommentType[];
  like: {
    count: number;
    isLiked: boolean;
  };
}

export interface CommentCardProps {
  className?: string;
  comment: CommentType;
  size?: "large" | "normal";
  blog_id: any;
  parentId: string | null;
  blog_user_id: any;
  setComments: () => void;
  comments: CommentType[];
}

const CommentCard: FC<CommentCardProps> = ({
  className = "",
  comment,
  size = "large",
  blog_id,
  blog_user_id,
  setComments,
  parentId,
  comments
}) => {
  const { author, id, date, content, user, _id, updatedAt } = comment;
   const fullName = user && `${user.firstName} ${user.lastName}`
  const actions = [
    { id: "edit", name: "Edit", icon: "las la-edit" },
    { id: "reply", name: "Reply", icon: "las la-reply" },
    { id: "report", name: "Report abuse", icon: "las la-flag" },
    { id: "delete", name: "Delete", icon: "las la-trash-alt" },
  ];

  const textareaRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openReplyForm = () => {
    setIsReplying(true);
    setTimeout(() => {
      textareaRef.current && (textareaRef.current as any).focus();
    }, 100);
  };
  const closeReplyForm = () => {
    setIsReplying(false);
  };

  const openModalEditComment = () => setIsEditting(true);
  const closeModalEditComment = () => setIsEditting(false);

  const openModalReportComment = () => setIsReporting(true);
  const closeModalReportComment = () => setIsReporting(false);

  const openModalDeleteComment = () => setIsDeleting(true);
  const closeModalDeleteComment = () => setIsDeleting(false);

  const hanldeClickDropDown = (item: typeof actions[number]) => {
    if (item.id === "reply") {
      return openReplyForm();
    }
    if (item.id === "edit") {
      return openModalEditComment();
    }
    if (item.id === "report") {
      return openModalReportComment();
    }
    if (item.id === "delete") {
      return openModalDeleteComment();
    }
    return;
  };

  const renderCommentForm = () => {
    const user = JSON.parse(localStorage.getItem('userInfo')) || null;

    const replySubmitHandler = (values) => {
      if(values){
        values.blog_user_id = blog_user_id;
        values.blog_id = blog_id;
        if(parentId){
          values.comment_root = parentId
        }else{
          values.comment_root = _id
        }
        values.reply_user_id = user?._id
        replyComment(values).then((res) => {
          const updateBlog = comments.map((rec) => rec._id === res._id ? res : rec)
          setComments(updateBlog)
          closeReplyForm()
        })
      }
    }
    return (
      <SingleCommentForm
        textareaRef={textareaRef}
        onClickSubmit={replySubmitHandler}
        onClickCancel={closeReplyForm}
        className="flex-grow"
      />
    );
  };

  return (
    <>
      <div
        className={`nc-CommentCard flex ${className}`}
        data-nc-id="CommentCard"
        data-comment-id={id}
        data-comment-parent-id={parentId}
      >
        <Avatar
          imgUrl={user?.pic || author?.avatar}
          userName={fullName || author?.displayName}
          sizeClass={`h-6 w-6 text-base ${
            size === "large" ? "sm:text-lg sm:h-8 sm:w-8" : ""
          }`}
          radius="rounded-full"
          containerClassName="mt-4"
        />
        <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pr-6">
            <div className="absolute -right-3 -top-3">
              {
                (comment && fullName) ?
                <NcDropDown
                  className={`p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 ${twFocusClass()}`}
                  data={actions}
                  onClick={hanldeClickDropDown}
                  isComments={true}
                  comment={comment}
                />
                :
                <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                  <Skeleton height={5}  width={20}  />
                </SkeletonTheme>
              }
            </div>
            {
              (comment && fullName) ?
                <Link
                  className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
                  to={user ? `/author/${user._id}` : '/#'}
                >
                  {fullName || author?.displayName}
                </Link>
              :
                <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                  <Skeleton height={10}  width={57}  />
                </SkeletonTheme>
            }
            <span className="mx-2">·</span>
            {
              (comment && updatedAt) ?
                <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
                  {dateFormat(updatedAt)}
                </span>
              :
                <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                  <Skeleton height={10}  width={57}  />
                </SkeletonTheme>
            }
          </div>

          {/* CONTENT */}
          {
            comment && content ?
              <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
                {content}
              </span>
            :
              <span className='mt-2 mb-3 sm:mt-3 sm:mb-4'>
                  <Skeleton  width="30%" />
              </span>
          }

          {/* ACTION LIKE REPLY */}
          {isReplying ? (
            renderCommentForm()
          ) : (
            <CommentCardLikeReplyContainer
              onClickReply={openReplyForm}
              comment={comment} parentId={parentId}
            />
          )}
        </div>
      </div>

      <ModalEditComment
        show={isEditting}
        comment={comment}
        id={_id}  
        setComments={setComments} comments={comments}
        onCloseModalEditComment={closeModalEditComment}
      />
      <ModalReportItem
        show={isReporting}
        id={comment._id}
        onCloseModalReportItem={closeModalReportComment}
      />
      <ModalDeleteComment
        id={_id} 
        setComments={setComments} comments={comments}
        show={isDeleting}
        commentId={comment._id}
        parentId={parentId}
        onCloseModalDeleteComment={closeModalDeleteComment}
      />
    </>
  );
};

export default CommentCard;
