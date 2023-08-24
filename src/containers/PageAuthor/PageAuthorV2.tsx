import React, { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useParams } from "react-router-dom";
import { DEMO_POSTS } from "data/posts";
import { PostAuthorType, PostDataType, FakeAuthorType, TaxonomyType } from "data/types";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { DEMO_AUTHORS, DEMO_FAKE_SKELETON_USERS } from "data/authors";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Avatar from "components/Avatar/Avatar";
import SocialsList from "components/SocialsList/SocialsList";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "components/Card11/Card11";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import { DEMO_CATEGORIES, DEMO_FAKE_POST_DATA, DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { fetchUserPublicBlogs, fetchUserBlogs } from '../../Actions/PostAction';
import { selectBlogLoading } from "app/blog/blogSlice";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { allBloggers } from '../../Actions/AuthAction';
import useUserDetail from "hooks/useUserDetail";
const APP_NAME: string = import.meta.env.VITE_APP_NAME;

export interface PageAuthorV2Props {
  className?: string;
}
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const AUTHOR: PostAuthorType = DEMO_AUTHORS[0];

const FAKE_AUTHOR: PostAuthorType = DEMO_FAKE_SKELETON_USERS[0];
const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];
interface RouteParams {
  id: string;
}
const PageAuthorV2: FC<PageAuthorV2Props> = ({ className = "" }) => {
  const completeUrl = window.location.href;
  const {id} = useParams<RouteParams>();
  const TABS = ["Articles", !id && "Favorites", !id && "Saved"].filter(Boolean);;
  const [tabActive, setTabActive] = useState<any>(TABS[0]);
  const [users, setUsers] = useState(null);
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectBlogLoading)
  const [filter, setFilter] = useState({limit: 2, skip: 0});
  const initialFilter = {limit: 2, skip: 0};
  const [blogs, setBlogs] = useState<PostDataType[] | null>(null);
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [totalRemainingBlogsCount, setTotalRemainingBlogsCount] = useState(0);
  const [user, setUser] = useState<PostAuthorType | null>(null);
  const [morePostLoading, setMorePostLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState({limit: 2, skip: 0});
   const initialFilterCategory = {limit: 2, skip: 0};
  const [categories, setCategories] =useState<TaxonomyType[] | null>(null);
  const [remainingCategoryCount, setRemainingCategoryCount] = useState(0);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [moreLoadingCategory, setMoreLoadingCategory] = useState(false);
  const profile = useUserDetail();
  const profileId = profile ? profile._id : {};

  const fakePosts = Array.from({ length: filter.limit }, (_, index) =>
    DEMO_FAKE_POST_DATA.map((item: any) => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  const repeatedCategoriesArray = Array.from({ length: filterCategory.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map((item: any) => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  const handleClickTab = (item: any) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  useEffect(() => {
    setFilter({skip: initialFilter.limit+ initialFilter.skip, limit: initialFilter.limit})
      if( tabActive === 'Articles' ){
        {
          id ?
            dispatch(fetchUserPublicBlogs(id, initialFilter)).then((res: any) => {
              setTotalBlogsCount(res.total)
              setTotalRemainingBlogsCount(res.remainingBlogs)
              const {user, blogs} = res
              setUser(user)
              setBlogs(blogs)  
            })
          : profileId &&
            dispatch(fetchUserBlogs(profileId, initialFilter)).then((res: any) => {
              setTotalBlogsCount(res.total)
              setTotalRemainingBlogsCount(res.remainingBlogs)
              const {user, blogs} = res
              setUser(profile)
              setBlogs(blogs)  
            })
        }
      }
      else if( tabActive === 'Favorites' ){
        const profileFilter = {...initialFilter, blogType: tabActive}
        profileId &&
          dispatch(fetchUserBlogs(profileId, profileFilter)).then((res: any) => {
            setTotalBlogsCount(res.total)
            setTotalRemainingBlogsCount(res.remainingBlogs)
            const {user, blogs} = res
            setUser(profile)
            setBlogs(blogs)  
          })
      }
      else if( tabActive === 'Saved' ){
        const profileFilter = {...initialFilter, blogType: tabActive}
        profileId &&
          dispatch(fetchUserBlogs(profileId, profileFilter)).then((res: any) => {
            setTotalBlogsCount(res.total)
            setTotalRemainingBlogsCount(res.remainingBlogs)
            const {user, blogs} = res
            setUser(profile)
            setBlogs(blogs)  
          })
      }
    }, [tabActive, id, profileId])

  const loadMore = () => {
    setMorePostLoading(true)
    let profileFilter: any = filter
    if( tabActive === 'Saved' || tabActive === 'Favorites' )
    {
       profileFilter = {...filter, blogType: tabActive}
    }
    let count = {limit: filter.limit, skip: filter.skip + filter.limit}
    {
        id ?
          dispatch(fetchUserPublicBlogs( id,filter )).then((res: any) => {
            setFilter(count)
            setTotalBlogsCount(res.total)
            setTotalRemainingBlogsCount(res.remainingBlogs)
            setMorePostLoading(false)
            let newArray = blogs?.concat(res.blogs)
            if(newArray)
              setBlogs(newArray);
          }).catch(() => {
            setMorePostLoading(false)
          })
        : profileId &&
        dispatch(fetchUserBlogs(profileId, profileFilter)).then((res: any) => {
          setMorePostLoading(false)
          setTotalBlogsCount(res.total)
          setTotalRemainingBlogsCount(res.remainingBlogs)
          setFilter(count)
          let newArray = blogs?.concat(res.blogs)
            if(newArray)
              setBlogs(newArray);  
        }).catch(() => {
          setMorePostLoading(false)
        })
    }
  }

  const loadMoreCategory = () => {
    setMoreLoadingCategory(true)
    let count = {limit: filterCategory.limit, skip: filterCategory.skip + filterCategory.limit}
    dispatch(categoryWithTotalBlogs(filterCategory)).then((res: any)=> {
      setFilterCategory(count)
      setMoreLoadingCategory(false)
      setRemainingCategoryCount(res.remainingCategories)
      setFilterCategory(count)
      if(res){
        let newArray = categories?.concat(res.categories)
        if(newArray)
          setCategories(newArray)
      }
    }).catch(()=> setMoreLoadingCategory(false))
  }

  useEffect(() => {
     dispatch(allBloggers(filter)).then((res: any) => {
      setUsers(res)
    })
    if(!user){
      setUser(FAKE_AUTHOR)
    }
  },[])

  useEffect(()=>{
    if(!categories){
      setLoadingCategory(true)
      let countCategory = {limit: initialFilterCategory.limit, skip: initialFilterCategory.skip + initialFilterCategory.limit}
      dispatch(categoryWithTotalBlogs(initialFilterCategory)).then((res: any) => {
        setFilterCategory(countCategory)
        setRemainingCategoryCount(res.remainingCategories)
        setLoadingCategory(false)
        setCategories(res.categories)
      }).catch(()=> setLoadingCategory(false))
    }
  },[categories])
  return (
    <div className={`nc-PageAuthorV2  ${className}`} data-nc-id="PageAuthorV2">
      <Helmet>
        <title>{APP_NAME} News</title>
        <meta property='og:title' content={`${APP_NAME} News`} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={completeUrl} />
        <meta property='og:site_name' content={APP_NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-DNS-Prefetch-Control" content="on" />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        {/*Twitter*/} 
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={completeUrl} />
        <meta property="twitter:title" content={`${APP_NAME}`} />
        <meta property="fb:app_id" content="806413737804011" /> 
      </Helmet>
      <HeadBackgroundCommon className="h-24 2xl:h-28" />
      {
        user &&
        <div className="container">
          <header className="max-w-xl mx-auto -mt-10 flex flex-col items-center justify-center text-center lg:-mt-14">
            <Avatar
              containerClassName="ring-4 ring-white dark:ring-0 shadow-2xl"
              imgUrl={user.pic || ''}
              sizeClass="w-20 h-20 text-lg lg:w-28 lg:h-28 lg:text-xl"
              radius="rounded-3xl"
            />
            {
              user.firstName ?
              <h2 className="block align-middle mt-4 font-semibold text-2xl text-neutral-900 lg:text-3xl dark:text-neutral-100">
                {`${user.firstName} ${user.lastName}`}
              </h2>
              : loading &&
              <h2 className="block align-middle mt-4 font-semibold text-2xl text-neutral-900 lg:text-3xl dark:text-neutral-100">
                <SkeletonTheme baseColor="#d1d1d1" highlightColor="#dddddd">
                  <Skeleton height={ 23 } width={ 97 }  />
                </SkeletonTheme>
              </h2>
            }
            {
              (user.about || profile && (profile.jobName)) ?
              <span className="mt-2 block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                {user.about || (profile ? profile.jobName : '')}
              </span>
              : loading &&
              <span className="mt-2 block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                <SkeletonTheme baseColor="#d1d1d1" highlightColor="#dddddd">
                  <Skeleton width={ 197 }  />
                </SkeletonTheme>
              </span>
            }
            <SocialsList className="mt-3" />
          </header>
        </div>
      }
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          {
            
            <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
              <Nav className="sm:space-x-2">
                {TABS.map((item, index) => (
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
          }

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            { (blogs || fakePosts).map((post: any) => (
              <Card11 key={post._id} post={post} />
            ))}
          </div>

          {/* PAGINATION */}
          {
            ( totalRemainingBlogsCount > 0) &&
            <div className="text-center mx-auto mt-10 md:mt-16">
              <ButtonPrimary onClick={()=> loadMore()}>
                { morePostLoading &&
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                }
                Show me more
              </ButtonPrimary>
            </div>
          }
        </main>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          {
            <SectionGridCategoryBox
              categories={categories || repeatedCategoriesArray}
              loading={loadingCategory}
              moreLoading={moreLoadingCategory}
              fakeCategories={repeatedCategoriesArray}
            />
          }
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
          uniqueSliderClass="PageAuthorV2"
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAuthorV2;
