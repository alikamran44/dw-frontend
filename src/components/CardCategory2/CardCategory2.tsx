import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";

export interface CardCategory2Props {
  className?: string;
  taxonomy: TaxonomyType;
  index?: string;
  loading: boolean,
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = "",
  taxonomy,
  index,
  loading = false,
}) => {
  const { count, name, slug = "", media, tagsCount,  } = taxonomy;
  const colors = ['red', 'yellow', 'indigo', 'pink', 'blue', 'gray', 'purple', 'green']
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link
      to={slug ? `/blogs/category/${slug}` : '#'}
      className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center
       px-3 py-5 sm:p-6  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
      data-nc-id="CardCategory2"
    >
      {(tagsCount && parseInt(tagsCount) > 0) ?
        <Badge
          color={randomColor as TwMainColor}
          name={`#${tagsCount}`}
          className="absolute -top-2 sm:top-3 left-3"
        />
        :
        ''
      }
      <NcImage
        containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
        src={media ? media.url : ''}
      />
      <div className="mt-3 ">
        <h2 className={`text-base sm:text-lg font-semibold `}>
          {
            (!loading && name) ? 
            <span className="line-clamp-1">{name && name.charAt(0).toUpperCase() + name.slice(1)}</span>
            :
            <Skeleton
              width={40}
            />
          }
        </h2>
        {
          (!loading && count) ?
          <span
            className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}
          >
            {count} Articles
          </span>
          :
          <Skeleton
            width={50}
          />
        }
      </div>
    </Link>
  );
};

export default CardCategory2;
