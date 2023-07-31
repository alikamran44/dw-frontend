
import React, { FC, useEffect, useRef, useState } from "react";
import Tag from "components/Tag/Tag";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
import { useLocation } from "react-router";
import { createComment } from '../../Actions/CommentAction';
import { getComments } from "../../Actions/CommentAction";
import { SINGLE } from "data/single";
import { PostDataType, TaxonomyType } from "data/types";
import { CommentType } from "components/CommentCard/CommentCard";
// import { Link } from "react-scroll";
// import * as Scroll from 'react-scroll';
// let scroll    = Scroll.animateScroll;

export interface SingleContentProps {
  data: PostDataType;
  loading?: boolean;
}
 const fComments = SINGLE.comments
const SingleContent: FC<SingleContentProps> = ({ data, loading }) => {
  const { tags, postedBy, _id } = data;
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [commentCount, setTotalComments] = useState(null)
  const commentRef = useRef<HTMLDivElement>(null);
  const author = postedBy
  const location = useLocation();
  useEffect(() => {
    //  SCROLL TO COMMENT AREA
    if (location.hash !== "#comment") {
      return;
    }
    //
    if (location.hash === "#comment" && commentRef.current) {
      setTimeout(() => {
        // scroll.scrollTo("comment", {
        //   duration: 500,
        //   smooth: true,
        // });
      }, 500);
    }
  }, [location]);

  useEffect(()=>{
    if(data._id){
      getComments(data._id, 1).then((data: any) => {
        setComments(data.comments);
        setTotalComments(data.total)
      })
    }
  },[data])

  const viewMoreComments = () => {
    if(data._id){
      getComments(data._id, 1).then((data: any) => {
        setComments(data.comments);
        setTotalComments(data.total)
      })
    }
  }

  const loginSubmitHandler = (values: any, resetForm: any ) => { 
    if(values){
      values.blog_id = _id;
      values.blog_user_id = postedBy._id;
      createComment(values).then((res) => {
        resetForm();
        const newComments = Array.isArray(comments) ? comments : [];
        setComments([res, ...newComments]);
      })
    }
  };

  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        {/* THIS IS THE DEMP CONTENT */}
        {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
        <SingleContentDemo blogContent={data.content || ''} />
      </div>

      {/* TAGS */}
      <div className="max-w-screen-md mx-auto flex flex-wrap">
        {tags?.map((item: any) => (
          <Tag hideCount key={item._id || item.id} tag={item} className="mr-2 mb-2" />
        ))}
      </div>

      {/* AUTHOR */}
      <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      <div className="max-w-screen-md mx-auto ">
        <SingleAuthor author={author} loading={loading} />
      </div>

      {/* COMMENT FORM */}
   
        <div
          id="comment" 
          ref={commentRef}
          className="max-w-screen-md mx-auto pt-5"
        >
          {
          commentCount &&  
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              Responses ({commentCount})
            </h3>
          } 
          <SingleCommentForm
            onClickSubmit={loginSubmitHandler}
            onClickCancel={(id) => console.log('_id')}
          />
        </div>

      {/* COMMENTS LIST */}
      <div className="max-w-screen-md mx-auto">
        <SingleCommentLists 
          comments={comments || fComments} 
          setComments={setComments}
          loading={loading} 
          blog_id = {_id}
          totalComments={commentCount}
          blog_user_id = {postedBy._id}
        />
      </div>
    </div>
  );
};

export default SingleContent;
