import React, { FC, useState } from "react";
import NcModal from "components/NcModal/NcModal";
import Tag from "components/Tag/Tag";
import { TaxonomyType } from "data/types";

export interface ModalTagsProps {
  tags: TaxonomyType[];
  loading?: boolean;
}

const ModalTags: FC<ModalTagsProps> = ({ tags }) => {
  const [show, setShow] = useState(false)
  const modalHandler = () => {
    setShow(!show) 
  }
  const renderModalContent = () => {
    return (
      <div className="flex flex-wrap dark:text-neutral-200">
        {tags.map((tag) => (
          <Tag modalHandler={modalHandler} key={tag.id} tag={tag} className="mr-2 mb-2" />
        ))}
      </div>
    );
  };

  return (
    <div className="nc-ModalTags">
      <NcModal
        isOpenProp={show}
        onCloseModal={modalHandler}
        contentExtraClass="max-w-screen-md"
        triggerText={
          <span>
            <span className="hidden sm:inline">Other</span> Tags
          </span>
        }
        modalTitle="Discover other tags"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalTags;
