import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};

  "/blogs"?: {};
  "/blogs/:slug/:blogtype"?: {};
  "/blog-view/:slug"?: {};
  "/search/:slug"?: {};
  //
  "/blogs-gallery"?: {};
  "/blogs-gallery/:slug/:blogtype"?: {};
  "/blog-gallery/:slug"?: {};
  //
  "/blogs-audio"?: {};
  "/blog-audio/:slug"?: {};
  "/blogs-audio/:slug/:blogtype"?: {};
  //
  "/blog-video/:slug"?: {};
  "/blogs-video"?: {};
  "/blogs-video/:slug/:blogtype"?: {};
  //
  "/blog/:slug"?: {};
  "/author/:id"?: {};
  //
  "/contact"?: {};
  "/thanks"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/blogger-signup"?: {};
  "/confirmation-link"?: {};
  //
  "/Cookies"?: {};
  "/terms-and-condition"?: {};
  "/privacy-policy"?: {};

  "/archive/:slug"?: {};
  "/archive-video/:slug"?: {};
  "/archive-audio/:slug"?: {};
  //
  "/home-header-style2"?: {};
  "/home-header-style2-logedin"?: {};
  //
  "/author-v2/:slug"?: {};
  //
  "/single/:slug"?: {};
  "/single-template-2/:slug"?: {}; 
  "/single-template-3/:slug"?: {};
  "/single-sidebar/:slug"?: {};
  "/single-2-sidebar/:slug"?: {};
  "/single-3-sidebar/:slug"?: {};
  "/single-4-sidebar/:slug"?: {};
  "/single-gallery/:slug"?: {};
  "/single-audio/:slug"?: {};
  "/single-video/:slug"?: {};
  //
  "/search-v2"?: {};
  "/about"?: {};
  "/page404"?: {};
  "/dashboard"?: {};
  "/setting"?: {};
  "/subscription"?: {};
  //
  "/home-demo-6"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  isAuth: any;
  component: ComponentType<Object>;
}
