import React, { FC, useEffect, useState } from "react";
import NcModal from "components/NcModal/NcModal";
import Tag from "components/Tag/Tag";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { tagWithTotalBlogs } from '../../Actions/TagAction';

import { TaxonomyType } from "data/types";
import { DEMO_FAKE_CATEGORY_DATA } from "data/taxonomies";

export interface ModalTagsProps {
  isOpenProp: boolean;
  onCloseModal: () => void;
  modalTitle: string;
}


const ModalTags: FC<ModalTagsProps> = ({ isOpenProp, onCloseModal, modalTitle  }) => {
  const [filterData, setFilterData] = useState({skip: 0, limit: 20});
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const dispatch = useAppDispatch();

  const repeatedCategoriesArray = Array.from({ length: filterData.limit }, (_, index) =>
    DEMO_FAKE_CATEGORY_DATA.map(item => ({ ...item, _id: `${item._id}-${index}` }))
  ).flat();

  const loadMore = () => {
    setMoreLoading(true)
    let count = {limit: filterData.limit + filterData.limit, skip: filterData.skip + 1}
    dispatch(tagWithTotalBlogs(filterData)).then((res)=> {
      console.log(res,'lllllllllllll')
      setMoreLoading(false)
      setFilterData(count)
      if(res.length){
        let newArray = tags.concat(res)
        setTags(newArray)
      }
    }).catch(()=> setMoreLoading(false))
  }
  useEffect(()=>{
    setLoading(true)
    let count = {limit: filterData.limit + filterData.limit, skip: filterData.skip + 1}
    dispatch(tagWithTotalBlogs(filterData)).then((res)=> {
      setLoading(false)
      setFilterData(count)
      setTags(res)
    }).catch(()=> setLoading(false))
  },[])
  useEffect(()=>{
    if(!tags){
      setTags(repeatedCategoriesArray)
    }
  },[tags])

  const renderModalContent = () => {
    return (
      <div>
        <div className="flex flex-wrap dark:text-neutral-200">
          {tags && tags.map((tag) => (
            <Tag loading={loading} key={tag._id} tag={tag} className="mr-2 mb-2" />
          ))}
          {
            moreLoading && repeatedCategoriesArray.map((cat) => (
              <Tag loading={moreLoading} key={cat._id} tag={cat} className="mr-2 mb-2" />
            ))
          }
        </div>
        {
          tags &&
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
    <div className="nc-ModalTags">
      <NcModal
        contentExtraClass="max-w-screen-md"
        modalTitle={modalTitle}
        isOpenProp={isOpenProp}
        onCloseModal={onCloseModal}
        showTriggerButton={false}
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalTags;
