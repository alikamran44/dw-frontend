import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalCategories from "./ModalCategories";
import { useAppDispatch } from "app/hooks";
import ModalTags from "./ModalTags";
import { DEMO_POSTS_VIDEO, DEMO_POSTS_GALLERY } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types"; 
import { DEMO_CATEGORIES, DEMO_TAGS, DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
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
import Card10V3 from "components/Card10/Card10V3";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { allBloggers } from '../../Actions/AuthAction';
import BlogsHelper from './Helper'
import { selectTagLoading } from "app/tag/tagSlice";
import { useAppSelector } from "app/hooks";
import CommonHeader from "./CommonHeader";

export interface PageArchiveGalleryProps {
  className?: string;
}

// Router Params
interface RouteParams {
  slug: string;
  blogtype?: string;
}
const PageArchiveGallery: FC<PageArchiveGalleryProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch()
  const {blogtype, slug} = useParams<RouteParams>();
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[2];
   const { CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [totalRemainingBlogsCount, setTotalRemainingBlogsCount] = useState(0);
  const [galleryBlogs, setGalleryBlogs] = useState<PostDataType[] | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const initialFilter = {limit: 2, skip: 0};
  const [filter, setFilter] = useState({skip: 0, limit: 2, postType: 'gallery'});
  const initialFilterCategory = {limit: 2, skip: 0};
  const [categoryFilter, setCategoryFilter] = useState({skip: 0, limit: 2,});
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [remainingCategoryCount, setRemainingCategoryCount] = useState(0);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
  const [categoryCount, setCategoryCount] = useState(0);
  const [users, setUsers] = useState(null);
  const [morePostLoading, setMorePostLoading] = useState(false);
  const [tags, setTags] = useState(null);
  const tagLoading = useAppSelector(selectTagLoading)
  const posts: PostDataType[] = DEMO_POSTS_VIDEO.filter((_, i) => i < filter.limit);
  const repeatedCategoriesArray = Array.from({ length: categoryFilter.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];
  // Gallery have same data type - we will use one demo data
  const postsDemo: PostDataType[] = DEMO_POSTS_GALLERY.filter(
    (_, i) => i < filter.limit
  );
  useEffect(()=>{
    setGalleryLoading(true)
    const newFilter = {...initialFilter,blogtype: blogtype,slug: slug, postType: 'gallery'}
    dispatch(blogsType(newFilter)).then((res: any) => {
      setFilter({skip: initialFilter.limit+ initialFilter.skip, limit: initialFilter.limit, postType: 'gallery'})
      setGalleryBlogs(res.blogs)
      setTotalBlogsCount(res.size)
      setTotalRemainingBlogsCount(res.remainingBlogs)
      setGalleryLoading(false)
    }).catch(() => setGalleryLoading(false))
  },[blogtype,slug])
  useEffect(()=>{
    TagWithTotalBlogs({skip: 0, limit: 20}).then((res: any)=> {
      setTags(res.tags)
    })

    dispatch(allBloggers(filter)).then((res: any) => {
      setUsers(res)
    })
    setLoadingCategory(true)
    CategoryWithTotalBlogs(categoryFilter).then((res: any)=> {
      let countCategory = {limit: initialFilterCategory.limit, skip: initialFilterCategory.skip + initialFilterCategory.limit}
      setCategoryFilter(countCategory)
      setRemainingCategoryCount(res.remainingCategories)
       setLoadingCategory(false)
      if(res)
        setCategories(res.categories)
    }).catch((err)=>  setLoadingCategory(false))
  },[])

  const loadMore = () => {
    setMorePostLoading(true)
    let count = {skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'gallery'}
    const newFilter = {...filter,blogtype: blogtype,slug: slug}
    dispatch(blogsType(newFilter)).then((res: any) => {
      setFilter(count)
      setMorePostLoading(false)
      setTotalRemainingBlogsCount(res.remainingBlogs)
      setTotalBlogsCount(res.size)
      setCategoryCount(res.totalCategories)
      let newArray = galleryBlogs?.concat(res.blogs)
      if(newArray)
        setGalleryBlogs(newArray);
    }).catch(() => {
      setMorePostLoading(false)
    })
  }
  const loadMoreCategory = () => {
    setMoreLoadingCategory(true)
    let count = {limit: categoryFilter.limit, skip: categoryFilter.skip + categoryFilter.limit}
    dispatch(categoryWithTotalBlogs(categoryFilter)).then((res: any)=> {
      setMoreLoadingCategory(false)
      setCategoryFilter(count)
      setCategoryCount(res.totalCategories)
      setRemainingCategoryCount(res.remainingCategories)
      if(res){
        let newArray = categories?.concat(res.categories)
        if(newArray)
          setCategories(newArray)
      }
    }).catch(()=> setMoreLoadingCategory(false))
  }

  return (
    <div
      className={`nc-PageArchiveGallery overflow-hidden ${className}`}
      data-nc-id="PageArchiveGallery"
    >
      <CommonHeader blogs={galleryBlogs} />
 
      
    <div className="container  ">
        {/* HEADER */}
      <div className="w-full xl:max-w-screen-2xl mx-auto">
        <div className=" relative aspect-w-16 lg:pt-28 overflow-hidden ">
          <div className="absolute inset-0  text-white bg-opacity-30 flex flex-col 
            items-center justify-center"
          >
            <span className="block text-neutral-600">
              {(totalBlogsCount && totalBlogsCount) || PAGE_DATA.count} Gallery Articles
            </span>
          </div>
        </div>
      </div>
        {/* ====================== END HEADER ====================== */}
        <div className="mt-16 flex flex-col sm:items-center sm:justify-between sm:flex-row">
          <div className="flex space-x-2.5">
            <ModalCategories categories={categories || DEMO_CATEGORIES} loading={loadingCategory} />
            <ModalTags tags={tags || DEMO_TAGS} loading={tagLoading} />
          </div>

          <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
          
          {/*Note: Do it Later*/}
          {/*<div className="flex justify-end">
            <ArchiveFilterListBox lists={FILTERS} />
          </div>*/}
        </div>

        {/* LOOP ITEMS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8    lg:mt-10"
        >
          {(galleryBlogs || postsDemo).map((post: any) => (
            <Card10V3 key={post._id || post.id} post={post} />  
          ))}
        </div>

        {/* PAGINATIONS */}
       { (!galleryLoading && totalRemainingBlogsCount > 0) &&
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
            categoryCount={categoryCount}
            loading={loadingCategory}
            fakeCategories={repeatedCategoriesArray}
            moreLoading={moreLoadingCategory}
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
          uniqueSliderClass="PageArchiveGallery"
        />
        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchiveGallery;
