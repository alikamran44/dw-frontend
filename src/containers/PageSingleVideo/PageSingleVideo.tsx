import React, { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostDataType, TaxonomyType } from "data/types";
import { SINGLE_VIDEO } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import SingleContent from "containers/PageSingle/SingleContent";
import Header from "containers/PageSingle//Header";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import ReactPlayer from "react-player";
import NcPlayIcon from "components/NcPlayIcon/NcPlayIcon";
import SingleMetaAction2 from "containers/PageSingle/SingleMetaAction2";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "containers/PageSingle/SingleTitle";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import NcImage from "components/NcImage/NcImage";
import isSafariBrowser from "utils/isSafariBrowser";
import { fetchPost } from '../../Actions/PostAction';

export interface PageSingleVideoProps {
  className?: string;
}
interface RouteParams {
  slug: string;
}
const PageSingleVideo: FC<PageSingleVideoProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const {slug} = useParams<RouteParams>();
  const [blogLoading, setBlogLoading] = useState(false)
  const [fetched, setFetched] = useState(true)
  const [blog, setBlog] = useState<PostDataType | null>(null);

  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    setBlogLoading(true)
    fetchPost(slug).then((res: any) => {
      setBlogLoading(false)
      if(res && Object.keys(res).length > 0){
        setBlog(res)
      }else{
        setFetched(false)
      }
    }).catch(() => setBlogLoading(false) )
  }, []);

  const renderMainVideo = () => {
    const fUrl = (blog ? blog.media?.find(((data: any)=> data.fileFolder === 'feature'))?.url : '')
    const vUrl = (blog ? blog.media?.find(((data: any)=> data.fileFolder === 'video'))?.url : '')
    return (
      <div className="bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-700 shadow-2xl">
        {isSafariBrowser() && fUrl && !isPlay && (
          <div
            className="absolute inset-0 z-10 cursor-pointer rounded-[18px] overflow-hidden"
            onClick={() => setIsPlay(true)}
          >{blog &&
            <NcImage
              src={fUrl}
              containerClassName="absolute inset-0"
            />}
            <div className="absolute inset-0 flex items-center justify-center">
              <NcPlayIcon />
            </div>
          </div>
        )}
        <ReactPlayer
          url={vUrl}
          className="absolute inset-0"
          style={{ borderRadius: 18, overflow: "hidden" }}
          playing={isSafariBrowser() ? isPlay : true}
          width="100%"
          height="100%"
          controls
          light={isSafariBrowser() ? false : fUrl}
          playIcon={<NcPlayIcon />}
        />
      </div>
    );
  };
  const renderHeader = () => {
    const { categories, title } = blog || SINGLE_VIDEO;
    return (
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5 dark text-neutral-100">
          <Header 
            pageData={blog}
          />
          <CategoryBadgeList postType={blog?.postType}  itemClass="!px-3" categories={categories} />
          <SingleTitle
            mainClass="text-neutral-900 font-semibold text-3xl md:!leading-[120%] dark:text-neutral-100"
            title={title}
          />

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col space-y-5">
            {
              blog &&
              <PostMeta2
                size="large"
                className="leading-none flex-shrink-0"
                meta={blog}
                hiddenCategories
                avatarRounded="rounded-full shadow-inner"
              />
            }
            {
              <SingleMetaAction2 meta={blog || SINGLE_VIDEO} />
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-PageSingleVideo  ${className}`}
        data-nc-id="PageSingleVideo"
      >
        {/* SINGLE HEADER */}
        <header className="container relative py-14 lg:py-20 flex flex-col lg:flex-row lg:items-center">
          <div className="nc-PageSingleVideo__headerWrap absolute inset-y-0 transform translate-x-1/2 right-1/2 w-screen lg:translate-x-0 lg:w-[calc(100vw/2)] bg-neutral-900 dark:bg-black dark:bg-opacity-50 lg:rounded-r-[40px]"></div>
          <div className="pb-10 lg:pb-0 lg:pr-10 relative">
            {renderHeader()}
          </div>
          <div className="relative lg:w-8/12 flex-shrink-0">
            <div className="aspect-w-16 aspect-h-16 sm:aspect-h-9 ">
              {renderMainVideo()}
            </div>
          </div>
        </header>

        {/* SINGLE MAIN CONTENT */}
        <div className="container mt-12">{ blog &&
          <SingleContent data={blog} />
        }
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts blog={blog || SINGLE_VIDEO} />
      </div>
    </>
  );
};

export default PageSingleVideo;
