import React, { FC } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";

export interface PostMeta2Props {
  className?: string;
  meta: Pick<PostDataType, "date" | "author" | "categories" | "readingTime">;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { date, postedBy, categories, readingTime } = meta;
  const author = postedBy
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
      data-nc-id="PostMeta2"
    >
      <Link to={`/author/${author._id}`} className="flex items-center space-x-2">
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={author.pic || ''}
          userName={`${author.firstName} ${author.lastName}`}
        />
      </Link>
      <div className="ml-3">
        <div className="flex items-center">
          {
            author._id ?
            <Link to={`/author/${author._id}`} className="block font-semibold">
              {`${author.firstName} ${author.lastName}`}
            </Link>
            :
              <span className="block font-semibold">
                <SkeletonTheme baseColor="#4e4e4e" highlightColor="#706e6e">
                  <Skeleton width={ 67 }  />
                </SkeletonTheme>
              </span>
          }

          {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ml-0">
                <span className="text-xs">🏷 </span>
                {categories.map((cat, index) => (
                  <Link key={cat.id} to={cat.href} className="font-semibold">
                    {cat.name}
                    {index < categories.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="text-xs mt-[6px] flex items-center">
          {
            date ?
              <span className="text-neutral-700 dark:text-neutral-300">{formattedDate}</span>
              :
              <span className="text-neutral-700 dark:text-neutral-300">
                <SkeletonTheme baseColor="#4e4e4e" highlightColor="#706e6e">
                  <Skeleton width={ 67 }  />
                </SkeletonTheme>
              </span>
          }
          <span className="mx-2 font-semibold">·</span>
          {
            readingTime ?
            <span className="text-neutral-700 dark:text-neutral-300">
              {readingTime} min read
            </span>
            :
            <span className="text-neutral-700 dark:text-neutral-300">
              <SkeletonTheme baseColor="#4e4e4e" highlightColor="#706e6e">
                <Skeleton width={ 47 }  />
              </SkeletonTheme>
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
