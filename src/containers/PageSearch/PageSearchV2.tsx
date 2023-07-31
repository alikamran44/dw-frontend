import React, { FC, useState, useEffect } from "react";
import { DEMO_POSTS } from "data/posts";
import { Formik, Form } from 'formik';
import { useHistory  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useParams } from "react-router-dom";
import { PostDataType, TaxonomyType } from "data/types";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import Input from "components/Input/Input";
import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import { DEMO_CATEGORIES } from "data/taxonomies";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import Card11 from "components/Card11/Card11";
import CardCategory2 from "components/CardCategory2/CardCategory2";
import Tag from "components/Tag/Tag";
import CardAuthorBox2 from "components/CardAuthorBox2/CardAuthorBox2";
import EmptyCard from "components/EmptyCard/EmptyCard"; 
import { searchBlog } from '../../Actions/PostAction';
import { toatalUserBlogs } from '../../Actions/AuthAction';
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { tagWithTotalBlogs } from '../../Actions/TagAction';
import { DEMO_FAKE_CATEGORY_DATA, DEMO_FAKE_POST_DATA } from "data/taxonomies";

export interface PageSearchV2Props {
  className?: string;
}

const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const cats = DEMO_CATEGORIES.filter((_, i) => i < 15);
const tags = DEMO_CATEGORIES.filter((_, i) => i < 10);
// const authors = DEMO_AUTHORS.filter((_, i) => i < 12);

