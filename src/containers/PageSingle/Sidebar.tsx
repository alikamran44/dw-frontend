
import React, { FC, useEffect, useState } from "react";
import WidgetAuthors from "components/WidgetAuthors/WidgetAuthors";
import { useAppDispatch, useAppSelector } from "app/hooks";
import WidgetCategories from "components/WidgetCategories/WidgetCategories";
import WidgetPosts from "components/WidgetPosts/WidgetPosts";
import WidgetTags from "components/WidgetTags/WidgetTags";
import { DEMO_AUTHORS } from "data/authors";
import { DEMO_POSTS } from "data/posts";
import { DEMO_CATEGORIES, DEMO_TAGS, DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
import { PostDataType } from "data/types";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { tagWithTotalBlogs } from '../../Actions/TagAction';
import { allBloggers } from '../../Actions/AuthAction';
import { FetchRecentPosts  } from '../../Actions/PostAction';
import { selectCategoryLoading } from "app/category/categorySlice";
import { selectTagLoading } from "app/tag/tagSlice";

export interface SidebarProps { 
  className?: string;
}

const widgetPosts: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 2 && i < 7);
const tags = DEMO_TAGS.filter((_, i) => i > 5);
const categories = DEMO_CATEGORIES.filter((_, i) => i > 7 && i < 13);
const authors = DEMO_AUTHORS.filter((_, i) => i < 5);

const repeatedCategoriesArray = Array.from({ length: 5 }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();
const repeatedTagsArray = Array.from({ length: 20 }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

export const Sidebar: FC<SidebarProps> = ({ className = "space-y-6 " }) => {
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  const [users, setUsers] = useState(null);
  const [popularBlogs, setPopularBlogs] = useState(null);
  const categoryLoading = useAppSelector(selectCategoryLoading)
  const tagLoading = useAppSelector(selectTagLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(categoryWithTotalBlogs({skip: 0, limit: 5})).then((res)=> {
      setCategories(res)
    })
    dispatch(tagWithTotalBlogs({skip: 0, limit: 20})).then((res)=> {
      setTags(res)
    })
    let dataRecent = {skip: 0, limit: 5}
    dispatch(FetchRecentPosts(dataRecent)).then((res) => {
      setPopularBlogs(res)
    })
    dispatch(allBloggers({skip: 0, limit: 5})).then((res) => {
      setUsers(res)
    })
  }, []);

  return (
    <div className={`nc-SingleSidebar ${className}`}>
      {
        tags &&
            <WidgetTags tags={tags || repeatedTagsArray} loading={tagLoading} />
      }
      {
        categories &&
            <WidgetCategories categories={categories || repeatedCategoriesArray} loading={categoryLoading} />
      }
      <WidgetAuthors authors={users || authors} />
      <WidgetPosts posts={popularBlogs || widgetPosts} />
    </div>
  );
};
