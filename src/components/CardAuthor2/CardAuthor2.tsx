import React, { FC } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { PostDataType } from "data/types";
import Avatar from "components/Avatar/Avatar";
import dateFormat from "hooks/useDateFormat";

export interface CardAuthor2Props
  extends Pick<PostDataType, "date" | "author"> {
  className?: string;
  readingTime?: PostDataType["readingTime"];
  hoverReadingTime?: boolean;
}
 
const CardAuthor2: FC<CardAuthor2Props> = ({
  className = "",
  author,
  readingTime,
  date,
  hoverReadingTime = true,
}) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) || date;

  if(!author) return <></>
  const { displayName, href = "/", avatar, pic=null } = author;
  const fullName = author.firstName ? `${author?.firstName} ${author?.lastName}` : displayName
  return ( 
    <Link
      to={href || '/*'}
      className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
      data-nc-id="CardAuthor2"
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-3"
        radius="rounded-full"
        imgUrl={pic || ''}
        userName={fullName}
      />
      <div>
        {
          author?.firstName ? 
            <h2
              className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
            >
              {fullName || displayName}
            </h2>
          :
            <h2
              className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
            >
              <Skeleton width={50} />
            </h2>
        }
        <span
          className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
        >
          {
            date ?
              <span>{dateFormat(date)}</span>
            :
              <Skeleton 
                width={ 54 }
              />
          }
          {readingTime && (
            <>
              <span
                className={`hidden lg:inline mx-1 transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                ·
              </span>
              <span
                className={`hidden lg:inline transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                {readingTime} min read
              </span>
            </>
          )}
        </span>
      </div>
    </Link>
  );
};

export default CardAuthor2;
