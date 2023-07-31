import React, { FC, useEffect, useState } from "react";
import Tag from "components/Tag/Tag";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import ModalTags from "./ModalTags";

import { TaxonomyType } from "data/types";

export interface WidgetTagsProps {
  className?: string;
  tags: TaxonomyType[];
  loading?: boolean;
}

const WidgetTags: FC<WidgetTagsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  tags,
  loading = false, 
}) => {
  const [show, setShow] = useState(false)
  const modalHandler = () => {
    setShow(!show) 
  }
  return (
    <div
      className={`nc-WidgetTags rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetTags"
    >
      {
        show &&
        <ModalTags isOpenProp={show} onCloseModal={modalHandler}
          modalTitle={'More Tags'}
        />
      }
      <WidgetHeading1
        title="🏷 Discover more tags"
        viewAll={{ label: "View all", href: "/#", allowModal: true }} 
        modalHandler={modalHandler}
      />
      <div className="flex flex-wrap p-4 xl:p-5">
        {tags.map((tag: TaxonomyType) => (
          <Tag className="mr-2 mb-2" key={tag._id} tag={tag} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
