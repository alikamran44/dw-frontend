import React, { FC, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";

export interface Card10V3Props {
  className?: string;
  post: PostDataType;
  galleryType?: 1 | 2;
}

const Card10V3: FC<Card10V3Props> = ({
  className = "h-full",
  post,
  galleryType = 1,
}) => {
  const {
    title,
    href,
    categories,
    postType,
    galleryImgs,
    author,
    date,
    media,
    postedBy,
    readingTime,
  } = post;
  const [isHover, setIsHover] = useState(false);
  const gImages = (media && media?.filter((data=> data.fileFolder === 'gallery'))) || galleryImgs
  
  const renderGallery2 = () => {
    if (!gImages) return null;
    return (
      <div className="w-full h-full grid grid-rows-2 gap-2">
        <div className="grid grid-cols-3 gap-2 ">
          <NcImage
            containerClassName="relative col-span-2"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[0]?.url || gImages[0]}
          />
          <NcImage
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[1]?.url || gImages[1]}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          <NcImage
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[2]?.url || gImages[2]}
          />
          <NcImage
            containerClassName="relative col-span-2"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[3]?.url || gImages[3]}
          />
        </div>
      </div>
    );
  };

  const renderGallery = () => {
    if (!gImages) return null;
    return (
      <div className="w-full h-full grid grid-cols-3 gap-2">
        <div className="grid ">
          <NcImage
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[0]?.url || gImages[0]}
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <NcImage
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[1]?.url || gImages[1]}
          />
          <NcImage
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[2]?.url || gImages[2]}
          />
        </div>
        <div className="grid ">
          <NcImage
            containerClassName="relative"
            className="absolute inset-0 object-cover w-full h-full"
            src={gImages[3]?.url || gImages[3]}
          />
        </div>
      </div>
    );
  };
    const pHref = post.slug ? `/blog-gallery/${post.slug}` : ''
  return (
    <div
      className={`nc-Card10V3 group relative flex flex-col ${className}`}
      data-nc-id="Card10V3"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-16 sm:aspect-h-9 overflow-hidden">
        <div>
          {postType !== "gallery" && !!gImages?.length ? (
            <PostFeaturedMedia post={post} isHover={isHover} />
          ) : galleryType === 1 ? (
            renderGallery()
          ) : (
            renderGallery2()
          )}
        </div>

        <Link
          to={pHref}
          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
        ></Link>
      </div>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4">
        <CategoryBadgeList categories={categories} postType={postType} />
        <PostCardSaveAction postData={post} />
      </div>

      <div className="space-y-2.5 mt-4 px-4">
        <h2 className="nc-card-title block sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link to={pHref} className="line-clamp-1" title={title}>
            {title}
          </Link>
        </h2>
        <CardAuthor2
          className="mt-3"
          author={postedBy || author}
          hoverReadingTime={false}
          date={date}
          readingTime={readingTime}
        />
      </div>
    </div>
  );
};

export default Card10V3;
