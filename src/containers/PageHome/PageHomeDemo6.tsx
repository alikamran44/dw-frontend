
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Helmet } from "react-helmet";
import { DEMO_POSTS_NEWS, DEMO_POSTS_AUDIO, DEMO_POSTS_GALLERY,
DEMO_POSTS_VIDEO } from "data/posts";
import { DEMO_AUTHORS } from "data/authors";
import { DEMO_CATEGORIES, DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
import SectionAds from "./SectionAds";
import SectionMagazine2 from "./SectionMagazine2";
import SectionMagazine10 from "./SectionMagazine10";
import SectionMagazine9 from "./SectionMagazine9";
import SectionMagazine11 from "./SectionMagazine11";
import imgAds from "images/ads2.png"; 
import SectionLatestPosts from "./SectionLatestPosts";
import { selectCategoryLoading } from "app/category/categorySlice";
import { selectTagLoading } from "app/tag/tagSlice";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { tagWithTotalBlogs } from '../../Actions/TagAction';
import { allBloggers } from '../../Actions/AuthAction';
import { blogsType, FetchRecentPosts  } from '../../Actions/PostAction';
import SectionMagazine7 from "./SectionMagazine7";
import SectionGridPosts from "./SectionGridPosts";
import { PostDataType, TaxonomyType, PostAuthorType } from "data/types";

//
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = DEMO_POSTS_NEWS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS_NEWS.filter((_, i) => i >= 0 && i < 7);

const authorsDemo: PostAuthorType[] = DEMO_AUTHORS.filter((_, i) => i < 5);
//
const repeatedCategoriesArray = Array.from({ length: 5 }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

const repeatedTagsArray = Array.from({ length: 20 }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

const PageHomeDemo6: React.FC = () => {
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const categoryLoading = useAppSelector(selectCategoryLoading)

  const [mainBlogs, setMainBlogs] = useState<PostDataType[] | null>(null);
  const [mainLoading, setMainLoading] = useState(true);

  const [audioBlogs, setAudioBlogs] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);

  const [videoBlogs, setVideoBlogs] = useState<PostDataType[] | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);

  const [galleryBlogs, setGalleryBlogs] = useState<PostDataType[] | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(true);

  const [recentBlogs, setRecentBlogs] = useState<PostDataType[] | null>(null);
  const [recentLoading, setRecentLoading] = useState(true);

  const [users, setUsers] = useState(null);


  // const [categoryFilter, setCategoryFilter] = useState({skip: 0, limit: 5});
  const [tags, setTags] = useState<TaxonomyType[] | null>(null);
  const tagLoading = useAppSelector(selectTagLoading)
  // const [tagFilter, setTagFilter] = useState({skip: 0, limit: 20});
  const dispatch = useAppDispatch()

  useEffect(() => {
    let dataMain = {skip: 0, limit: 4}
    setMainLoading(true)
    dispatch(blogsType(dataMain)).then((res) => {
      setMainBlogs(res)
      setMainLoading(false)
    }).catch(() => setMainLoading(false))

    let dataAudio = {skip: 0, limit: 9, postType: 'audio'}
    setAudioLoading(true)
    dispatch(blogsType(dataAudio)).then((res) => {
      setAudioBlogs(res)
      setAudioLoading(false)
    }).catch(() => setAudioLoading(false))

    let dataVideo = {skip: 0, limit: 6, postType: 'video'}
    setVideoLoading(true)
    dispatch(blogsType(dataVideo)).then((res) => {
      setVideoBlogs(res)
      setVideoLoading(false)
    }).catch(() => setVideoLoading(false))

    let dataGallery = {skip: 0, limit: 6, postType: 'gallery'}
    setGalleryLoading(true)
    dispatch(blogsType(dataGallery)).then((res) => {
      setGalleryBlogs(res)
      setGalleryLoading(false)
    }).catch(() => setGalleryLoading(false))

    setRecentLoading(true)
    //later
    let dataRecent = {skip: 0, limit: 10}
    dispatch(FetchRecentPosts(dataRecent)).then((res) => {
      setRecentBlogs(res)
      setRecentLoading(false)
    }).catch(() => setRecentLoading(false))

    dispatch(categoryWithTotalBlogs({skip: 0, limit: 5})).then((res) => {
      setCategories(res)
    })
    dispatch(tagWithTotalBlogs({skip: 0, limit: 20})).then((res)=> {
      setTags(res)
    })

    dispatch(allBloggers({skip: 0, limit: 5})).then((res) => {
      setUsers(res)
    })

    const $body = document.querySelector("body");
    if ($body) {
      $body.className = "theme-demo-6 ";
    }
    return () => {
      if ($body) {
        $body.className = "";
      }
    };
  }, []);

  useEffect(()=>{
    if(!categories){
      setCategories(repeatedCategoriesArray)
    }
    if(!tags){
      setTags(repeatedTagsArray)
    }
  },[categoryLoading, tags])

  return (
    <div className="nc-PageHomeDemo6 relative [ nc-section-rounded-md ]">
      <Helmet>
        <title>Home || Blog Magazine React Template</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      {/* ======== ALL SECTIONS ======== */}


      <div className="relative overflow-hidden">
        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          <SectionMagazine10 tabs={[]} heading="" posts={mainBlogs || MAGAZINE1_POSTS} />
          {/* === SECTION 9 === */}
            <SectionMagazine9
              href={'/blogs-audio'}
              className="pt-16 lg:pt-24"
              posts={audioBlogs || DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 16)}
            />
          {/* === SECTION 3 === */}
          <SectionAds imgAds={imgAds} className="pt-16 lg:pt-24" />
          <SectionGridPosts
            headingIsCenter
            className="pt-16 lg:pt-24"
            href={'/blogs-video'}
            postCardName="card10V2"
            heading="Explore latest video articles"
            subHeading="Hover on the post card and preview video 🥡"
            posts={videoBlogs || DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
            gridClass="sm:grid-cols-2 lg:grid-cols-3"
          />
          {/* === SECTION 11 === */}
          <SectionMagazine7 
            className="py-16 lg:py-28"
            href={'/blogs-gallery'}
            posts={galleryBlogs || DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
          />
        </div>

        {/* === SECTION 11 === */}

        <div className="nc-PageHomeDemo3 overflow-hidden relative">
          <div className="container relative">{
            categories &&
            <SectionLatestPosts
              posts={recentBlogs || DEMO_POSTS_NEWS.filter((_, i) => i > 7 && i < 18)}
              widgetPosts={recentBlogs?.filter((_, i) : any => i > 2 && i < 7) || DEMO_POSTS_NEWS.filter((_, i) => i > 2 && i < 7)}
              categories={categories}
              categoryLoading={categoryLoading}
              tagLoading={tagLoading}
              tags={tags || []}
              authors = { users || authorsDemo}
              href={'/blogs'}
              postCardName="card7"
              gridClass="sm:grid-cols-2"
              className={`${( (galleryBlogs && !galleryBlogs.length)) ? "pt-16 lg:pt-24" : '' } pb-16 lg:pb-28`}
            />
          }
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PageHomeDemo6;
