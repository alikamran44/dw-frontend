import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import GallerySlider from "components/PostFeaturedMedia/GallerySlider";

export interface CardCategory3Props {
  className?: string;
  url?: string;
  name: string;
  selected: string | null | undefined;
  onClickButton?: () => void
}

const CardGalleryImage: FC<CardCategory3Props> = ({
  className = "",
  url,
  name, 
  selected,
  onClickButton
}) => { 
  return (
     <div
      className={`nc-Card10V2 relative flex flex-col ${className}`}
      style={{ borderRadius: '22px' }}
      data-nc-id="Card10V2"
    > 
      <div
       className={`block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-12 sm:aspect-h-9 overflow-hidden`}
        
      >
        <div>
          {
            (Array.isArray(url) && url.length > 0) ? 
              <GallerySlider
                galleryImgs={url}
                uniqueClass={`PostFeaturedGallery_1`}
              />
            :
            <NcImage
              src={url} 
              className="object-cover w-full h-full rounded-2xl"
            />
          }
          <span className="absolute top-3 inset-x-3 z-10">
            <div 
              className={`nc-CategoryBadgeList ${className}`}
              data-nc-id="CategoryBadgeList"
            >
              {
                name &&
                  <Button type='button' onClick={onClickButton}
                    className={`text-base font-medium px-2 py-2 sm:px-2 sm:py-1 bg-white text-neutral-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full border-2 border-white border-opacity-60`}
                  >
                    <span className="line-clamp-1"> {name}</span>
                  </Button>
              }
            </div>
          </span>
          <span className="absolute inset-0 bg-black bg-opacity-20  transition-opacity"></span>
        </div>
      </div>
    </div>
  );
};

export default CardGalleryImage;