const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];
const TABS = ["Articles", "Categories", "Tags", "Authors"];
interface RouteParams {
  slug: string;
}
const PageSearchV2: FC<PageSearchV2Props> = ({ className = "" }) => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const {slug} = useParams<RouteParams>();
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [filter, setFilter] = useState({limit: 2, skip: 0, name: slug});
  const [tagFilter, setTagFilter] = useState({limit: 2, skip: 0, slug: slug});
  const [categoryFilter, setCategoryFilter] = useState({limit: 2, skip: 0, slug: slug});
  const [blogs, setBlogs] = useState<any[] | null>(null);
  const [authors, setAuthors] = useState<any[] | null>(null);
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [tags, setTags] = useState<TaxonomyType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);

  const repeatedCategoriesArray = Array.from({ length: categoryFilter.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map((item: any) => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();
  const fakePosts = Array.from({ length: filter.limit }, (_, index) =>
    DEMO_FAKE_POST_DATA.map((item: any) => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  useEffect(() => {
    if(!tags){
      setTags(repeatedCategoriesArray)
    }
    if(!categories){
      setCategories(repeatedCategoriesArray)
    }
    if(!blogs){
      setBlogs(fakePosts)
    }
  },[])

  useEffect(() => {
    if( tabActive === 'Tags' ){
      setLoading(true)
      dispatch(tagWithTotalBlogs(tagFilter)).then((res: any) => {
        console.log(res)
        setLoading(false)
        setTags(res)  
      }).catch(() => setLoading(false))
    }
    else if( tabActive === 'Categories' ){
      setLoading(true)
      dispatch(categoryWithTotalBlogs(categoryFilter)).then((res: any) => {
        console.log(res)
        setLoading(false)
        setCategories(res)  
      }).catch(()=> setLoading(false))
    }
    else if( tabActive === 'Articles' ){
      setLoading(true)
      dispatch(searchBlog(slug, filter)).then((res: any) => {
        setLoading(false)
        setBlogs(res.blogs) 
      }).catch(() => setLoading(false))
    }
    else if( tabActive === 'Authors' ){
      console.log('helllooo')
      setLoading(true)
      dispatch(toatalUserBlogs(filter)).then((res: any) => {
        setLoading(false)
        setAuthors(res) 
      }).catch(() => setLoading(false))
    }
    
  }, [tabActive, slug])

  const loadMore = () => {
    if( tabActive === 'Tags' ){
      setMoreLoading(true)
      let filterData = {...tagFilter, skip: tagFilter.skip+1}
      dispatch(tagWithTotalBlogs(filterData)).then((res: any) => {
        setMoreLoading(false)
        if(res.length > 0){
          setTagFilter({...tagFilter, skip: tagFilter.skip+1})
          setTags(res)  
        }
      }).catch(() => setMoreLoading(false))
    }
    if( tabActive === 'Categories' ){
      setMoreLoading(true)
      dispatch(categoryWithTotalBlogs(categoryFilter)).then((res: any) => {
        console.log(res)
        setMoreLoading(false)
        if(res.length > 0){
          setCategoryFilter({...categoryFilter, skip: categoryFilter.skip+1})
          setCategories(res)  
        }
      }).catch(()=> setMoreLoading(false))
    }
    if( tabActive === 'Articles' ){
      setMoreLoading(true)
      dispatch(searchBlog(slug, filter)).then((res: any) => {
        setMoreLoading(false)
        if(res.length > 0){
          setBlogs(res.blogs) 
        }
      }).catch(() => setMoreLoading(false))
    }
  }

  const submitHandler = (values: any) => {
    history.push(`/search/${values.search}`)
  }

  return (
    <div className={`nc-PageSearchV2 ${className}`} data-nc-id="PageSearchV2">
      <HeadBackgroundCommon className="h-24 2xl:h-28" />
      <Helmet>
        <title>Daily World || Search Page </title>
      </Helmet>
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
         <Formik
            initialValues={{search: ''}}
            onSubmit={submitHandler}
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form className="relative"
              >
                <label 
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">Search all icons</span>
                  <Input
                    values={values['search']} name='search' errors={errors} touched={touched} 
                    setFieldValue={setFieldValue}
                    id="search-input"
                    type="search"
                    placeholder="Type and press enter"
                    className="shadow-lg rounded-xl border-opacity-0"
                    sizeClass="pl-14 py-5 pr-5 md:pl-16"
                    defaultValue={slug}
                  />
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                      ></path>
                    </svg>
                  </span>
                </label>
              </Form>
              )}
            </Formik>
          <span className="block text-sm mt-4 text-neutral-500 dark:text-neutral-300">
            We found{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
              1135
            </strong>{" "}
            results articles for{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
              "{slug}"
            </strong>
          </span>
        </header>
      </div>
      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row ">
            <Nav
              containerClassName="w-full overflow-x-auto hiddenScrollbar"
              className=" sm:space-x-2"
            >
              {TABS.map((item: any, index: any) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          {/* LOOP ITEMS POSTS */}
          {tabActive === "Articles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
              {blogs && (blogs.length ? blogs.map((post: any) => (
                <Card11 key={post._id} loading={loading} post={post} />))
                : <EmptyCard text={'No Article found!'} />)
              }
            </div>
          )}
          {/* LOOP ITEMS CATEGORIES */}
          {tabActive === "Categories" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
              {categories && (categories.length > 0 ? categories.map((cat: any) => (
                <CardCategory2 key={cat._id} loading={loading} taxonomy={cat} />))
                : <EmptyCard text={'No Category found!'} />)
              }
            </div>
          )}
          {/* LOOP ITEMS TAGS */}
          {tabActive === "Tags" && (
            <div className="flex flex-wrap mt-12 ">
              {tags && (tags.length > 0 ? tags.map((tag: any) => (
                <Tag className="mb-3 mr-3" loading={loading} key={tag._id} tag={tag} />))
                : <EmptyCard text={'No Tag found!'} />)
              }
            </div>
          )}
          {/* LOOP ITEMS POSTS */}
          {tabActive === "Authors" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
              {authors && authors.map((author: any) => (
                <CardAuthorBox2 key={author.id} author={author} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
           <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonPrimary onClick={loadMore}>
              { moreLoading &&
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              }
              Show me more
            </ButtonPrimary>
          </div>
        </main>

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageSearchV2;
