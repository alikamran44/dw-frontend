import { CustomLink } from "data/types";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
    href: "#",
  },
  {
    label: "2",
    href: "#",
  },
  {
    label: "3",
    href: "#",
  },
  {
    label: "4",
    href: "#",
  },
];

export interface PaginationProps {
  className?: string;
  selectedPage?: any;
  setSelectedPage?: (data: any) => void;

}

const Pagination: FC<PaginationProps> = ({ className = "", selectedPage = 0,
  setSelectedPage 
}) => {
  const renderItem = (pag: CustomLink, index: number) => {
    if (index === selectedPage) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
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
        {pag.label}
      </button>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {DEMO_PAGINATION.map(renderItem)}
    </nav>
  );
};

export default Pagination;
