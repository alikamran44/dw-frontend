import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalCategories from "./ModalCategories";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS, DEMO_FAKE_POST_DATA, DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
import Pagination from "components/Pagination/Pagination";
import Skeleton from "components/Skeleton/Skeleton";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";
import Card11 from "components/Card11/Card11";
import EmptyCard from "components/EmptyCard/EmptyCard"; 
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import BlogsHelper from './Helper'
import { selectTagLoading } from "app/tag/tagSlice";
import { useAppSelector } from "app/hooks";
import Header from "./Header";

export interface PageArchiveProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
interface RouteParams {
  slug: string;
  blogtype?: string;
}
const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const { fetchBlogs, blogBookmark, recentBlogsHelper, CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[0];
  const {blogtype, slug} = useParams<RouteParams>();
  // const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const initialFilter = {limit: 2, skip: 0};
  const [filter, setFilter] = useState({limit: 2, skip: 0});
  const [blogs, setBlogs] = useState<PostDataType[] | null>(null);
  const [blogsRemainingCount, setBlogsRemainingCount] = useState(0);
  const [blogsTotalCount, setBlogsTotalCount] = useState(0);
  const [size, setSize] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [morePostLoading, setMorePostLoading] = useState(false);
  const initialFilterCategory = {limit: 2, skip: 0};

  const initialFilterTags = {limit: 2, skip: 0};
  const [tagFilter, setTagFilter] = useState({skip: 0, limit: 2,});
  const [moreLoadingTag, setMoreLoadingTag] = useState(false);
  const [remainingTagCount, setRemainingTagCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);
  const [tags, setTags] = useState(null);
  const tagLoading = useAppSelector(selectTagLoading)

  const [filterCategory, setFilterCategory] = useState({limit: 2, skip: 0});
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [categoryCount, setCategoryCount] = useState(0);
  const [remainingCategoryCount, setRemainingCategoryCount] = useState(0);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
   const [users, setUsers] = useState(null);
   const [data, setData] = useState(null);
  const repeatedCategoriesArray = Array.from({ length: filterCategory.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map((item: any) => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat(); 

  const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < filter.limit);
  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];
  const fakePosts = Array.from({ length: filter.limit }, (_, index) =>
    DEMO_FAKE_POST_DATA.map((item: any) => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  useEffect(()=>{
     TagWithTotalBlogs({skip: 0, limit: 3}).then((res: any)=> {
      let countTag = {limit: initialFilterTags.limit, skip: initialFilterTags.skip + initialFilterTags.limit}
      setTagFilter(countTag)
      setRemainingTagCount(res.remainingTags)
      setTagCount(res.totalTags)
      setTags(res.tags)
    })
  },[])

  useEffect(() => {
    setBlogs(null)
    setData(null)
    setPostLoading(true)
    let countCategory = {limit: initialFilterCategory.limit, skip: initialFilterCategory.skip + initialFilterCategory.limit}
    setLoadingCategory(true)
    CategoryWithTotalBlogs(initialFilterCategory).then((res: any) => {
      setFilterCategory(countCategory)
      setLoadingCategory(false)
      setRemainingCategoryCount(res.remainingCategories)
      setCategoryCount(res.totalCategories)
      if(res)
        setCategories(res.categories)
    }).catch(()=> setLoadingCategory(false))

    // .......... Fetch Blogs ..................
    let count = {limit: initialFilter.limit, skip: initialFilter.skip + initialFilter.limit}
    const filteredBlogType = blogtype || 'default-blog-type';
    fetchBlogs(filteredBlogType!,initialFilter,slug).then((res: any) => {
      setFilter(count)
      // setSize(res.size) 
      setPostLoading(false)
      setBlogsRemainingCount(res.remainingBlogs)
      setBlogsTotalCount(res.size)
      if(res.category)
        setData(res.category)
      if(res.tag)
        setData(res.tag)
      if(res)
        setBlogs(res.blogs) 
    }).catch(() => {
      setPostLoading(false)
    })

     AllBloggers(initialFilter).then((res: any) => {
      setUsers(res)
    })
  }, [slug])

  useEffect(()=>{
    if(!categories){
      setCategories(repeatedCategoriesArray)
    }
  },[categories])
  const loadMoreCategory = () => {
    setMoreLoadingCategory(true)
    let count = {limit: filterCategory.limit, skip: filterCategory.skip + filterCategory.limit}
    CategoryWithTotalBlogs(filterCategory).then((res: any)=> {
      setMoreLoadingCategory(false)
      setFilterCategory(count)
      setRemainingCategoryCount(res.remainingCategories)
      if(res){
        let newArray = categories?.concat(res.categories)
        if(newArray)
          setCategories(newArray)
      }
    }).catch(()=> setMoreLoadingCategory(false))
  }

  const loadMore = () => {
    setMorePostLoading(true)
    fetchBlogs(blogtype, filter, slug).then((res: any) => {
    let count = {limit: res.remainingBlogs < filter.limit ? 
      res.remainingBlogs : filter.limit, skip: filter.skip + filter.limit}
      setFilter(count)
      setSize(res.size)
      setBlogsRemainingCount(res.remainingBlogs)
      setMorePostLoading(false)
      if(res){
        let newArray = blogs?.concat(res.blogs)
        if(newArray)
          setBlogs(newArray);
      }
    }).catch(() => {
      setMorePostLoading(false)
    })
 }


  // if(!blogs) return <></>
  return (
    <div
      className={`nc-PageArchive overflow-hidden ${className}`}
      data-nc-id="PageArchive"
    >
     <Header
        data={data}
        blogs={blogs}
        blogsTotalCount={blogsTotalCount}
     />

      {/* HEADER */}

      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              <ModalCategories categories={categories || DEMO_CATEGORIES} 
                loading={loadingCategory} 
                loadMoreCategory={loadMoreCategory}
                remainingCategoryCount={remainingCategoryCount}
                moreLoadingCategory={moreLoadingCategory}
              />
              <ModalTags 
                tags={tags || DEMO_TAGS} 
                loading={tagLoading} 
                setTagFilter={setTagFilter}
                setRemainingTagCount={setRemainingTagCount}
                setTagCount={setTagCount}
                setTags={setTags}
                setMoreLoadingTag={setMoreLoadingTag}
                tagFilter={tagFilter}
                moreLoadingTag={moreLoadingTag}
                remainingTagCount={remainingTagCount}
                tagCount={tagCount}
              />
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            
            {/*Note: Do it Later*/}
            {/*<div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>*/}
          </div>

          {/* LOOP ITEMS */}
          <div  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            { 
              postLoading ?
              fakePosts.map((post) => (
               <Card11 loading={postLoading} key={post._id} post={post} />
               ))
              :
             blogs && blogs.length > 0 ? blogs.map((post: any) => (
                <Card11 key={post._id} post={post} />
              ))
             :
             <EmptyCard text={'Nothing we found!'} />
            }
            {
              morePostLoading &&
              fakePosts.map((post: any) => (
               <Card11 loading={morePostLoading} key={post._id} post={post} />
              ))
            }
          </div>

          {/* PAGINATIONS */}
          {
            (!postLoading && blogsRemainingCount > 0) &&
            <div className="text-center mx-auto mt-10 md:mt-16">
              <ButtonPrimary onClick={()=> loadMore()}>
                { morePostLoading &&
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                }
                Show me more
              </ButtonPrimary>
            </div>
          }
        </div>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        {
          categories &&
          <div className="relative py-16">
            <BackgroundSection />
            <SectionGridCategoryBox
              categories={categories}
              loading={loadingCategory}
              moreLoading={moreLoadingCategory}
              fakeCategories={repeatedCategoriesArray}
              categoryCount={categoryCount}
            />
            {
              remainingCategoryCount > 0 &&
                <div className="text-center mx-auto mt-10 md:mt-16">
                  <ButtonSecondary onClick={loadMoreCategory}>
                    { moreLoadingCategory &&
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    }
                    Show me more
                  </ButtonSecondary>
                </div>
            }
          </div>
        }

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={users || DEMO_AUTHORS.filter((_, i) => i < 10)}
          uniqueSliderClass="PageArchive"
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchive;
