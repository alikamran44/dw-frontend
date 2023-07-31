import React, { FC, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import { TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";
import MediaVideo from "components/PostFeaturedMedia/MediaVideo";
import MediaAudio from "components/PostFeaturedMedia/MediaAudio";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";

export interface CardProps {
  className?: string;
  taxonomy: any;
  selectedImg: any;
  onSelectImage: (id: any, url: any) => void; // Adjust the function signature to accept two arguments
  loading: boolean;
  select: any;
}

const Card: FC<CardProps> = ({
  className = "",
  taxonomy,
  select,
  onSelectImage,
  loading
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const hasData = (taxonomy ? (taxonomy._id !== null && taxonomy._id !== undefined && taxonomy._id !== '' && !loading) : false)
  return (
      <div className={`${hasData && ((taxonomy._id === select ) || (Array.isArray(select) && select.includes(taxonomy._id))) ? 'bg-teal-600 text-white' :
          'hover:bg-neutral-100 dark:hover:bg-neutral-800'
        } 
        relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 
        dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none`} 
        id="headlessui-radiogroup-option-:r1t:"
        role="radio" aria-checked="false" tabIndex={-1}  data-headlessui-state="" 
        aria-labelledby="headlessui-label-:r1v:" aria-describedby="headlessui-description-:r1u:"
        onClick={ ()=> {
          if(hasData && !loading){
              onSelectImage(taxonomy._id, 
                (taxonomy.fileFolder === 'video' || taxonomy.fileFolder === 'audio') ? 
                  taxonomy.thumbnail : taxonomy.url
                )
            }
            else {
              return false
            }
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="text-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-full w-20" id="headlessui-description-:r1u:">
                  <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
                  {
                    taxonomy.fileFolder &&
                      <div>
                        <PostFeaturedMedia isGallery={true} loading={loading} post={taxonomy} isHover={isHover} />
                      </div>
                  }
                  </div>
                </div>
                {
                  hasData  && (( taxonomy._id === select) || (Array.isArray(select) && select.includes(taxonomy._id))) &&
                  <div className="flex-shrink-0 text-white">
                    <svg viewBox="0 0 24 24" fill="none" 
                      className="w-6 h-6">
                      <circle cx="12" cy="12" r="12" fill="#fff" opacity="0.2">
                      </circle>
                        <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="1.5" 
                          strokeLinecap="round" strokeLinejoin="round">
                        </path>
                    </svg>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
