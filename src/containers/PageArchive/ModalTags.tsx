import React, { FC, useState } from "react";
import NcModal from "components/NcModal/NcModal";
import Tag from "components/Tag/Tag";
import { TaxonomyType } from "data/types";
import ButtonPrimary from "components/Button/ButtonPrimary";
import BlogsHelper from './Helper'

export interface ModalTagsProps {
  tags: TaxonomyType[];
  loading?: boolean;
  setTagFilter: (data: any) => void; 
  setRemainingTagCount: (data: any) => void;
  setTagCount: (data: any) => void;
  setTags: (data: any) => void;
  setMoreLoadingTag: (data: any) => void;

  tagFilter?: any;
  moreLoadingTag?: boolean;
  remainingTagCount?: any;
  tagCount?: any;

}

const ModalTags: FC<ModalTagsProps> = ({ 
  setTagFilter, setRemainingTagCount, setTagCount, setTags, loading,
  tagFilter, moreLoadingTag, remainingTagCount, tagCount, tags,
  setMoreLoadingTag
}) => {
    const [show, setShow] = useState(false)
    const { TagWithTotalBlogs } = BlogsHelper()
    const modalHandler = () => {
      setShow(!show) 
    }
    console.log('chhhhhhh')
    const renderModalContent = () => {
      const loadMoreTag = () => {
        setMoreLoadingTag(true)
        TagWithTotalBlogs(tagFilter).then((res:any)=> {
          setTags(res.tags)
          let countTag = {limit: tagFilter.limit, skip: tagFilter.skip + tagFilter.limit}
          setRemainingTagCount(res.remainingTags)
          setMoreLoadingTag(false)

          if(res){
            let newArray = tags?.concat(res.tags)
            if(newArray)
              setTags(newArray)
          }
        }).catch( (err) => setMoreLoadingTag(false))
      }
    return (
      <>
        <div className="flex flex-wrap dark:text-neutral-200">
          {tags.map((tag) => (
            <Tag modalHandler={modalHandler} key={tag.id} tag={tag} className="mr-2 mb-2" />
          ))}
        </div>
        {
          remainingTagCount > 0 &&
            <div className="text-center mx-auto mt-10 md:mt-16">
              <ButtonPrimary onClick={loadMoreTag}>
                { moreLoadingTag &&
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
