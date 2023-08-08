import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "data/types";
import { useAppDispatch, useAppSelector } from "app/hooks";
import CardCategory1 from "components/CardCategory1/CardCategory1";
import NcModal from "components/NcModal/NcModal";
import { categoryWithTotalBlogs } from '../../Actions/CategoryAction';
import { DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";
import ButtonPrimary from "components/Button/ButtonPrimary";

export interface ModalCategoriesProps {
  isOpenProp: boolean;
  onCloseModal: () => void;
  modalTitle: string;
}

const ModalCategories: FC<ModalCategoriesProps> = ({ isOpenProp, onCloseModal, modalTitle }) => {
  const [filterData, setFilterData] = useState({skip: 0, limit: 2});
  const [categories, setCategories] = useState<TaxonomyType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [remainingCategories, setRemainingCategories] = useState(null);
  const [moreLoading, setMoreLoading] = useState(false);
  const dispatch = useAppDispatch()

  const repeatedCategoriesArray = Array.from({ length: filterData.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();
  const loadMore = () => {
    setMoreLoading(true)
    let count = {limit: filterData.limit, skip: filterData.skip + filterData.limit}
    dispatch(categoryWithTotalBlogs(filterData)).then((res: TaxonomyType)=> {
      setMoreLoading(false)
      setFilterData(count)
      console.log(res)
      setRemainingCategories(res.remainingCategories)
      let newArray = categories?.concat(res.categories)
      if(newArray)
        setCategories(newArray)
    }).catch(()=> setMoreLoading(false))
  }
  useEffect(()=>{
    setLoading(true)
    let count = {limit: filterData.limit, skip: filterData.skip + filterData.limit}
    dispatch(categoryWithTotalBlogs(filterData)).then((res: any)=> {
      setLoading(false)
      setFilterData(count)
      setCategories(res.categories)
       setRemainingCategories(res.remainingCategories)
    }).catch(()=> setLoading(false))
  },[])
  useEffect(()=>{
    if(!categories){
      setCategories(repeatedCategoriesArray)
    }
  },[categories])
  const renderModalContent = () => {
    return (
      <div>
        <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
          {categories && categories.map((cat: any) => (
            <CardCategory1 key={cat._id} taxonomy={cat} size="normal" />
          ))}
          {
            moreLoading && repeatedCategoriesArray.map((cat: any) => (
              <CardCategory1 key={cat._id} taxonomy={cat} size="normal" />
            ))
          }
        </div>
        {
          (categories && remainingCategories > 0) &&
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonPrimary onClick={()=> loadMore()}>
              { moreLoading &&
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              }
              Show me more
            </ButtonPrimary>
          </div>
        }
      </div>
    );
  };
  return (
    <div className="nc-ModalCategories">
      <NcModal
        renderContent={renderModalContent}
        modalTitle={modalTitle}
        isOpenProp={isOpenProp}
        onCloseModal={onCloseModal}
        showTriggerButton={false}
      />
    </div>
  );
};

export default ModalCategories;
