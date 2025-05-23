import React, { FC } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import dateFormat from "hooks/useDateFormat";

export interface Card9Props {
  className?: string;
  ratio?: string;
  post: PostDataType;
  hoverClass?: string;
  loading?: boolean;
}

const Card9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  post,
  hoverClass = "",
  loading = false,
}) => {
  const { title, href, featuredImage, categories, author, date, postType, postedBy, slug, media } =
    post;
  const newDate = new Date(date);
  const pHref = (post.postType === 'audio' && slug) ? `/blog-audio/${slug}` :
              (post.postType === 'video' && slug) ? `/blog-video/${slug}` : 
              post.isSideBar ? `/blog-view/${slug}` : slug && `/blog/${slug}`

  const fImage = (media && media?.find((data: any)=> data.fileFolder === 'feature'))?.url || featuredImage

  const fullName = postedBy && `${postedBy.firstName} ${postedBy.lastName}`
  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block ">
          {
            title ?
              <h2 className="block text-lg font-semibold text-white ">
                <span className="line-clamp-2" title={title}>
                  {title}
                </span>
              </h2>
            :
              <h2 className="block text-lg font-semibold text-white ">
                <span className="line-clamp-2">
                   <SkeletonTheme baseColor="#d1d1d1" highlightColor="#e1dddd">
                    <Skeleton height={12} width={200}  />
                  </SkeletonTheme>
                </span>
              </h2>
          }
          <Link to={postedBy ? `/author/${postedBy?._id}` : ''} className="flex mt-2.5 relative">
            {
              fullName ? 
                <span className="block text-neutral-200 hover:text-white font-medium truncate">
                  {fullName}
                </span>
              :
                <span className="block text-neutral-200 hover:text-white font-medium truncate">
                  <SkeletonTheme baseColor="#d1d1d1" highlightColor="#e1dddd">
                    <Skeleton height={12} width={55}  />
                  </SkeletonTheme>
                </span>
            }
            <span className="mx-[6px] font-medium">·</span>
            {
              date ?
                <span className="font-normal truncate">{dateFormat(newDate)}</span>
              :
                 <span >
                  <SkeletonTheme baseColor="#d1d1d1" highlightColor="#e1dddd">
                    <Skeleton height={12} width={55}  />
                  </SkeletonTheme>
                </span>
            }
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden ${hoverClass} ${className}`}
      data-nc-id="Card9"
    >
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
        <PostCardLikeAndComment loading={loading} className="relative" postData={post} />
        <PostCardSaveAction loading={loading} className="relative" postData={post} />
      </div>
      <div className={`flex items-start relative w-full ${ratio}`}></div>
      {postType === "audio" ? (
        <div className="absolute inset-0">
          <PostFeaturedMedia post={post} />
        </div>
      ) : (
        <Link to={pHref || ''}>
          <NcImage
            containerClassName="absolute inset-0 rounded-3xl"
            className="object-cover w-full h-full rounded-3xl"
            src={fImage}
          />
          <PostTypeFeaturedIcon
            className="absolute top-3 left-3 group-hover:hidden"
            postType={postType}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
          <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>
      )}
      <Link
        to={pHref || ''}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link to={pHref || ''} className="absolute inset-0"></Link>
        <div className="mb-3">
          <CategoryBadgeList href={''} categories={categories} postType={postType} />
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card9;
