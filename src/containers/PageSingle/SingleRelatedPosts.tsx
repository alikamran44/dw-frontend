import React, { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import { useAppDispatch } from "app/hooks";
import { PostDataType } from "data/types";
import Card11 from "components/Card11/Card11";
import Card9 from "components/Card9/Card9";
import { DEMO_POSTS } from "data/posts";
import { fetchUserBlogs, relatedBog  } from '../../Actions/PostAction';

export interface SingleRelatedPostsProps {
  relatedPosts?: PostDataType[];
  moreFromAuthorPosts?: PostDataType[];
}

// DEMO DATA
const demoRelated: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i >= 10 && i < 14
);
const demoMoreFromAuthor: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i >= 14 && i < 18
);

const SingleRelatedPosts: FC<SingleRelatedPostsProps> = ({
  relatedPosts = demoRelated,
  moreFromAuthorPosts = demoMoreFromAuthor,
  blog
}) => {
  const dispatch = useAppDispatch()
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [authorBlogsLoading, setAuthorBlogsLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState(null);
  const [authorBlogs, setAuthorBlogs] = useState(null);
  const { postedBy, _id, } = blog;

  useEffect(()=>{
    if(_id && blog.categories){
      dispatch(relatedBog({skip: 0, limit: 5, _id: _id, categories: blog.categories})).then((res) => {
        setRelatedBlogs(res)
        setRelatedLoading(false)
      }).catch(() => setRelatedLoading(false))
    }
    if(postedBy?._id !== null && postedBy?._id !== ''){
      dispatch(fetchUserBlogs(postedBy?._id,{skip: 0, limit: 5})).then((res) => {
        setAuthorBlogs(res.blogs)
        setAuthorBlogsLoading(false)
      }).catch(() => setAuthorBlogsLoading(false))
    }
  },[blog])
  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28">
      {/* RELATED  */}
      <div className="container">
        <div>
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            desc=""
          >
            Related posts
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {(relatedBlogs || relatedPosts).map((post) => (
              <Card11 loading={relatedLoading} key={post._id || post.id} post={post} />
            ))} 
          </div>
        </div>

        {/* MORE FROM AUTHOR */}
        <div className="mt-20">
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            desc=""
          >
            More from author
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {(authorBlogs || moreFromAuthorPosts).map((post) => (
              <Card9 loading={authorBlogsLoading} key={post._id || post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRelatedPosts;
