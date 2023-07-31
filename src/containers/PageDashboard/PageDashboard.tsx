import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { ComponentType, FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { selectProfile,  } from "app/auth/auth";
import DashboardBillingAddress from "./DashboardBillingAddress";
import DashboardEditProfile from "./DashboardEditProfile";
import DashboardPosts from "./DashboardPosts";
import DashboardRoot from "./DashboardRoot";
import DashboardSubcription from "./DashboardSubcription";
import DashboardSubmitPost from "./DashboardSubmitPost";
import DashboardCategories from './DashboardCategories'
import DashboardTags from './DashboardTags'
import DashboardUsers from './DashboardUsers'
import { Helmet } from "react-helmet";

export interface PageDashboardProps {
  className?: string;
}

interface DashboardLocationState {
  "/root"?: {};
  "/posts"?: {};
  "/edit-profile"?: {};
  "/information"?: {};
  "/billing-address"?: {};
  "/submit-post/:currentUrl?/:slug?"?: {};
  "/tags"?: {};
  "/categories"?: {};
  "/users"?: {};
  "/account"?: {};
  "/submit-post/1"?: {};
}

interface DashboardPage {
  sPath: keyof DashboardLocationState;
  exact?: boolean;
  component: ComponentType<Object>;
  emoij: string;
  pageName: string;
  id?: boolean;
  isAuth?: any; 
}

const subPages: DashboardPage[] = [
  {
    sPath: "/root",
    exact: true,
    component: DashboardRoot,
    emoij: "🕹",
    pageName: "Dash board",
    isAuth : ['blogger', 'admin', 'user']
  },
  {
    exact: true,
    sPath: "/posts",
    component: DashboardPosts,
    emoij: "📕",
    pageName: "Posts",
    // isAuth : ['blogger', 'admin']
  },
  {
    exact:true,
    sPath: "/edit-profile",
    component: DashboardEditProfile,
    emoij: "🛠",
    pageName: "Edit profile",
    isAuth : ['blogger', 'admin', 'user']
  },
  {
    exact:true,
    sPath: "/information",
    component: DashboardSubcription,
    emoij: "📃",
    pageName: "Personal Information",
  },
  // {
  //   exact:true,
  //   sPath: "/billing-address",
  //   component: DashboardBillingAddress,
  //   emoij: "✈",
  //   pageName: "Billing address",
  // },
  {
    exact:true,
    sPath: "/submit-post/1",
    component: DashboardSubmitPost,
    emoij: "✍",
    pageName: "Submit post",
    isAuth : ['blogger', 'admin']
  },
  {
    exact:true,
    sPath: "/users",
    component: DashboardUsers,
    emoij: "🧑🏻",
    pageName: "Users",
    isAuth : ['admin']
  },
  {
    exact:true,
    sPath: "/categories",
    component: DashboardCategories,
    emoij: "✨",
    pageName: "Categories",
    isAuth : ['admin']
  },
  {
    exact:true,
    sPath: "/tags",
    component: DashboardTags,
    emoij: "🏷",
    pageName: "Tags",
    isAuth : ['admin'],
  },
];

const subPagesRoutes: DashboardPage[] = [
  {
    sPath: "/root",
    exact: true,
    component: DashboardRoot,
    emoij: "🕹",
    pageName: "Dash board",
    isAuth : ['blogger', 'admin', 'user']
  },
  {
    exact: true,
    sPath: "/posts",
    component: DashboardPosts,
    emoij: "📕",
    pageName: "Posts",
    // isAuth : ['blogger', 'admin']
  },
  {
    exact:true,
    sPath: "/edit-profile",
    component: DashboardEditProfile,
    emoij: "🛠",
    pageName: "Edit profile",
    isAuth : ['blogger', 'admin', 'user']
  },
  {
    exact:true,
    sPath: "/information",
    component: DashboardSubcription,
    emoij: "📃",
    pageName: "Personal Information",
  },
  // {
  //   exact:true,
  //   sPath: "/billing-address",
  //   component: DashboardBillingAddress,
  //   emoij: "✈",
  //   pageName: "Billing address",
  // },
  {
    exact:true,
    sPath: "/submit-post/:currentUrl?/:slug?",
    component: DashboardSubmitPost,
    emoij: "✍",
    pageName: "Submit post",
    isAuth : ['blogger', 'admin']
  },
  {
    exact:true,
    sPath: "/users",
    component: DashboardUsers,
    emoij: "🧑🏻",
    pageName: "Users",
    isAuth : ['admin']
  },
  {
    exact:true,
    sPath: "/categories",
    component: DashboardCategories,
    emoij: "✨",
    pageName: "Categories",
    isAuth : ['admin']
  },
  {
    exact:true,
    sPath: "/tags",
    component: DashboardTags,
    emoij: "🏷",
    pageName: "Tags",
    isAuth : ['admin'],
  },
];


const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  let { path, url } = useRouteMatch();
  interface UserInfo {
    name: string;
    email: string;
    role: string;
    _id: string;
  }
  const userInfoString = localStorage.getItem('userInfo');
  const user: UserInfo | null = (userInfoString && JSON.parse(userInfoString)) || null;
  
  const filteredSubPages = subPages.filter(({ isAuth }) => {
    if (isAuth) {
      return (isAuth || []).includes(user?.role ?? '');
    }
    return true;
  });
  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Dashboard || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="View your dashboard, manage your Posts, Personal Information, edit password and profile"
        headingEmoji="⚙"
        heading="Dash board"
      >
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
          {/* SIDEBAR */}

          <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pr-8">
            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              {filteredSubPages.map(({ sPath, pageName, emoij }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      to={`${url}${sPath}`}
                      activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <span className="w-8 mr-1">{emoij}</span>
                      {pageName}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            <Switch>
              {subPagesRoutes.map(({ component:Component, sPath, exact, id, isAuth }, index) => {
                return (
                  <Route
                    key={index}
                    exact={exact}
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
                          return <Redirect to="/" />;
                      }
                      return <Component />;
                    }}
                    path={!!sPath ? `${path}${sPath}` : path}
                  />
                );
              })}
              <Redirect to={path + "/root"} />
            </Switch>
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageDashboard;
