import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import dateFormat from "hooks/useDateFormat";
import { Link } from "react-router-dom";

export interface PostCardMetaV2Props {
  className?: string;
  meta: Pick<PostDataType, "date" | "author" | "title">;
  hiddenAvatar?: boolean;
  size?: "large" | "normal";
}

const PostCardMetaV2: FC<PostCardMetaV2Props> = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  size = "normal",
}) => {
  const { date, author, title, postedBy, slug, postType } = meta;
  const fullName = postedBy && `${postedBy.firstName} ${postedBy.lastName}`
  const pic = postedBy && postedBy.pic
  const pHref = postType === 'audio' ? `/blog-audio/${slug}` :
              postType === 'video' ? `/blog-video/${slug}` : meta.isSideBar ? `/blog-view/${slug}` : `/blog/${slug}`
  return (
    <div
      className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
      data-nc-id="PostCardMetaV2"
    >
      <Link to={pHref || ''} className="relative flex items-center space-x-2">
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={
              size === "normal" ? "h-9 w-9 text-base" : "h-10 w-10 text-xl"
            }
            imgUrl={pic || author?.avatar}
            userName={fullName || author?.displayName}
          />
        )}
        <div>
          <h2
            className={`block font-semibold ${
              size === "normal" ? "text-base" : "text-lg"
            }`}
          >
            <span className="line-clamp-1">{title}</span>
          </h2>

          <div className="flex mt-1.5">
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
              {fullName || author?.displayName}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
              ·
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
              {dateFormat(date)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCardMetaV2;
