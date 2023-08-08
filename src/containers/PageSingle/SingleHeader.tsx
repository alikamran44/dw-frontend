import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import SingleTitle from "./SingleTitle";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";
import { PostDataType, TaxonomyType } from "data/types";
import { useLocation } from "react-router-dom";

 const APP_NAME: string = import.meta.env.VITE_APP_NAME;
export interface SingleHeaderProps {
  pageData: PostDataType;
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
  loading?: boolean;
  fImage?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  loading = false,
  metaActionStyle = "style1",
  fImage,
}) => {
  const location = useLocation();
  const completeUrl = window.location.href;
  function generateKeywordsString(data: any) {
    const names = data.map((item: any) => item.name);
    return names.join(", ");
  }
  const keywords = generateKeywordsString(pageData.tags || []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageData.mtitle}</title>
         <meta name='description' content={pageData.mdesc} />
        <meta 
          property='og:description' content={pageData.mdesc || ''}
        />
        <meta property='og:title' content={`${pageData.mtitle}`} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={completeUrl} />
        <meta property='og:site_name' content={APP_NAME} />
        <link rel='canonical' href={completeUrl} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-DNS-Prefetch-Control" content="on" />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        {/* <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" /> */}
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta property='og:image' content={fImage || ''}
        />
        <meta property='og:image:secure_url' content={fImage || ''} />
        <meta property='og:image:type' content='image/jpeg' />

         {/*Twitter*/} 
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={completeUrl} />
        <meta property="twitter:title" content={`${pageData.mtitle}`} />
        <meta property="twitter:description" content={pageData.mdesc || ''} />
        <meta property="twitter:image" content={fImage || ''} />
         {/*For Facebook Insights */}
        <meta property="fb:app_id" content="806413737804011" />

        {/*For Twitter Analytics*/}
        <meta name="twitter:site" content="@twitter-username" />
      </Helmet>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <CategoryBadgeList itemClass="!px-3" categories={pageData.categories} />
          <SingleTitle loading={loading} mainClass={titleMainClass} title={pageData?.title} />
          {!!pageData.description ? (!hiddenDesc && (
              <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                {pageData?.description}
              </span>))
            : loading &&
              <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                <SkeletonTheme baseColor="#4e4e4e" highlightColor="#706e6e">
                  <Skeleton height={20} width={620}  />
                </SkeletonTheme>
              </span>
          }
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              meta={pageData}
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            />
            <SingleMetaAction2 meta={pageData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
