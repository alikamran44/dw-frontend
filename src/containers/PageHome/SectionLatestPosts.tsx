import React, { FC, useState, useEffect } from "react";
import { FetchCategories } from '../../Actions/CategoryAction';
import Card3 from "components/Card3/Card3";
import Heading from "components/Heading/Heading";
import WidgetTags from "components/WidgetTags/WidgetTags";
import { DEMO_POSTS } from "data/posts";
import { DEMO_CATEGORIES, DEMO_TAGS, DEMO_FAKE_CATEGORY_DATA,
} from "data/taxonomies";
import { PostAuthorType, PostDataType, TaxonomyType, FakeCategoryType } from "data/types";
import WidgetCategories from "components/WidgetCategories/WidgetCategories";
import { DEMO_AUTHORS } from "data/authors";
import WidgetAuthors from "components/WidgetAuthors/WidgetAuthors";
import WidgetPosts from "components/WidgetPosts/WidgetPosts";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Card4 from "components/Card4/Card4";
import Card7 from "components/Card7/Card7";
import Card9 from "components/Card9/Card9";
import Card10 from "components/Card10/Card10";
import Card11 from "components/Card11/Card11";
import Card14 from "components/Card14/Card14";
import EmptyCard from "components/EmptyCard/EmptyCard"; 


// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 17);
const widgetPostsDemo: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i > 2 && i < 7
);
const tagsDemo = DEMO_TAGS.filter((_, i) => i > 5); 
const categoriesFakeData = DEMO_FAKE_CATEGORY_DATA;
const repeatedCategoriesArray = Array.from({ length: 5 }, (_, index) =>
    categoriesFakeData.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

const repeatedTagsArray = Array.from({ length: 20 }, (_, index) =>
    categoriesFakeData.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

const categoriesDemo: TaxonomyType[] = DEMO_CATEGORIES.filter(
  (_, i) => i > 7 && i < 13
);
const authorsDemo: PostAuthorType[] = DEMO_AUTHORS.filter((_, i) => i < 5);

//
export interface SectionLatestPostsProps {
  posts?: PostDataType[];
  widgetPosts?: PostDataType[];
  categories?: TaxonomyType[];
  categoryLoading: boolean;
  tagLoading: boolean;
  tags?: TaxonomyType[];
  authors?: PostAuthorType[];
  gridClass?: string;
  className?: string;
  heading?: string;
  href: string;
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card11"
    | "card14"
    | "emptyCard";
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  posts = postsDemo,
  widgetPosts = widgetPostsDemo,
  categories= repeatedCategoriesArray,
  categoryLoading = false,
  tagLoading = false,
  tags = repeatedTagsArray,
  authors = authorsDemo, 
  postCardName = "card3",
  heading = "Latest Articles 🎈",
  gridClass = "",
  className = "",
  href = '',
}) => {
  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
      case "card3":
        return (
          <Card3
            key={post.id}
            className="p-3 sm:p-5 2xl:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]"
            post={post}
          />
        );
      case "emptyCard":
        return <EmptyCard text={'Nothing we found!'} />;
      case "card4":
        return <Card4 key={post.id} post={post} />;
      case "card7":
        return (
          <Card7 key={post.id || post.id} post={post} ratio="aspect-w-5 aspect-h-5" />
        );
      case "card9":
        return <Card9 key={post.id} post={post} />;
      case "card10":
        return <Card10 key={post.id} post={post} />;
      case "card11":
        return <Card11 key={post.id} post={post} />;
      case "card14":
        return <Card14 key={post.id} post={post} />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
          <Heading href={href} >{heading}</Heading>
          <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
            {posts.map((post) => renderCard(post))}
          </div>
        </div>
        <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
          <WidgetTags tags={tags} loading={tagLoading} />
          <WidgetCategories categories={categories} loading={categoryLoading}  />
          <WidgetAuthors authors={authors} />
          <WidgetPosts posts={widgetPosts} />
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
