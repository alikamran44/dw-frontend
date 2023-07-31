import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export interface Card3SmallProps {
  className?: string;
  post: PostDataType;
}

const Card3Small: FC<Card3SmallProps> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage } = post;

  const pHref = post.slug ? `/blog/${post.slug}` : ''
  const fUrl = (post.media && post.media?.find(((data: any)=> data.fileFolder === 'feature'))?.url) || ''
  return (
    <div
      className={`nc-Card3Small relative flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center ${className}`}
      data-nc-id="Card3Small"
    >
      <Link to={pHref} className=" absolute inset-0" title={title}></Link>
      <div className="relative space-y-2">
        <PostCardMeta meta={{ ...post }} />
          <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {
              title ?
                  <Link to={pHref} className=" line-clamp-2" title={title}>
                    {title}
                  </Link>
              :

                <SkeletonTheme baseColor="#d1d1d1" highlightColor="#bdbcbc">
                  <Skeleton height={10}  width={80}  />
                </SkeletonTheme>
            }
          </h2>
      </div>

      <Link
        to={pHref}
        title={title}
        className={`block sm:w-20 flex-shrink-0 relative rounded-lg overflow-hidden mb-5 sm:ml-4 sm:mb-0 group`}
      >
        <div className={`w-full h-0 aspect-w-16 aspect-h-9 sm:aspect-h-16`}>
          <NcImage
            containerClassName="absolute inset-0"
            className="nc-will-change-transform object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src={fUrl}
            title={title}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card3Small;
