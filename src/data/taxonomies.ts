import __taxonomies from "./jsons/__taxonomies.json";
import { TaxonomyType, FakePostType, FakeCategoryType } from "./types";
import __postFakeSkeletonData from "./jsons/__postFakeSkeletonData.json";
import __categoriesSkeleton from "./jsons/__categoriesSkeleton.json";

const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
}));

const DEMO_FAKE_POST_DATA: FakePostType[] = __postFakeSkeletonData.map((item) => ({
  ...item,
  taxonomy: "category",
})); 

const DEMO_FAKE_CATEGORY_DATA: FakeCategoryType[] = __categoriesSkeleton.map((item) => ({
  ...item,
  taxonomy: "category", 
}));

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "tag",
}));

export { DEMO_CATEGORIES, DEMO_TAGS, DEMO_FAKE_POST_DATA, DEMO_FAKE_CATEGORY_DATA };
