import { useEffect, useState } from "react";
import CardCategory1 from "components/CardCategory1/CardCategory1";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import ModalCategories from "./ModalCategories";
import { TaxonomyType } from "data/types";
import React, { FC } from "react";

export interface WidgetCategoriesProps {
  className?: string;
  categories: TaxonomyType[];
  loading?: boolean;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  categories,
  loading = false
}) => {
  const [show, setShow] = useState(false)
  const modalHandler = () => {
    setShow(!show) 
  }
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl  overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      {
        show &&
        <ModalCategories  isOpenProp={show} onCloseModal={modalHandler}
          modalTitle={'More Categories'}
        />
      }
      <WidgetHeading1
        title="✨ Trending topic" 
        loading={loading}
        viewAll={{ label: "View all", href: "/#", allowModal: true }}
        modalHandler={modalHandler}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories.map((category) => (
            <CardCategory1
              className={`p-4 xl:p-5 ${category.slug ? 'hover:bg-neutral-200 dark:hover:bg-neutral-700' : ''}`}
              key={category._id}
              taxonomy={category}
              loading={loading}
              size="normal"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
