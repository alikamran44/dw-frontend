import React, { FC, useState, useEffect } from "react";
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

export interface PageArchiveVideoProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS_VIDEO.filter((_, i) => i < 12);

const PageArchiveVideo: FC<PageArchiveVideoProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch()
  const { CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[2];
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [totalRemainingBlogsCount, setTotalRemainingBlogsCount] = useState(0);
  const [videoBlogs, setVideoBlogs] = useState<PostDataType[] | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [filter, setFilter] = useState({skip: 0, limit: 1, postType: 'video'});
  const [categoryFilter, setCategoryFilter] = useState({skip: 0, limit: 6,});
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [users, setUsers] = useState(null);
  const [morePostLoading, setMorePostLoading] = useState(false);
  const [tags, setTags] = useState(null);
  const tagLoading = useAppSelector(selectTagLoading)
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(true);
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

  useEffect(()=>{
    TagWithTotalBlogs({skip: 0, limit: 20}).then((res: any)=> {
      setTags(res.tags)
    })
    setFilter({skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'video'})
    setVideoLoading(true)
    dispatch(blogsType(filter)).then((res: any) => {
      setVideoLoading(false)
      setTotalBlogsCount(res.size)
      setTotalRemainingBlogsCount(res.remainingBlogs)
      if(res)
        setVideoBlogs(res.blogs)
    }).catch(() => setVideoLoading(false))

    dispatch(allBloggers(filter)).then((res: any) => {
      setUsers(res)
    })

    setLoadingCategory(true)
    CategoryWithTotalBlogs(categoryFilter).then((res: any)=> {
      setLoadingCategory(false)
      setCategoryFilter({skip: categoryFilter.skip + 6, limit: categoryFilter.limit})
      if(res)
        setCategories(res.categories)
    }).catch(()=> setLoadingCategory(false))
  },[])

  const loadMoreCategory = () => {
    setMoreLoadingCategory(true)
    let count = {limit: categoryFilter.limit, skip: categoryFilter.skip + categoryFilter.limit}
    dispatch(categoryWithTotalBlogs(categoryFilter)).then((res: any)=> {
      setMoreLoadingCategory(false)
      setCategoryFilter(count)
      if(res.length){
        let newArray = categories?.concat(res.categories)
        if(newArray)
          setCategories(newArray)
      }
    }).catch(()=> setMoreLoadingCategory(false))
  }

  const loadMore = () => {
    setMorePostLoading(true)
    let count = {skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'video'}
    dispatch(blogsType(filter)).then((res: any) => {
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
      <Helmet>
        <title>Archive || Blog Magazine React Template</title>
      </Helmet>

      <div className="bg-neutral-100 dark:bg-black dark:bg-opacity-20">
        <div className="container py-16 lg:py-28 ">
          {/* HEADER */}
          <span className="block mt-4 text-neutral-900">
            {(totalBlogsCount && totalBlogsCount) || PAGE_DATA.count} Videos
          </span>
          {/* ====================== END HEADER ====================== */}
          <div className="mt-16 flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              <ModalCategories categories={categories || DEMO_CATEGORIES} loading={loadingCategory} />
              <ModalTags tags={tags || DEMO_TAGS} loading={tagLoading} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 lg:mt-10">
            {(videoBlogs || posts ).map((post: any) => (
              <Card10V2 key={post._id || post.id} post={post} />
            ))}
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
      </div>

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={users || DEMO_AUTHORS.filter((_, i) => i < 10)}
          uniqueSliderClass="PageArchiveVideo"
        />

        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={categories || DEMO_CATEGORIES.filter((_, i) => i < 10)}
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

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchiveVideo;
