import { CustomLink } from "data/types";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
  },
  {
    label: "2",
  },
  {
    label: "3",
  },
  {
    label: "4",
  },
];

export interface PaginationProps {
  className?: string;
  selectedPage?: any;
  pages?: any;
  limit?: number;
  setSelectedPage?: (data: any) => void;

}

const Pagination: FC<PaginationProps> = ({ className = "", selectedPage = 0,
  setSelectedPage, pages=0, limit=2
}) => {
  const renderItem = (pag: any, index: number) => {
    if (index === selectedPage) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {index+1}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={()=> setSelectedPage ? setSelectedPage(index) : {}}
      >
        {index+1}
      </button>
    );
  };

  const numPages = Math.ceil(pages / limit);
  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
    {Array.from({ length: numPages }, (pag, pageIndex) =>
          renderItem(pag, pageIndex)
    )}
    </nav>
  );
};

export default Pagination;
