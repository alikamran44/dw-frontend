import React, { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostDataType, TaxonomyType } from "data/types";
import { SINGLE, FAKE_SINGLE_POST } from "data/single";
import SingleContent from "./SingleContent";
import { CommentType } from "components/CommentCard/CommentCard";
import SingleRelatedPosts from "./SingleRelatedPosts";
import { useAppDispatch } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import SingleHeader from "./SingleHeader";
import { fetchPost } from '../../Actions/PostAction';

export interface PageSingleTemplate3Props {
  className?: string;
}

interface RouteParams {
  slug: string;
}
const PageSingleTemplate3: FC<PageSingleTemplate3Props> = ({
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const {slug} = useParams<RouteParams>();
  const [blogLoading, setBlogLoading] = useState(true)
  const [fetched, setFetched] = useState(true)
  const [blog, setBlog] = useState<PostDataType | null>(null);
  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  useEffect(() => {
    // dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE }));
    // return () => {
    //   dispatch(changeCurrentPage({ type: "/", data: {} }));
    // };
    setBlogLoading(true)
    fetchPost(slug).then((res) => {
      setBlogLoading(false)
      if(res && Object.keys(res).length > 0){
        setBlog(res)
      }else{
        setFetched(false)
      }
    }).catch(() => setBlogLoading(false) )
  }, []);

  return (
    <>
      <div
        className={`nc-PageSingleTemplate3 ${className}`}
        data-nc-id="PageSingleTemplate3"
      >
        <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
          {/* SINGLE HEADER */}
          <div className="dark container relative z-10">
            <div className="max-w-screen-md">
              <SingleHeader
                hiddenDesc
                metaActionStyle="style2"
                pageData={blog || FAKE_SINGLE_POST}
                loading={blogLoading}
              />
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
            <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r"></div>
            <img
              className="block w-full h-full object-cover"
              src={blog ? blog.media?.find(((data: any)=> data.fileFolder === 'cover'))?.url : ''}
              alt=""
            />
          </div>
        </header>

        {/* SINGLE MAIN CONTENT */}
        <div className="container mt-10">{blog &&
          <SingleContent data={blog} />
        }
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts blog={blog || SINGLE} />
      </div>
    </>
  );
};

export default PageSingleTemplate3;
