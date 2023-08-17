import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "app/hooks";
import ModalCategories from "./ModalCategories";
import ModalTags from "./ModalTags";
import { DEMO_POSTS_AUDIO } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import { blogsType  } from '../../Actions/PostAction';
import Card16Podcast from "components/Card16Podcast/Card16Podcast";
import Card15Podcast from "components/Card15Podcast/Card15Podcast";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { allBloggers } from '../../Actions/AuthAction';
import BlogsHelper from './Helper'
import { selectTagLoading } from "app/tag/tagSlice";
import { useAppSelector } from "app/hooks";

export interface PageArchiveAudioProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS_AUDIO.filter((_, i) => i < 12);

const PageArchiveAudio: FC<PageArchiveAudioProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch()
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[1];
  const { CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const [audioBlogs, setAudioBlogs] = useState<PostDataType[] | null>(null);
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [totalRemainingBlogsCount, setTotalRemainingBlogsCount] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);
  const [morePostLoading, setMorePostLoading] = useState(false);
  const [filter, setFilter] = useState({skip: 0, limit: 2, postType: 'audio'});
  const [categoryFilter, setCategoryFilter] = useState({skip: 0, limit: 6,});
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [users, setUsers] = useState(null);
  const [tags, setTags] = useState(null);
  const tagLoading = useAppSelector(selectTagLoading)

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

  useEffect(()=>{
    TagWithTotalBlogs({skip: 0, limit: 20}).then((res:any)=> {
      setTags(res.tags)
    })
    setFilter({skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'audio'})
    setAudioLoading(true)
    dispatch(blogsType(filter)).then((res: any) => {
      setAudioBlogs(res.blogs)
      setAudioLoading(false)
      setTotalBlogsCount(res.size)
      setTotalRemainingBlogsCount(res.remainingBlogs)
    }).catch(() => setAudioLoading(false))

    dispatch(allBloggers(filter)).then((res: any) => {
      setLoadingCategory(false)
      setUsers(res)
    }).catch(()=> setLoadingCategory(false))

    setLoadingCategory(true)
    CategoryWithTotalBlogs(categoryFilter).then((res: any)=> {
      setCategoryFilter({skip: categoryFilter.skip + 6, limit: categoryFilter.limit})
      if(res)
        setCategories(res.categories)
    })
  },[])

  const loadMore = () => {
    setMorePostLoading(true)
    let count = {skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'audio'}
    dispatch(blogsType(filter)).then((res: any) => {
      setFilter(count)
      setMorePostLoading(false)
      setTotalBlogsCount(res.size)
      setTotalRemainingBlogsCount(res.remainingBlogs)
      let newArray = audioBlogs?.concat(res.blogs)
      if(newArray)
        setAudioBlogs(newArray);
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
      if(res.length){
        let newArray = categories?.concat(res)
        if(newArray)
          setCategories(newArray)
      }
    }).catch(()=> setMoreLoadingCategory(false))
  }

  const renderSection = (sectionPosts: PostDataType[]) => {
    const loopPosts = sectionPosts.filter((_, i) => i > 2);
    console.log(loopPosts,'loopPostsloopPosts')
    return (
      <div className="mt-8 lg:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {sectionPosts[0] && <Card16Podcast post={sectionPosts[0]} />}
        {sectionPosts[1] && <Card16Podcast post={sectionPosts[1]} />}
        {sectionPosts[2] && <Card16Podcast post={sectionPosts[2]} />}
        <div className="md:col-span-2 lg:col-span-3">
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`}>
            {loopPosts.map((p: any) => (
              <Card15Podcast key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PageArchiveAudio overflow-hidden ${className}`}
      data-nc-id="PageArchiveAudio"
    >
      <Helmet>
        <title>Archive || Blog Magazine React Template</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
              {PAGE_DATA.name}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {totalBlogsCount} Audio articles
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
              <ModalTags tags={tags || DEMO_TAGS} loading={tagLoading} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          {renderSection((audioBlogs || posts).filter((_, i) => i < 19))}

          {/* PAGINATIONS */}
          { (!audioLoading && totalRemainingBlogsCount > 0) &&
           <div className="text-center mx-auto mt-10 md:mt-16">
             <ButtonPrimary onClick={()=> loadMore()}>
               { morePostLoading &&
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               }
               Show me more
             </ButtonPrimary>
           </div>}
        </div>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={categories || DEMO_CATEGORIES.filter((_, i) => i < 10)}
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

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={users || DEMO_AUTHORS.filter((_, i) => i < 10)}
          uniqueSliderClass="PageArchiveAudio"
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchiveAudio;
