import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import dateFormat from "hooks/useDateFormat";

export interface PostCardMetaProps {
  className?: string;
  meta: Pick<PostDataType, "date" | "author">;
  hiddenAvatar?: boolean;
  size?: "large" | "normal";
  loading?: boolean;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  loading = false,
  size = "normal",
}) => {
  const { date, postedBy } = meta;
  let author = postedBy
  const pic = postedBy ? postedBy.pic : ''
  const fullName = postedBy && `${postedBy.firstName} ${postedBy.lastName}`
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-base"
      } ${className}`}
      data-nc-id="PostCardMeta"
    >
      {
        <Link to={author?._id ? `/author/${author._id}` : ''} className="relative flex items-center space-x-2">
          { 
            !hiddenAvatar && (
              <Avatar
                radius="rounded-full"
                sizeClass={
                  size === "normal" ? "h-7 w-7 text-sm" : "h-10 w-10 text-xl"
                }
                imgUrl={pic}
                userName={fullName || author?.displayName}
              />
          )}

         { (author && author?.firstName)?
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
               {author?.firstName}
            </span>
          :
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
             <Skeleton
               width={50}
             />
            </span>
          }
        </Link>
      }
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        {
          !loading && date ?
          <span className="text-neutral-500 dark:text-neutral-400 font-normal">
            {dateFormat(date)}
          </span>
          :
          <Skeleton 
            width={ 54 }
          />
        }
      </>
    </div>
  );
};

export default PostCardMeta;
