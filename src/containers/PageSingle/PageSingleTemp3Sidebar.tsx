
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostDataType, TaxonomyType } from "data/types";
import NcCoverImage from "components/NcImage/NcCoverImage";
import { SINGLE, FAKE_SINGLE_POST } from "data/single"; 
import SingleContent from "./SingleContent";
import { CommentType } from "components/CommentCard/CommentCard";
import SingleRelatedPosts from "./SingleRelatedPosts";
import { changeCurrentPage } from "app/pages/pages";
import { Sidebar } from "./Sidebar";
import SingleHeader from "./SingleHeader";
import { fetchPost } from '../../Actions/PostAction';
import EmptyCard from "components/EmptyCard/EmptyCard"; 

export interface PageSingleTemp3SidebarProps { 
  className?: string;
   loading?: boolean;
}

interface RouteParams {
  slug: string;
}
const PageSingleTemp3Sidebar: FC<PageSingleTemp3SidebarProps> = ({
  className = "", 
}) => {
  const {slug} = useParams<RouteParams>();
  const [blogLoading, setBlogLoading] = useState(true)
  const [fetched, setFetched] = useState(true)
  const [blog, setBlog] = useState(null)
  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  
  useEffect(() => {
    setBlogLoading(true)
    fetchPost(slug).then((res) => {
      setBlogLoading(false)
      if(res && Object.keys(res).length > 0){
        setBlog(res)
      }else{
        setFetched(false)
      }
    }).catch(() => setBlogLoading(false) )
  }, [slug]);
  if(!blogLoading){
    if(blog === null) return (
      <div className="container flex items-center justify-center h-screen">
        <EmptyCard text={'No Blog found!'} />
      </div>
    )
  }
  
  return (
    <>
      {
        <div
          className={`nc-PageSingleTemp3Sidebar ${className}`}
          data-nc-id="PageSingleTemp3Sidebar"
        >
          <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
            {/* SINGLE HEADER */}
          {
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
          }

            {/* FEATURED IMAGE */}
            <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
              <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r"></div>
              <img
                className="block w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1605487903301-a1dff2e6bbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1957&q=80"
                alt=""
              />
            </div>
          </header>

          {/* SINGLE MAIN CONTENT */}
          <div className="container flex flex-col my-10 lg:flex-row ">
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
              <SingleContent data={blog || FAKE_SINGLE_POST} loading={blogLoading} 
              />
            </div>
            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
              <Sidebar />
            </div>
          </div>

          {/* RELATED POSTS */}
          <SingleRelatedPosts blog={blog || FAKE_SINGLE_POST} />
        </div>
      }
    </>
  );
};

export default PageSingleTemp3Sidebar;
