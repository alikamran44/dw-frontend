import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "data/types";
import CardCategory1 from "components/CardCategory1/CardCategory1";
import NcModal from "components/NcModal/NcModal";
import ButtonPrimary from "components/Button/ButtonPrimary";

export interface ModalCategoriesProps {
  categories: TaxonomyType[];
  loading?: boolean;
  postType?: any;
  loadMoreCategory?: () => void;
  moreLoadingCategory?: boolean;
  remainingCategoryCount?: any;
} 

const ModalCategories: FC<ModalCategoriesProps> = ({ categories, postType,
  loadMoreCategory, remainingCategoryCount, moreLoadingCategory 
}) => {
  const [show, setShow] = useState(false)
  const modalHandler = () => {
    console.log('hello Iammmmcalllllllll')
    setShow(!show) 
  }
  const renderModalContent = () => {
    return (
      <>
        <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:md:grid-cols-3">
          {categories.map((cat) => (
            <CardCategory1 modalHandler={modalHandler} key={cat.id} taxonomy={cat} 
              size="normal" postType={postType}
            />
          ))}
        </div>
        {
          remainingCategoryCount > 0 &&
            <div className="text-center mx-auto mt-10 md:mt-16">
              <ButtonPrimary onClick={loadMoreCategory}>
                { moreLoadingCategory &&
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                }
                Show me more
              </ButtonPrimary>
            </div>
        }
      </>
    );
  };

  return (
    <div className="nc-ModalCategories">
      <NcModal
        isOpenProp={show}
        onCloseModal={modalHandler}
        contentExtraClass="max-w-screen-md"
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
