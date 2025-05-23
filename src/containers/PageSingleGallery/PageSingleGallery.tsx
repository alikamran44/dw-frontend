import React, { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import { SINGLE_GALLERY } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import Header from "containers/PageSingle//Header";
import SingleContent from "containers/PageSingle/SingleContent";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import SingleHeader from "containers/PageSingle/SingleHeader";
import ModalPhotos from "./ModalPhotos";
import { fetchPost } from '../../Actions/PostAction';

export interface PageSingleGalleryProps {
  className?: string;
}
interface RouteParams {
  slug: string;
}
const PageSingleGallery: FC<PageSingleGalleryProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const {slug} = useParams<RouteParams>();
  const [blogLoading, setBlogLoading] = useState(false)
  const [fetched, setFetched] = useState(true)
  const [blog, setBlog] = useState<PostDataType | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  useEffect(() => {
    // dispatch(
    //   changeCurrentPage({ type: "/single/:slug", data: SINGLE_GALLERY })
    // );
    // return () => {
    //   dispatch(changeCurrentPage({ type: "/", data: {} }));
    // };

    setBlogLoading(true)
    fetchPost(slug).then((res: any) => {
      setBlogLoading(false)
      if(res && Object.keys(res).length > 0){
        setBlog(res)
      }else{
        setFetched(false)
      }
    }).catch(() => setBlogLoading(false) )
  }, [slug]);

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };
  const handleCloseModal = () => setIsOpen(false);

  const PHOTOS = SINGLE_GALLERY.galleryImgs || [];
  const fUrl = (blog ? blog.media?.find(((data: any)=> data.fileFolder === 'feature'))?.url : '')
  
  const gallerymages = (blog && blog.media ? blog.media.filter(((data: any)=> data.fileFolder === 'gallery')) : [])
  return (
    <>
      <div
        className={`nc-PageSingleGallery pt-8 lg:pt-16 ${className}`}
        data-nc-id="PageSingleGallery"
      >
        {/* SINGLE HEADER */}
        <header className="container rounded-xl">{
          blog &&
          <SingleHeader
            metaActionStyle="style2"
            hiddenDesc
            pageData={blog}
          />
        }
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2 my-10">
            <div
              className="col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-xl"
                src={gallerymages ? gallerymages[0]?.url : ''}
              /> 
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {gallerymages && gallerymages.filter((_: any, i: any) => i >= 1 && i < 5).map((item: any, index: any) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden ${
                  index >= 2 ? "hidden sm:block" : ""
                }`}
              >
                <NcImage
                  containerClassName="aspect-w-6 aspect-h-5"
                  className="object-cover w-full h-full rounded-xl "
                  src={item.url || ""}
                />

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handleOpenModal(index + 1)}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center right-3 bottom-3 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>

        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={gallerymages || PHOTOS}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
        />

        {/* FEATURED IMAGE */}
        <div className=""></div>
        {/* SINGLE MAIN CONTENT */}
        <div className="container">{blog &&
          <SingleContent data={blog} />
        }
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts 
          blog={blog || SINGLE_GALLERY}
        />
      </div>
    </>
  );
};

export default PageSingleGallery;
