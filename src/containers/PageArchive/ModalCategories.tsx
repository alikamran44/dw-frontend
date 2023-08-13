import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "data/types";
import CardCategory1 from "components/CardCategory1/CardCategory1";
import NcModal from "components/NcModal/NcModal";

export interface ModalCategoriesProps {
  categories: TaxonomyType[];
  loading?: boolean;
}

const ModalCategories: FC<ModalCategoriesProps> = ({ categories }) => {
  const [show, setShow] = useState(false)
  const modalHandler = () => {
    setShow(!show) 
  }
  const renderModalContent = () => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
        {categories.map((cat) => (
          <CardCategory1 modalHandler={modalHandler} key={cat.id} taxonomy={cat} size="normal" />
        ))}
      </div>
    );
  };

  return (
    <div className="nc-ModalCategories">
      <NcModal
        isOpenProp={show}
        onCloseModal={modalHandler}
        triggerText={
          <span>
            <span className="hidden sm:inline">Other</span> Categories
          </span>
        }
        modalTitle="Discover other categories"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalCategories;
