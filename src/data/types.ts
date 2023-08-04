//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
  allowModal?: boolean;
}

//  ##########  TaxonomyType ######## //
export interface TaxonomyType {
  id?: string | number;
  _id?: string | number | null;
  name: string;
  href?: string;
  count?: number | null;
  media?: any;
  thumbnail?: string;
  desc?: string;
  slug?: string;
  tagsCount?: any;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag" | null;
}

// ######### Post Skeleton ########### //
export interface FakePostType {
  _id: string | number;
  name: string | '';
  slug: string | '';
  count?: number | null;
  thumbnail?: string | '';
  desc?: string | '';
  color?: TwMainColor | string | '';
  taxonomy: "category" | "tag";
}

export interface FakeCategoryType {
  _id: string | number;
  name: string | '';
  slug: string | '';
  media?: any;
  taxonomy: "category" | "tag";
}

export interface FakeAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  about: string;
  jobName: string;
}

export interface PostAuthorType {
  id?: string | number;
  _id?: string | number;
  firstName?: string;
  about?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  bgImage?: string;
  pic?: string;
  email?: string;
  count?: number;
  desc?: string;
  jobName: string;
  href?: string;
}


export interface PostDataType {
  id?: string | number;
  _id?: string | number;
  author?: PostAuthorType;
  date: string;
  href?: string;
  content?: string;
  slug?: string;
  url?: string;
  thumbnail?: any;
  fileFolder?: any;
  isSideBar?: any;
  media?: any;
  postedBy?: any;
  categories: TaxonomyType[];
  tags?: TaxonomyType[];
  title: string;
  mdesc?: string;
  mtitle?: string;
  description?: string;
  featuredImage?: string;
  comments?: any;
  desc?: string;
  like: {
    count: number | null;
    isLiked: boolean;
    users?: any;
  };
  bookmark: {
    count: number | null;
    isBookmarked: boolean;
    users?: any;
  };
  commentCount: number | null;
  viewdCount: number | null;
  readingTime: number | null;
  postType: "standard" | "video" | "gallery" | "audio" | null;
  videoUrl?: string;
  audioUrl?: string;
  galleryImgs?: string[];
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}
