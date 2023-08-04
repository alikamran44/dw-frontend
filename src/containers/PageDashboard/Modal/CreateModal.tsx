import React, { FC, useState,useEffect, Dispatch, SetStateAction } from "react";
import NcModal from "components/NcModal/NcModal";
import { Formik, Form } from 'formik';
import { useAppSelector } from "app/hooks";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import helperForm from '../Helper'
import ModalGallery from "components/ModalGallery/ModalGallery";

export interface ModalCreateProps { 
  loading: boolean;
  uploadButtonText: string;
  buttonText: string;
  title: string;
  submitHandler: (data: any) => void;
  isOpen: boolean;
  toggle: (data?: any) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: any;
}


const ModalCreate: FC<ModalCreateProps> = ({ loading, uploadButtonText, buttonText, submitHandler, title,
  toggle, isOpen, setIsOpen, initialValues }) => {
  const { fetchMediaFiles, uploadFile } = helperForm();
  const [feature, setFeature] = useState({url: '', name: 'media', selected: null, 
    title: 'Upload or Select Tag Cover Photo', fileFolder: 'cover', text: 'Cover Photo'
  });
  useEffect(()=>{
    if(isOpen){
      setFeature({url: initialValues.media ? initialValues.media?.url : '', name: 'media', selected: null, 
        title: 'Upload or Select Tag Cover Photo', fileFolder: 'cover', text: 'Cover Photo'
      })
    }
  },[isOpen])
  const renderModalContent = () => {
    if(!initialValues) return <></>
    return (
      <div>
        <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form  className="grid grid-cols-1 gap-6">
                    <label className="block">
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Name
                      </span>
                      <Input
                        type="text"
                        values={values['name']} name='name' errors={errors} touched={touched} 
                        setFieldValue={setFieldValue}
                        className="mt-1"
                      />
                    </label>
                    <label className="block">
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Select Image
                      </span> 
                       <div className="mt-8 grid md:grid-cols-2 gap-6">
                          <div className="grid sm:grid-cols-3  md:grid-cols-2 md:gap-2 sm:gap-2 ">
                            <div >
                             <ModalGallery
                                data={feature}
                                setMedia={setFeature}
                                fetchMediaFiles={fetchMediaFiles}
                                uploadFile={uploadFile}
                                setField={setFieldValue}
                              />
                            </div>
                          </div>
                       </div>
                    </label>
                    <div className="text-center mx-auto mb-4 md:mb-4">
                      <ButtonPrimary
                        disabled={loading}
                        type="submit"
                      >
                        {
                          loading &&
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          }
                          {uploadButtonText}
                      </ButtonPrimary>
                    </div>
                  </Form>
                )}
              </Formik>
      </div>
    );
  };

  return (
    <div className="nc-ModalTags">
      <NcModal
        contentExtraClass="max-w-screen-md"
        uploadTriggerText={
          <div className="flex justify-end space-x-5 mt-0 mb-5">
           <ButtonPrimary type="button" onClick={toggle} >{buttonText}</ButtonPrimary>
          </div>
        }
        isOpenProp={isOpen}
        onCloseModal={toggle}
        modalTitle={title}
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalCreate;
