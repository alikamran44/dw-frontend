import React from "react";
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSingle from "containers/PageSingle/PageSingle";
import PageSingleHasSidebar from "containers/PageSingle/PageSingleHasSidebar";
import PageSingleTemplate2 from "containers/PageSingle/PageSingleTemp2";
import PageSingleTemp2Sidebar from "containers/PageSingle/PageSingleTemp2Sidebar";
import PageSingleTemplate3 from "containers/PageSingle/PageSingleTemp3";
import PageSingleTemp3Sidebar from "containers/PageSingle/PageSingleTemp3Sidebar";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageThanks from "containers/PageContact/PageThanks";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageBloggerSignUp from "containers/PageSignUp/PageBloggerSignUp";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";
import ConfirmLink from "containers/PageForgotPass/ConfirmLink";
import PageDashboard from "containers/PageDashboard/PageDashboard";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import isSafariBrowser from "utils/isSafariBrowser";
import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageSingleVideo from "containers/PageSingleVideo/PageSingleVideo";
import PageArchiveVideo from "containers/PageArchive/PageArchiveVideo";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
import PageArchiveGallery from "containers/PageArchive/PageArchiveGallery";
import PageHome from "containers/PageHome/PageHome";
import PageHomeDemo2 from "containers/PageHome/PageHomeDemo2";
import PageHomeDemo3 from "containers/PageHome/PageHomeDemo3";
import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
import PageHomeDemo4 from "containers/PageHome/PageHomeDemo4";
import PageSearchV2 from "containers/PageSearch/PageSearchV2";
import PageHomeDemo6 from "containers/PageHome/PageHomeDemo6";
import PageHomeDemo5 from "containers/PageHome/PageHomeDemo5";
import PageHomeDemo7 from "containers/PageHome/PageHomeDemo7";

import Cookies from "containers/OtherPages/Cookies";
import PrivacyPage from "containers/OtherPages/PrivacyPage";
import TermsAndCondition from "containers/OtherPages/TermsAndCondition";

import PageSingleTemp4Sidebar from "containers/PageSingle/PageSingleTemp4Sidebar";
import PrivateRoute from './PrivateRoute';
import { AdminRoute } from './AdminRoute';
import { BloggerRoute } from './BloggerRoute';
import { useAppSelector } from "../app/hooks";
import { selectProfile,  } from "../app/auth/authSlice";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHomeDemo6 },
  { path: "/#", exact: true, component: PageHomeDemo6 },
  //
  { path: "/home-header-style2", exact: true, component: PageHome },
  { path: "/home-header-style2-logedin", exact: true, component: PageHome },
  //
  { path: "/blogs", exact: true, component: PageArchive },
  { path: "/blogs/:slug/:blogType", exact: true, component: PageArchive },
  { path: "/blogs-gallery", exact: true, component: PageArchiveGallery },
  { path: "/blogs-gallery/:slug/:blogtype", exact: true, component: PageArchiveGallery },
  { path: "/blogs/:slug/:blogtype", exact: true, component: PageArchive },
  { path: "/blogs-video", exact: true, component: PageArchiveVideo },
  { path: "/blogs-video/:slug/:blogtype", exact: true, component: PageArchiveVideo },
  { path: "/blogs-audio/:slug/:blogtype", component: PageArchiveAudio },
  { path: "/blogs-audio", component: PageArchiveAudio },
  //
  { path: "/author-v2/:slug", component: PageAuthor },
  { path: "/author/:id", component: PageAuthorV2 },
  //
  { path: "/blog/:slug", component: PageSingleTemp3Sidebar },
  {
    path: "/blog-view/:slug",
    component: PageSingleTemplate3,
  },
  {
    path: "/single-template-2/:slug",
    component: PageSingleTemplate2,
  },
  {
    path: "/single-sidebar/:slug",
    component: PageSingleTemp2Sidebar,
  },
  {
    path: "/single-template-3/:slug",
    component: PageSingle,
  },
  {
    path: "/single-3-sidebar/:slug",
    component: PageSingleHasSidebar,
  },
  {
    path: "/single-4-sidebar/:slug",
    component: PageSingleTemp4Sidebar,
  },
  {
    path: "/blog-gallery/:slug",
    component: PageSingleGallery,
  },
  {
    path: "/blog-audio/:slug",
    component: PageSingleAudio,
  },
  {
    path: "/blog-video/:slug",
    component: PageSingleVideo,
  },

  { path: "/search-v2", component: PageSearch },
  { path: "/search/:slug", component: PageSearchV2 },
  { path: "/about", component: PageAbout },
  { path: "/contact", component: PageContact },
  { path: "/thanks", component: PageThanks },
  { path: "/page404", component: Page404 },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/blogger-signup", component: PageBloggerSignUp },
  { path: "/forgot-pass", component: PageForgotPass },
  { path: "/confirmation-link", component: ConfirmLink },
  { path: "/dashboard", component: PageDashboard, isAuth : ['blogger', 'admin'] },
  { path: "/subscription", component: PageSubcription },
  //
  { path: "/home-2", component: PageHomeDemo2 },
  { path: "/home-3", component: PageHomeDemo3 },
  { path: "/home-4", component: PageHomeDemo4 },
  { path: "/home-5", component: PageHomeDemo5 },
  { path: "/home-6", component: PageHomeDemo6 },
  { path: "/home-7", component: PageHomeDemo7 },
  //
  { path: "/Cookies", component: Cookies },
  { path: "/privacy-policy", component: PrivacyPage },
  { path: "/terms-and-condition", component: TermsAndCondition },
];

const Routes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo')) || null; 

  return (
    <>

      <BrowserRouter
        basename={
          import.meta.env.VITE_LRT_OR_RTL === "rtl" ? "/ncmaz-rtl" : "/"
        }
      >
        <ScrollToTop />
        <HeaderContainer />
        <Switch>
          {pages.map(({ component:Component, path, exact, isAuth }) => {
            return (
              <Route
                key={path}
                // component={component}
                render={() => {
                  if(isAuth){
                      if(user){
                        if(isAuth.includes('admin') && user.role === 'admin'){
                          return <Component />;
                        }else if(isAuth.includes('user') && user.role === 'user'){
                          return <Component />;
                        }else if(isAuth.includes('blogger') && user.role === 'blogger'){
                          return <Component />;
                        }
                      }
                      return <Redirect to="/login" />;
                  }
                  return <Component />;
                }}
                exact={exact}
                path={path}
              />
            );
          })}
          <Route component={Page404} />
        </Switch>
        <Footer />
        {/* MEDIA */}

        {/* //is Safari on an apple touch-screen device */}
        {isSafariBrowser() ? (
          <MediaRunningContainerForSafari />
        ) : (
          <MediaRunningContainer />
        )}
      </BrowserRouter>
    </>
  );
};

export default Routes;
