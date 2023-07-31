import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { selectUser } from "app/auth/auth";
import { useAppSelector } from "app/hooks";
import LayoutPage from "components/LayoutPage/LayoutPage";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";

export interface ConfirmLinkProps {
  className?: string;
}

const ConfirmLink: FC<ConfirmLinkProps> = ({ className = "" }) => {
  const user = useAppSelector(selectUser);
  const history = useHistory()
  useEffect( ()=>{
      const navigationTo = () => {
        if (!user)
        {
          history.push("/confirmation-link");
        }
        else {
          history.push("/");
        }
      }
      navigationTo();
  }, [user]);
  return (
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass" 
    >
      <Helmet>
        <title>Forgot Password || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Check your email we've sent you reset password Link"
        headingEmoji="📧"
        heading="Confirm Your Email"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            <NcLink to="/signup">Sign up</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default ConfirmLink;
