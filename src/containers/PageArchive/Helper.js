import BlogsHelper from './Helper';
import { useDispatch } from 'react-redux';
import { fetchCategory, categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { fetchTag } from '../../Actions/TagAction';
import { fetchPosts, bookmarkBlog, FetchRecentPosts, fetchUserBlogs } from '../../Actions/PostAction';
import { allBloggers } from '../../Actions/AuthAction';
import { tagWithTotalBlogs } from '../../Actions/TagAction';

const HelperBlogs = () => {
  const dispatch = useDispatch();

  const fetchBlogs = (blogType, data, slug) => {
    console.log(blogType,'blogTypeblogTypeblogType')
    if(blogType === undefined || blogType === null)
      return dispatch(fetchPosts(data));
    else if(blogType === 'tag')
      return dispatch(fetchTag(slug, data));
    else if(blogType === 'category')
      return dispatch(fetchCategory(slug, data))
    else if(blogType === 'user')
      return dispatch(fetchUserBlogs(slug, data));
  };
  const blogBookmark = (id) => {
    return bookmarkBlog(id);
  };
  const recentBlogsHelper = (id) => {
    return dispatch(FetchRecentPosts());
  };

  const CategoryWithTotalBlogs = (filter) => {
    return dispatch(categoryWithTotalBlogs(filter));
  };

  const TagWithTotalBlogs = (filter) => {
    return dispatch(tagWithTotalBlogs(filter));
  };

  const AllBloggers = (filter) => {
    return dispatch(allBloggers(filter));
  };

  return { fetchBlogs, blogBookmark, recentBlogsHelper, CategoryWithTotalBlogs, AllBloggers, TagWithTotalBlogs };
};

export default HelperBlogs;
