import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import ModalCategories from "./ModalCategories";
import ModalTags from "./ModalTags";
import { DEMO_POSTS_VIDEO } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types"; 
import { DEMO_CATEGORIES, DEMO_TAGS, DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import { blogsType  } from '../../Actions/PostAction';
import Card10V2 from "components/Card10/Card10V2";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { allBloggers } from '../../Actions/AuthAction';
import BlogsHelper from './Helper'
import { selectTagLoading } from "app/tag/tagSlice";
import { useAppSelector } from "app/hooks";
import Header from "./Header";

export interface PageArchiveVideoProps {
  className?: string;
}

interface RouteParams {
  slug: string;
  blogtype?: string;
}
const PageArchiveVideo: FC<PageArchiveVideoProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch()
  const {blogtype, slug} = useParams<RouteParams>();
  const { CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[2];
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [totalRemainingBlogsCount, setTotalRemainingBlogsCount] = useState(0);
  const [videoBlogs, setVideoBlogs] = useState<PostDataType[] | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const initialFilter = {limit: 1, skip: 0};
  const [filter, setFilter] = useState({skip: 0, limit: 1, postType: 'video'});
  const [users, setUsers] = useState(null);
  const [morePostLoading, setMorePostLoading] = useState(false);
  const [data, setData] = useState(null);

  const initialFilterTags = {limit: 2, skip: 0};
  const [tagFilter, setTagFilter] = useState({skip: 0, limit: 2,});
  const [moreLoadingTag, setMoreLoadingTag] = useState(false);
  const [remainingTagCount, setRemainingTagCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);
  const [tags, setTags] = useState(null);
  const tagLoading = useAppSelector(selectTagLoading)

  const initialFilterCategory = {limit: 2, skip: 0};
  const [categoryFilter, setCategoryFilter] = useState({skip: 0, limit: 2,});
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [remainingCategoryCount, setRemainingCategoryCount] = useState(0);
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [categoryCount, setCategoryCount] = useState(0);
  const repeatedCategoriesArray = Array.from({ length: categoryFilter.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();
  const posts: PostDataType[] = DEMO_POSTS_VIDEO.filter((_, i) => i < filter.limit);

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

  useEffect(()=>{
    let count = {limit: initialFilter.limit, skip: initialFilter.skip + initialFilter.limit, postType: 'video'}
    setVideoLoading(true)
    const newFilter = {...initialFilter,blogtype: blogtype,slug: slug, postType: 'video'}
    dispatch(blogsType(newFilter)).then((res: any) => {
      setFilter(count)
      setVideoLoading(false)
      setTotalBlogsCount(res.size)
      setTotalRemainingBlogsCount(res.remainingBlogs)
      if(res){
        setData(res.data)
        setVideoBlogs(res.blogs)
      }
    }).catch(() => setVideoLoading(false))
  },[blogtype,slug])

  useEffect(()=>{
    dispatch(allBloggers(filter)).then((res: any) => {
      setUsers(res)
    })
    TagWithTotalBlogs({skip: 0, limit: 20}).then((res: any)=> {
      let countTag = {limit: initialFilterTags.limit, skip: initialFilterTags.skip + initialFilterTags.limit}
      setTagFilter(countTag)
      setRemainingTagCount(res.remainingTags)
      setTagCount(res.totalTags)
      setTags(res.tags)
    })
    setLoadingCategory(true)
    let countCategory = {limit: initialFilterCategory.limit, skip: initialFilterCategory.skip + initialFilterCategory.limit}
    CategoryWithTotalBlogs(initialFilterCategory).then((res: any)=> {
      setLoadingCategory(false)
      setCategoryCount(res.totalCategories)
      setRemainingCategoryCount(res.remainingCategories)
      setCategoryFilter(countCategory)
      if(res)
        setCategories(res.categories)
    }).catch(()=> setLoadingCategory(false))
  },[])

  const loadMoreCategory = () => {
    setMoreLoadingCategory(true)
    let count = {limit: categoryFilter.limit, skip: categoryFilter.skip + categoryFilter.limit}
    CategoryWithTotalBlogs(categoryFilter).then((res: any)=> {
      setMoreLoadingCategory(false)
      setRemainingCategoryCount(res.remainingCategories)
      setCategoryFilter(count)
      if(res){
        let newArray = categories?.concat(res.categories)
        if(newArray)
          setCategories(newArray)
      }
    }).catch(()=> setMoreLoadingCategory(false))
  }

  const loadMore = () => {
    setMorePostLoading(true)
    let count = {skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'video'}
    const newFilter = {...filter,blogtype: blogtype,slug: slug}
    dispatch(blogsType(newFilter)).then((res: any) => {
      setFilter(count)
      setMorePostLoading(false)
      setTotalBlogsCount(res.size)
      setTotalRemainingBlogsCount(res.remainingBlogs)
      let newArray = videoBlogs?.concat(res.blogs)
      if(newArray)
      setVideoBlogs(newArray);
    }).catch(() => {
      setMorePostLoading(false)
    })
  }
  return (
    <div
      className={`nc-PageArchiveVideo overflow-hidden ${className}`}
      data-nc-id="PageArchiveVideo"
    >
      {/* HEADER */}
      <Header
        data={data}
        blogs={videoBlogs}
        blogsTotalCount={totalBlogsCount}
        postType={'video'}
      />
      
      {/* ====================== END HEADER ====================== */}
      <div className="container">
        <div className="mt-16 flex flex-col sm:items-center sm:justify-between sm:flex-row">
          <div className="flex space-x-2.5">
            <ModalCategories categories={categories || DEMO_CATEGORIES} 
              loading={loadingCategory} postType={'video'}
              loadMoreCategory={loadMoreCategory}
              remainingCategoryCount={remainingCategoryCount}
              moreLoadingCategory={moreLoadingCategory}
            />
            <ModalTags  
              tags={tags || DEMO_TAGS} 
              loading={tagLoading} postType={'video'}
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 lg:mt-10">
          {(videoBlogs || posts ).map((post: any) => (
            <Card10V2 key={post._id || post.id} post={post} />
          ))}
          {
            morePostLoading &&
            posts.map((post: any) => (
              <Card10V2 key={post._id || post.id} post={post} />
            ))
          }
        </div>

        {/* PAGINATIONS */}
       { (!videoLoading && totalRemainingBlogsCount > 0) &&
         <div className="text-center mx-auto mt-10 md:mt-16">
           <ButtonPrimary onClick={()=> loadMore()}>
             { morePostLoading &&
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             }
             Show me more
           </ButtonPrimary>
         </div>}
      </div>
      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        {/* === SECTION 5 === */}
      
      <div className="relative py-16">
        <BackgroundSection />
        <SectionGridCategoryBox
          categories={categories || repeatedCategoriesArray}
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
        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={users || DEMO_AUTHORS.filter((_, i) => i < 10)}
          uniqueSliderClass="PageArchiveVideo"
        />
        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchiveVideo;
