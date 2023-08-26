import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
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
import ConfirmLink from "containers/PageForgotPass/ConfirmLink";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";
import PageDashboard from "containers/PageDashboard/PageDashboard";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";

import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
import PageSearchV2 from "containers/PageSearch/PageSearchV2";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageSingleVideo from "containers/PageSingleVideo/PageSingleVideo";
import PageArchiveVideo from "containers/PageArchive/PageArchiveVideo";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
import PageArchiveGallery from "containers/PageArchive/PageArchiveGallery";
import PageHomeDemo6 from "containers/PageHome/PageHomeDemo6";
import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import isSafariBrowser from "utils/isSafariBrowser";
import PageSingleTemp4Sidebar from "containers/PageSingle/PageSingleTemp4Sidebar";
import Cookies from "containers/OtherPages/Cookies";
import PrivacyPage from "containers/OtherPages/PrivacyPage";
import TermsAndCondition from "containers/OtherPages/TermsAndCondition";
import axios from 'axios';
import useUserDetail from "hooks/useUserDetail";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHomeDemo6, isAuth: false },
  { path: "/#", exact: true, component: PageHomeDemo6, isAuth: false },
  //

  { path: "/blogs", exact: true, component: PageArchive, isAuth: false },
  { path: "/blog/:slug", component: PageSingleTemp3Sidebar, isAuth: false },
  { path: "/blog-view/:slug", component: PageSingleTemplate3, isAuth: false },
  { path: "/blogs/:slug/:blogtype", exact: true, component: PageArchive, isAuth: false },
  { path: "/search/:slug", component: PageSearchV2, isAuth: false },
  //
  { path: "/blogs-audio", exact: true, component: PageArchiveAudio, isAuth: false },
  { path: "/blogs-audio/:slug/:blogtype", component: PageArchiveAudio, isAuth: false }, 
  { path: "/blog-audio/:slug", component: PageSingleAudio, isAuth: false },
  //
  { path: "/blogs-video", exact: true, component: PageArchiveVideo, isAuth: false },
  { path: "/blogs-video/:slug/:blogtype", exact: true, component: PageArchiveVideo, isAuth: false },
  { path: "/blog-video/:slug", component: PageSingleVideo, isAuth: false },
  //
  { path: "/author/:id", component: PageAuthorV2, isAuth: false },
  { path: "/profile", component: PageAuthorV2, isAuth : ['blogger', 'admin', 'user'] },
  //
  { path: "/blogs-gallery", exact: true, component: PageArchiveGallery, isAuth: false },
  { path: "/blogs-gallery/:slug/:blogtype", exact: true, component: PageArchiveGallery, isAuth: false },
  { path: "/blog-gallery/:slug", exact: true, component: PageSingleGallery, isAuth: false },
  //
  { path: "/contact", component: PageContact, isAuth: false },
  { path: "/thanks", component: PageThanks, isAuth: false },
  { path: "/about", component: PageAbout, isAuth: false },
   //
  { path: "/login", component: PageLogin, isAuth: false },
  { path: "/signup", component: PageSignUp, isAuth: false },
  { path: "/blogger-signup", component: PageBloggerSignUp, isAuth: false  },
  { path: "/forgot-pass", component: PageForgotPass, isAuth: false  },
  { path: "/confirmation-link", component: ConfirmLink, isAuth: false  },
 //
  { path: "/Cookies", component: Cookies, isAuth: false },
  { path: "/privacy-policy", component: PrivacyPage, isAuth: false },
  { path: "/terms-and-condition", component: TermsAndCondition, isAuth: false },
  //
  { path: "/dashboard", component: PageDashboard, isAuth : ['blogger', 'admin'] },
  { path: "/setting", component: PageDashboard, isAuth : ['user'] },

];


const Routes = () => {
  const user = useUserDetail();
  return (
    <BrowserRouter
      basename={
        import.meta.env.VITE_LRT_OR_RTL === "rtl" ? "/" : "/"
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
  );
};

export default Routes;
