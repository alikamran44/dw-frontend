
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
  const initialCommentFilter = {skip: 1, limit: 4};
  const [commentFilter, setCommentFilter] = useState({skip: 1, limit: 4});
  const [commentCount, setTotalComments] = useState(null);
  const [remainingCommentCount, setRemainingCommentCount] = useState(0);
  const [commentMoreLoading, setCommentMoreLoading] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const author = postedBy
  const location = useLocation();
  useEffect(() => {
    //  SCROLL TO COMMENT AREA
    if (location.hash !== "#comments") {
      return;
    }
    //
    if (location.hash === "#comments" && commentRef.current) {
       const commentElement = document.getElementById("comments");
      setTimeout(() => {
       if (commentElement) {
          commentElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location]);

  useEffect(()=>{ 
    if(data._id){
      getComments(data._id, initialCommentFilter.skip, initialCommentFilter.limit).then((data: any) => {
        setCommentFilter({limit: initialCommentFilter.limit,skip: initialCommentFilter.skip + 1})
        setComments(data.comments);
        setTotalComments(data.comments?.length)
        setRemainingCommentCount(data.remainingCount)
      })
    }
  },[data])

  const viewMoreComments = () => {
    if(data._id){
      setCommentMoreLoading(true)
      getComments(data._id, commentFilter.skip, remainingCommentCount).then((data: any) => {
        setCommentMoreLoading(false)
        setCommentFilter({...commentFilter, skip: commentFilter.skip + 1})
        if(data.comments?.length > 0){
          setTotalComments(data.comments?.length)
          setRemainingCommentCount(data.remainingCount)
          const concatArray = comments?.concat(data.comments)
          if(concatArray)
            setComments(concatArray);
        }
      }).catch((err) => {
        setCommentMoreLoading(false);
      });
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
          id="comments" 
          ref={commentRef}
          className="max-w-screen-md mx-auto pt-5"
        >
          {
            commentCount ? commentCount > 0 &&  
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              Responses ({commentCount})
            </h3>
            : ''
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
          viewMoreComments={viewMoreComments}
          commentMoreLoading={commentMoreLoading}
          remainingCommentCount={remainingCommentCount}
        />
      </div>
    </div>
  );
};

export default SingleContent;
