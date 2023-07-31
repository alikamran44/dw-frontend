import { CustomLink } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import ModalCategories from "containers/PageArchive/ModalCategories";
import ModalTags from "containers/PageArchive/ModalTags";
export interface WidgetHeading1Props {
  className?: string;
  title: string;
  viewAll: CustomLink;
  modalHandler?: () => void;
  loading?: boolean;
}

const WidgetHeading1: FC<WidgetHeading1Props> = ({
  className = "",
  title,
  viewAll,
  modalHandler,
}) => {
  return (
    <div
      className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700 ${className}`}
      data-nc-id="WidgetHeading1"
    >
      <h2 className="text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow">
        {title}
      </h2>
      {viewAll && viewAll.label && (
        <>
          {viewAll.targetBlank ? (
            <a
              href="#"
              target={viewAll.targetBlank ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-5000 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              {viewAll.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={() =>  modalHandler && modalHandler()}
              className="text-sm font-medium text-neutral-5000 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              {viewAll.label}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WidgetHeading1;
