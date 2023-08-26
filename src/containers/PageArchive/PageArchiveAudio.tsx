import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import ModalCategories from "./ModalCategories";
import ModalTags from "./ModalTags";
import { DEMO_POSTS_AUDIO } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
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
import Header from "./Header";

export interface PageArchiveAudioProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
interface RouteParams {
  slug: string;
  blogtype?: string;
}
const PageArchiveAudio: FC<PageArchiveAudioProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch()
  const {blogtype, slug} = useParams<RouteParams>();
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[1];
  const { CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const [audioBlogs, setAudioBlogs] = useState<PostDataType[] | null>(null);
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [totalRemainingBlogsCount, setTotalRemainingBlogsCount] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);
  const [morePostLoading, setMorePostLoading] = useState(false);
  const initialFilter = {limit: 2, skip: 0};
  const [filter, setFilter] = useState({skip: 0, limit: 2, postType: 'audio'});
  const [users, setUsers] = useState(null);
  const [data, setData] = useState(null);
  
  const initialFilterCategory = {limit: 2, skip: 0};
  const [categoryFilter, setCategoryFilter] = useState({skip: 0, limit: 2,});
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
  const [remainingCategoryCount, setRemainingCategoryCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);

  const initialFilterTags = {limit: 2, skip: 0};
  const [tagFilter, setTagFilter] = useState({skip: 0, limit: 2,});
  const [moreLoadingTag, setMoreLoadingTag] = useState(false);
  const [remainingTagCount, setRemainingTagCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);
  const [tags, setTags] = useState(null);
  const tagLoading = useAppSelector(selectTagLoading)

  const posts: PostDataType[] = DEMO_POSTS_AUDIO.filter((_, i) => i < filter.limit);
  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];
  useEffect(()=>{
    setFilter({skip: initialFilter.limit+ initialFilter.skip, limit: initialFilter.limit, postType: 'audio'})
    const newFilter = {...initialFilter,blogtype: blogtype,slug: slug, postType: 'audio'}
    setAudioLoading(true)
    dispatch(blogsType(newFilter)).then((res: any) => {
      setAudioBlogs(res.blogs)
      setAudioLoading(false)
      setTotalBlogsCount(res.size)
      setTotalRemainingBlogsCount(res.remainingBlogs)
      setData(res.data)
    }).catch(() => setAudioLoading(false))
  },[blogtype,slug])

  useEffect(()=>{
    TagWithTotalBlogs(initialFilterTags).then((res:any)=> {
      let countTag = {limit: initialFilterTags.limit, skip: initialFilterTags.skip + initialFilterTags.limit}
      setTagFilter(countTag)
      setRemainingTagCount(res.remainingTags)
      setTagCount(res.totalTags)
      setTags(res.tags)
    })

    setLoadingCategory(true)
    CategoryWithTotalBlogs(initialFilterCategory).then((res: any)=> {
      let countCategory = {limit: initialFilterCategory.limit, skip: initialFilterCategory.skip + initialFilterCategory.limit}
      setCategoryFilter(countCategory)
      setRemainingCategoryCount(res.remainingCategories)
      setCategoryCount(res.totalCategories)
      if(res)
        setCategories(res.categories)
    })

    dispatch(allBloggers(filter)).then((res: any) => {
      setLoadingCategory(false)
      setUsers(res)
    }).catch(()=> setLoadingCategory(false))
  },[])

  const loadMore = () => {
    setMorePostLoading(true)
    let count = {skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'audio'}
    const newFilter = {...filter,blogtype: blogtype,slug: slug}
    dispatch(blogsType(newFilter)).then((res: any) => {
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
    CategoryWithTotalBlogs(categoryFilter).then((res: any)=> {
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

  const renderSection = (sectionPosts: PostDataType[]) => {
    const loopPosts = sectionPosts.filter((_, i) => i > 2);
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
      {/*<CommonHeader blogs={audioBlogs} />*/}

      {/* HEADER */}
      <Header
        data={data}
        blogs={audioBlogs}
        blogsTotalCount={totalBlogsCount}
        postType={'audio'}
      />
      
    {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              <ModalCategories 
                categories={categories || DEMO_CATEGORIES} 
                loading={loadingCategory} postType={'audio'} 
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
          {renderSection(audioBlogs || posts)}

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
