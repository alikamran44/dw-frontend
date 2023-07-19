import React, { FC, useState, useEffect } from "react";
import ModalCategories from "./ModalCategories";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS, DEMO_FAKE_POST_DATA, DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
import { useParams } from "react-router-dom";
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

export interface PageArchiveProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);

const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const { fetchBlogs, blogBookmark, recentBlogsHelper, CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[0];
  const {blogType, slug} = useParams()
  // const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [filter, setFilter] = useState({limit: 2, skip: 0});
  const [blogs, setBlogs] = useState(null);
  const [size, setSize] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [morePostLoading, setMorePostLoading] = useState(false);

  const [filterCategory, setFilterCategory] = useState({limit: 20, skip: 0});
  const [categories, setCategories] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [tags, setTags] = useState(null);
  const tagLoading = useAppSelector(selectTagLoading)
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
   const [users, setUsers] = useState(null);
  const repeatedCategoriesArray = Array.from({ length: filterCategory.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];
  const fakePosts = Array.from({ length: filter.limit }, (_, index) =>
    DEMO_FAKE_POST_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  useEffect(()=>{
     TagWithTotalBlogs({skip: 0, limit: 20}).then((res)=> {
      setTags(res)
    })
  },[])

  useEffect(() => {
    setBlogs(null)
    setPostLoading(true)

    let countCategory = {limit: filterCategory.limit, skip: filterCategory.skip + filterCategory.limit}
    setLoadingCategory(true)
    CategoryWithTotalBlogs(filterCategory).then((res) => {
      setFilterCategory(countCategory)
      setCategories(res)
      setLoadingCategory(false)
    }).catch(()=> setLoadingCategory(false))

    // .......... Fetch Blogs ..................
    let count = {limit: filter.limit, skip: filter.skip + filter.limit}
    fetchBlogs(blogType,filter,slug).then((res) => {
      setFilter(count)
      setSize(res.size) 
      setPostLoading(false)
      setBlogs(res.blogs) 
    }).catch(() => {
      setPostLoading(false)
    })

     AllBloggers(filter).then((res) => {
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
    CategoryWithTotalBlogs(filterCategory).then((res)=> {
      setMoreLoadingCategory(false)
      setFilterCategory(count)
      if(res.length){
        let newArray = categories.concat(res)
        setCategories(newArray)
      }
    }).catch(()=> setMoreLoadingCategory(false))
  }

  const loadMore = () => {
    setMorePostLoading(true)
    let count = {limit: filter.limit, skip: filter.skip + filter.limit}
    fetchBlogs(blogType, filter, slug).then((res) => {
      setFilter(count)
      setSize(res.size)
      setMorePostLoading(false)
      let newArray = blogs.concat(res.blogs)
      setBlogs(newArray);
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
      <Helmet>
        <title>Archive || Blog Magazine React Template</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {PAGE_DATA.name}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {(blogs && blogs.length) || PAGE_DATA.count} Articles
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              <ModalCategories categories={categories || DEMO_CATEGORIES} loading={loadingCategory} />
              <ModalTags tags={tags || DEMO_TAGS} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            { 
              postLoading ?
              fakePosts.map((post) => (
               <Card11 loading={postLoading} key={post._id} post={post} />
               ))
              :
             blogs && blogs.length > 0 ? blogs.map((post) => (
                <Card11 key={post._id} post={post} />
              ))
             :
             <EmptyCard text={'Nothing we found!'} />
            }
            {
              morePostLoading &&
              fakePosts.map((post) => (
               <Card11 loading={morePostLoading} key={post._id} post={post} />
              ))
            }
          </div>

          {/* PAGINATIONS */}
          {
            !postLoading &&
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
            />
            <div className="text-center mx-auto mt-10 md:mt-16">
              <ButtonSecondary onClick={loadMoreCategory}>
                { moreLoadingCategory &&
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                }
                Show me more
              </ButtonSecondary>
            </div>
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
