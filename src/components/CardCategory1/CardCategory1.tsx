import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export interface CardCategory1Props {
  className?: string;
  taxonomy: TaxonomyType;
  size?: "large" | "normal";
  loading: boolean;
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  taxonomy,
  loading=false
}) => {
  const { count, name, thumbnail, media, slug } = taxonomy;
  const imgUrl = media ? media.url : ''
  return (
    <NavLink
      to={slug ? `/blogs/${slug}/category` : '/#'}
      className={`nc-CardCategory1 flex items-center ${className}`}
      data-nc-id="CardCategory1"
    >
      <NcImage
        containerClassName={`flex-shrink-0 ${ 
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={imgUrl}
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
        >
          {
          (!loading && name) ?
              <span>{name}</span>
          :
            <SkeletonTheme baseColor="#d1d1d1" highlightColor="#bdbcbc">
              <Skeleton height={12} width={30} />
            </SkeletonTheme>
          }
        </h2>
        
          <span
            className={`${
              size === "large" ? "text-sm" : "text-xs"
            } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
          >
            {
            (!loading && count) ?
              <span>{count} Articles</span>
            :
              <SkeletonTheme baseColor="#d1d1d1" highlightColor="#e1dddd">
                <Skeleton height={10} width={50} />
              </SkeletonTheme>
            }
          </span>
      </div>
    </NavLink>
  );
};

export default CardCategory1;
