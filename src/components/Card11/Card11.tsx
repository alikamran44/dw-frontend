import React, { FC, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import dateFormat from "hooks/useDateFormat";

export interface Card11Props {
  className?: string;
  post: PostDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
  loading?: boolean;
}

const Card11: FC<Card11Props> = ({ 
  className = "h-full",
  post,
  hiddenAuthor = false,
  loading = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { title, slug, categories, date } = post;
  const pHref = (post.postType === 'audio' && slug) ? `/blog-audio/${slug}` :
              (post.postType === 'video' && slug) ? `/blog-video/${slug}` : 
              post.isSideBar ? `/blog-view/${slug}` : slug && `/blog/${slug}`
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group ${ (!loading && title) ? '[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]' : 'border' }  ${className}`}
      style={{ borderRadius: (!loading && title) ? '' : '22px' }}

      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    > 
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      > 
        <div>
          <PostFeaturedMedia loading={loading} post={post} isHover={isHover} />
        </div>
      </div>
      {/*/blog-audio*/}
      <Link to={pHref} 
        className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeList categories={categories} postType={post.postType || ''} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {!hiddenAuthor ? (
          <PostCardMeta loading={loading} meta={post} />
        ) : (
           (loading || !date) ? 
          <span className="text-xs text-neutral-500">{dateFormat(date)}</span>
          :
          <Skeleton className="line-clamp-2" width="30%" />
        )}
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          
          { (!loading && title) ?
            <Link to={pHref} 
              className="line-clamp-2" title={title}
            >
              {title}
            </Link>
            :
            <Skeleton className="line-clamp-2" width="30%" />
          }

        </h2>  
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment loading={loading} className="relative" postData={post} />
          <PostCardSaveAction loading={loading} className="relative" postData={post} />
        </div>
      </div>
    </div>
  );
};

export default Card11;
