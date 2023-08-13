import { DEMO_TAGS } from "./taxonomies";
import __comments from "./jsons/__comments.json";
import a10 from "./avatars/11.jpg";
import { DEMO_AUTHORS } from "./authors";
import { CommentType } from "components/CommentCard/CommentCard";
import podcastImg from "images/podcast.jpg";
import { PostDataType } from "./types";

// function nested the comment child -- make tree comment
const nest = (
  items: CommentType[],
  id: number | null | undefined
): CommentType[] => {
  return items
    .filter((item) => item.parentId === id)
    .map((item) => ({
      ...item,
      children: nest(items, item.id as number | null),
    }));
};

// AUTHOR RANDOM FOR DEMO
const commentHasAuthor = __comments.map((item) => ({
  ...item,
  author: DEMO_AUTHORS[Math.floor(Math.random() * 10)],
}));

export const FAKE_SINGLE_POST: PostDataType = {
  _id: "",
  featuredImage: "",
  title: "",
  desc: "",
  date: "",
  href: "",
  commentCount: null,
  viewdCount: null,
  readingTime: null,
  bookmark: { count: null, isBookmarked: false },
  like: { count: null, isLiked: false },
  postedBy: {
    _id: null,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    pic: '',
    count: null,
    about: "",
    jobName: "",
  },
  categories: [
    {
      _id: null,
      name: "",
      href: "",
      thumbnail: "",
      count: null,
      color: "",
      taxonomy: null,
    },
  ],
  postType: null,
  tags: [],
  content: "",
  comments: [],
};

//
export const DEMO_COMMENTS = nest(commentHasAuthor, null);
export const SINGLE: PostDataType = {
  id: "eae0212192f63287e0c212",
  featuredImage:
    "",
  title: "",
  desc: "",
  date: "",
  href: "",
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    avatar: a10,
    count: 38,
    href: "",
    desc: "",
    jobName: "",
  },
  categories: [
    {
      id: 1,
      name: "",
      href: "",
      thumbnail:
        "",
      count: 13,
      color: "pink",
      taxonomy: "category",
    },
    {
      id: 2,
      name: "",
      href: "",
      thumbnail:
        "",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "standard",
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};

export const SINGLE_AUDIO: PostDataType = {
  id: "ea21212f687e0c",
  featuredImage: podcastImg,
  title: "",
  desc: "",
  date: "",
  href: "",
  commentCount: null,
  viewdCount: null,
  readingTime: null,
  bookmark: { count: null, isBookmarked: false },
  like: { count: null, isLiked: true },
  author: {
    id: 10,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    avatar: a10,
    count: null,
    href: "",
    desc: "",
    jobName: "",
  },
  categories: [
    {
      id: 2,
      name: "",
      href: "",
      thumbnail:
        "",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "audio",
  audioUrl: "",
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};

export const SINGLE_VIDEO: PostDataType = {
  id: "ea21ac32ds-6c192f68dscx7e0c212",
  featuredImage:
    "",
  title: "",
  desc: "",
  date: "",
  href: "",
  commentCount: null,
  viewdCount: null,
  readingTime: null,
  bookmark: { count: null, isBookmarked: false },
  like: { count: null, isLiked: true },
  author: {
    id: 10,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    avatar: a10,
    count: null,
    href: "",
    desc: "",
    jobName: "",
  },
  categories: [
    {
      id: 2,
      name: "",
      href: "",
      thumbnail:
        "",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "video",
  videoUrl: "",
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};

export const SINGLE_GALLERY: PostDataType = {
  id: "eae0e85fd226c192f68dscx7e220c",
  featuredImage:
    "",
  title: "",
  desc: "",
  date: "",
  href: "",
  commentCount: null,
  viewdCount: null,
  readingTime: null,
  bookmark: { count: null, isBookmarked: false },
  like: { count: null, isLiked: true },
  author: {
    id: 10,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    avatar: a10,
    count: 38,
    href: "",
    desc: "",
    jobName: "",
  },
  categories: [
    {
      id: 2,
      name: "",
      href: "",
      thumbnail:
        "",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "gallery",
  galleryImgs: [
    "",
    "",
    "",
    "",
    "",
  ],
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};
