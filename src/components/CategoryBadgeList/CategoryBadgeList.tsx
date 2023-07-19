import { PostDataType } from "data/types";
import React, { FC } from "react";
import Badge from "components/Badge/Badge";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  href?: string;
  categories: PostDataType["categories"];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
  href,
  postType
}) => { 
  return (
    <div 
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {categories.length > 0 && categories.map((item, index) => (
        <Badge
          className={itemClass}
          key={index}
          name={item.name}
          href={postType ? `${ postType === 'audio' ? `/blogs-audio/${item.slug}/category` :
                postType === 'video' ? `/blogs-video/${item.slug}/category` : postType === 'gallery'
                ? `/blogs-gallery/${item.slug}/category` : `/blogs/${item.slug}/category`}`
              : ''
          }
          color={item.color as any}
        />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
