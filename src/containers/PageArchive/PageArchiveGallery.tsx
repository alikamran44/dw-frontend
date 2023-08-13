import React, { FC, useEffect, useState } from "react";
import ModalCategories from "./ModalCategories";
import { useAppDispatch } from "app/hooks";
import ModalTags from "./ModalTags";
import { DEMO_POSTS_VIDEO, DEMO_POSTS_GALLERY } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types"; 
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
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
import Card10V3 from "components/Card10/Card10V3";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { allBloggers } from '../../Actions/AuthAction';
import BlogsHelper from './Helper'
import { selectTagLoading } from "app/tag/tagSlice";
import { useAppSelector } from "app/hooks";

export interface PageArchiveGalleryProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS_VIDEO.filter((_, i) => i < 12);

// Gallery have same data type - we will use one demo data
const postsDemo: PostDataType[] = DEMO_POSTS_GALLERY.filter(
  (_, i) => i > 7 && i < 17
);


const PageArchiveGallery: FC<PageArchiveGalleryProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch()
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[2];
   const { CategoryWithTotalBlogs, AllBloggers, 
  TagWithTotalBlogs } = BlogsHelper()
  const [galleryBlogs, setGalleryBlogs] = useState<PostDataType[] | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [filter, setFilter] = useState({skip: 0, limit: 6, postType: 'gallery'});
  const [categoryFilter, setCategoryFilter] = useState({skip: 0, limit: 6,});
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
  const [users, setUsers] = useState(null);
  const [morePostLoading, setMorePostLoading] = useState(false);
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
    TagWithTotalBlogs({skip: 0, limit: 20}).then((res: any)=> {
      setTags(res.tags)
    })
    setGalleryLoading(true)
    dispatch(blogsType(filter)).then((res: any) => {
      setFilter({skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'gallery'})
      setGalleryBlogs(res)
      setGalleryLoading(false)
    }).catch(() => setGalleryLoading(false))

    dispatch(allBloggers(filter)).then((res: any) => {
      setUsers(res)
    })

    CategoryWithTotalBlogs(categoryFilter).then((res: any)=> {
      setCategoryFilter({skip: categoryFilter.skip + 6, limit: categoryFilter.limit})
      if(res)
        setCategories(res.categories)
    })
  },[])

  const loadMore = () => {
    setMorePostLoading(true)
    let count = {skip: filter.limit+ filter.skip, limit: filter.limit, postType: 'gallery'}
    dispatch(blogsType(filter)).then((res: any) => {
      setFilter(count)
      setMorePostLoading(false)
      let newArray = galleryBlogs?.concat(res.blogs)
      if(newArray)
        setGalleryBlogs(newArray);
    }).catch(() => {
      setMorePostLoading(false)
    })
  }

  return (
    <div
      className={`nc-PageArchiveGallery overflow-hidden ${className}`}
      data-nc-id="PageArchiveGallery"
    >
      <Helmet>
        <title>Archive || Blog Magazine React Template</title>
      </Helmet>
 
      <div className="bg-neutral-100 dark:bg-black dark:bg-opacity-20">
        <div className="container py-16 lg:py-28 ">
          {/* HEADER */}
          <h2 className="inline-block align-middle text-5xl font-semibold md:text-6xl ">
            {PAGE_DATA.name}
          </h2>
          <span className="block mt-4 text-neutral-900">
            {(galleryBlogs && galleryBlogs.length) || PAGE_DATA.count} Gallery
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8    lg:mt-10"
          >
            {(galleryBlogs || postsDemo).map((post: any) => (
              <Card10V3 key={post._id || post.id} post={post} />  
            ))}
          </div>

          {/* PAGINATIONS */}
         { !galleryLoading &&
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
          uniqueSliderClass="PageArchiveGallery"
        />

        {/* === SECTION 5 === */} 
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={categories || DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div>

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchiveGallery;
