import Header, { HeaderProps } from "components/Header/Header";
import React, { FC, useEffect } from "react";
import { useAppSelector } from "app/hooks";
import { selectUser } from "app/auth/authSlice";
import { selectCurrentPageData } from "app/pages/pages";
import { useLocation } from "react-router-dom";
import { LocationStates } from "routers/types";

export interface HeaderContainerProps {
  className?: string;
}

const HeaderContainer: FC<HeaderContainerProps> = ({ className = "" }) => {
  const user = useAppSelector(selectUser);
  const currentPage = useAppSelector(selectCurrentPageData);
  let location = useLocation();

  const getMainNavStyle = (): HeaderProps["mainNavStyle"] => { 
    if (!user) {
      // return "style2";
      return "style1";
    }
    else {
      return "style2Logedin";
    }
  };

  return <Header mainNavStyle={getMainNavStyle()} currentPage={currentPage} />;
};

export default HeaderContainer;
