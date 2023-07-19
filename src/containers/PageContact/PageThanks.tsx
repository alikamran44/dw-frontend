import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import ButtonPrimary from "components/Button/ButtonPrimary";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Textarea from "components/Textarea/Textarea";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";

export interface PageThanksProps {
  className?: string;
}

const PageThanks: FC<PageThanksProps> = ({ className = "" }) => {
  const history = useHistory();
  return (
    <div className={`nc-PageContact ${className}`} data-nc-id="PageContact">
      <Helmet>
        <title>Contact || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Thanks to contact we will get back for you."
        headingEmoji="🍂"
        heading="Thanks"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            <button onClick={() => history.push('/')}>Go To Home Page</button>
          </span>
        </div>
      </LayoutPage>

      {/* OTHER SECTIONS */}
      <div className="container pb-16 lg:pb-28">
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageThanks;
