import React, { FC, Fragment } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import PostActionDropdown from "components/PostActionDropdown/PostActionDropdown";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import { SOCIALS_DATA } from "components/SocialsShare/SocialsShare";
import BookmarkContainer from "containers/BookmarkContainer/BookmarkContainer";
import { PostDataType } from "data/types";
import NcDropDown from "components/NcDropDown/NcDropDown";
import {
  EmailShareButton,FacebookShareButton,LinkedinShareButton, TwitterShareButton,WhatsappShareButton,
} from "react-share";
import { Menu, Transition } from "@headlessui/react";
import twFocusClass from "utils/twFocusClass";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

export interface SingleMetaAction2Props {
  className?: string;
  meta: PostDataType;
}

const SingleMetaAction2: FC<SingleMetaAction2Props> = ({
  className = "",
  meta,
}) => {
  const { id, bookmark, _id } = meta;
  const socialClickHandler = (item) => {
    if(item.id === 'Facebook'){
       return (
        <FacebookShareButton url={completeUrl} quote={'shareTitle'}>
          Share on Facebook
        </FacebookShareButton>
      );
    }
    else if(item.id === 'Mail'){
      return (
        <EmailShareButton url={completeUrl} title={'shareText'}>
          Share on Twitter
        </EmailShareButton>
      );
    }
    else if(item.id === 'Linkedin'){
      return (
        <LinkedinShareButton url={completeUrl}>Share on LinkedIn</LinkedinShareButton>
      );
    }
    else if(item.id === 'Twitter'){
      return (
        <TwitterShareButton url={completeUrl} title={'shareText'}>
          Share on Twitter
        </TwitterShareButton>
      );
    }
    else if(item.id === 'Whatsapp'){
      return (
        <WhatsappShareButton url={completeUrl}>Share on WhatsApp</WhatsappShareButton>
      );
    }
  }
  
  return (
    <div className={`nc-SingleMetaAction2 `}>
      <div className="flex flex-row space-x-2.5 items-center">
        <PostCardLikeAndComment
          itemClass="px-4 h-9 text-sm"
          hiddenCommentOnMobile
          postData={meta}
          className="!space-x-2.5"
        />
        <div className="px-1">
          <div className="border-l border-neutral-200 dark:border-neutral-700 h-6" />
        </div>

        <BookmarkContainer
          initBookmarked={bookmark.isBookmarked}
          postId={String(_id || id)}
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
          iconClass="h-5 w-5"
          bookmark={bookmark}
        />
        <NcDropDown
          className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
          renderTrigger={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          )}
          onClick={(item) => socialClickHandler(item)}
          data={SOCIALS_DATA}
          isRenderShareItem ={true}
        />
        <PostActionDropdown
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          iconClass="h-5 w-5"
          postData={meta}
        />
      </div>
    </div>
  );
};

export default SingleMetaAction2;
