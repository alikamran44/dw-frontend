import BlogsHelper from './Helper';
import { useAppDispatch } from "app/hooks";
import { fetchCategory, categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { fetchTag } from '../../Actions/TagAction';
import { fetchPosts, bookmarkBlog, FetchRecentPosts, fetchUserBlogs } from '../../Actions/PostAction';
import { allBloggers } from '../../Actions/AuthAction';
import { tagWithTotalBlogs } from '../../Actions/TagAction';

const HelperBlogs = () => {
  const dispatch = useAppDispatch();

  const fetchBlogs = (blogType: string | null | undefined, data: any, slug: any) => {
    if(blogType === undefined || blogType === null || blogType === 'default-blog-type')
      return dispatch(fetchPosts(data));
    else if(blogType === 'tag')
      return dispatch(fetchTag(slug, data));
    else if(blogType === 'category')
      return dispatch(fetchCategory(slug, data))
    else if(blogType === 'user')
      return dispatch(fetchUserBlogs(slug, data));
    else return Promise.resolve([]);
  };
  const blogBookmark = (id: any) => {
    return bookmarkBlog(id);
  };
  const recentBlogsHelper = (id: any) => {
    return dispatch(FetchRecentPosts());
  };

  const CategoryWithTotalBlogs = (filter: any) => {
    return dispatch(categoryWithTotalBlogs(filter));
  };

  const TagWithTotalBlogs = (filter: any) => {
    return dispatch(tagWithTotalBlogs(filter));
  };

  const AllBloggers = (filter: any) => {
    return dispatch(allBloggers(filter));
  };

  return { fetchBlogs, blogBookmark, recentBlogsHelper, CategoryWithTotalBlogs, AllBloggers, TagWithTotalBlogs };
};

export default HelperBlogs;
