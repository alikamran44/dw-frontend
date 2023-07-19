import React, { FC } from "react";
import { PostAuthorType } from "data/types";
import { NavLink } from "react-router-dom";
import Avatar from "components/Avatar/Avatar";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export interface CardAuthorProps {
  className?: string;
  author: PostAuthorType;
}

const CardAuthor: FC<CardAuthorProps> = ({ className = "", author }) => {
  const { displayName, href = "/", avatar, jobName, pic, _id } = author;
  const fullName = author && (author.firstName || author.lastName) ? 
      `${author.firstName} ${author.lastName}` : ''
  return (
    <NavLink
      to={_id ? `/author/${_id}` : ''}
      className={`nc-CardAuthor flex items-center ${className}`}
      data-nc-id="CardAuthor"
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-4"
        radius="rounded-full"
        imgUrl={pic || ''}
        userName={fullName || ''}
      />
      <div>
        {
          fullName  ? 
            <h2
              className={`text-base text-neutral-900 dark:text-neutral-100 font-semibold`}
            >
              {fullName || ''}
            </h2>
          :
          <SkeletonTheme baseColor="#d1d1d1" highlightColor="#bdbcbc">
            <Skeleton height={10}  width={80}  />
          </SkeletonTheme>
        }
        {
          (jobName || fullName) ?
            <span
              className={`block mt-[2px] text-xs text-neutral-500 dark:text-neutral-400`}
            >
              {jobName}
            </span>
          :
            <SkeletonTheme baseColor="#d1d1d1" highlightColor="#bdbcbc">
              <Skeleton height={10}  width={57}  />
            </SkeletonTheme>
        }
      </div>
    </NavLink>
  );
};

export default CardAuthor;
