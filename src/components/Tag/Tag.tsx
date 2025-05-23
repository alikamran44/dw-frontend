import { TaxonomyType } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export interface TagProps {
  className?: string;
  tag: TaxonomyType;
  hideCount?: boolean;
  loading?: boolean;
  modalHandler?: () => void;
  postType?: any;
}

const Tag: FC<TagProps> = ({ className = "", tag, hideCount = false, 
  loading = false, modalHandler, postType 
}) => { 
  const closeHandler = () => {
    if(modalHandler){
      modalHandler()
    }
  }
 const hLink = postType ? (`${ postType === 'audio' ? `/blogs-audio/${tag.slug}/tag` :
                postType === 'video' ? `/blogs-video/${tag.slug}/tag` : postType === 'gallery'
                ? `/blogs-gallery/${tag.slug}/tag` : `/blogs/${tag.slug}/tag`}`)
            : tag.slug ? `/blogs/${tag.slug}/tag` : '/#'
  return (
    <> 
      {
       (!loading && (tag.name !== '' && tag.name !== null)) ? 
        <Link onClick={closeHandler}
          className={`nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-neutral-300 py-2 
            px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 
            dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 ${className}`}
          data-nc-id="Tag"
          to={hLink}
        >
          {`${tag.name}`}
          {!hideCount && (
            <span className="text-xs font-normal"> ({tag.count})</span>
          )}
        </Link>
      : 
        <SkeletonTheme baseColor="#d1d1d1" highlightColor="#e1dddd">
          <Skeleton height={41} width={80} className={`rounded-lg md:py-2.5 md:px-4  ${className}`}  />
        </SkeletonTheme>
      }
    </>
  );
};

export default Tag;
