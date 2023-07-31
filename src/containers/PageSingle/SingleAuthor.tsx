import Avatar from "components/Avatar/Avatar";
import { PostAuthorType } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export interface SingleAuthorProps {
  author: PostAuthorType;
  loading?: boolean;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author, loading=false }) => {
  return (
    <div className="nc-SingleAuthor flex">
      <Link to={`/author/${author._id}`}>
        <Avatar 
          imgUrl={author.pic || ''}
          userName={`${author.firstName} ${author.lastName}`}
          sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24 "
          radius="rounded-xl"
        />
      </Link>
      <div className="flex flex-col ml-3 max-w-lg sm:ml-5">
        {
          author._id ?
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              WRITEN BY
            </span>
          : loading &&
            <span className="block font-semibold">
              <Skeleton width={ 67 }  />
            </span>
        }
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {
            author._id ?
              <Link to={`/author/${author._id}`}>{`${author.firstName} ${author.lastName}`}</Link>
            :
            <span className="block font-semibold">
              <Skeleton width={ 110 }  />
            </span>
          }
        </h2>
        {author.about ?
          <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
            {author.about}
            <Link className="text-primary-6000 font-medium ml-1" to={`/author/${author._id}`}>
              Readmore
            </Link>
          </span>
        : loading &&
          <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
            <Skeleton width={ 300 }  />
          </span>
        }
      </div>
    </div>
  );
};

export default SingleAuthor;
