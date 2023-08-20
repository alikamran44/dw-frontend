import React, { InputHTMLAttributes, useState } from "react";
import Label from "components/Label/Label"; 
import ModalGallery from "components/ModalGallery/ModalGallery";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  errors:any;
  touched: any;
  values: any;
  feature: any;
  setFeature: (media: any) => void;
  cover: any;
  setCover: (media: any) => void;
  fetchMediaFiles: (id: any) => void;
  setFieldValue: (name: string, value: any) => void;
  uploadFile: (data: any) => Promise<any>;
}

const Page2 = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-full",
      children,
      errors={},
      touched={},
      values,
      setFieldValue,
      feature,
      setFeature,
      cover,
      setCover,
      fetchMediaFiles,
      uploadFile,
      ...args
    },
    ref
  ) => {
    return (
      <>
        <div>
          <h2 className="text-2xl font-semibold">Upload Photo & Privacy Setting </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Share your photo, video or audio. And do Privacy Settings
          </span>
        </div>
        <div className="mt-8 w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">     
          <div className="grid sm:grid-cols-3  md:grid-cols-2 md:gap-2 sm:gap-2 ">
            <div className='mt-4'>
              <ModalGallery
                data={feature}
                setMedia={setFeature}
                fetchMediaFiles={fetchMediaFiles}
                uploadFile={uploadFile}
                setField={setFieldValue}
              />
            </div>

            {
            values['postType'] && cover.name &&
              <div className='mt-4'>
                <ModalGallery
                  data={cover}
                  setMedia={setCover}
                  fetchMediaFiles={fetchMediaFiles}
                  uploadFile={uploadFile}
                  setField={setFieldValue}
                />
              </div>
            }
          </div>
        </div>
        <div className="MySwitch flex fle justify-between items-center mt-6 ">
          <div>
            <label className="nc-Label text-base font-medium text-neutral-900 dark:text-neutral-200 " data-nc-id="Label">Show Sidebar
            </label>
            <p className="text-neutral-500 dark:text-neutral-400  text-xs">Do you want's to show sidebar?
            </p>
          </div>
          <button onClick={()=> setFieldValue('isSideBar', !values['isSideBar'])} 
            className={`${values['isSideBar'] ? 'bg-teal-700' : 'bg-neutral-400 dark:bg-neutral-6000'}
            relative inline-flex flex-shrink-0 h-8 w-[68px] border-2 
            border-transparent rounded-full cursor-pointer transition-colors 
            ease-in-out duration-200 focus:outline-none focus-visible:ring-2  
            focus-visible:ring-white focus-visible:ring-opacity-75`} 
            id="headlessui-switch-:r39:" role="switch" type="button" tabIndex={0}
            aria-checked="false" data-headlessui-state=""
          >
            <span className="sr-only">Show Sidebar</span>
            <span aria-hidden="true" className={`${values['isSideBar'] ? 'translate-x-9' : 'translate-x-0'}
              pointer-events-none inline-block h-7 w-7 rounded-full bg-white 
              shadow-lg transform ring-0 transition ease-in-out duration-200`}
            ></span>
          </button>
        </div>
        <div className="MySwitch flex fle justify-between items-center mt-6 mb-12">
          <div>
            <label className="nc-Label text-base font-medium text-neutral-900 dark:text-neutral-200 " data-nc-id="Label">Published
            </label>
            <p className="text-neutral-500 dark:text-neutral-400  text-xs">Do you want's to publish this Post to Public?
            </p>
          </div>
          <button onClick={()=> setFieldValue('published', 
              values['published'] === 'Public' ? 'Private' : 'Public'
            )} className={`${values['published'] === 'Public' ? 'bg-teal-700' : 'bg-neutral-400 dark:bg-neutral-6000'}
            relative inline-flex flex-shrink-0 h-8 w-[68px] border-2 
            border-transparent rounded-full cursor-pointer transition-colors 
            ease-in-out duration-200 focus:outline-none focus-visible:ring-2  
            focus-visible:ring-white focus-visible:ring-opacity-75`} 
            id="headlessui-switch-:r39:" role="switch" type="button" tabIndex={0}
            aria-checked="false" data-headlessui-state=""
          >
            <span className="sr-only">Show Sidebar</span>
            <span aria-hidden="true" className={`${values['published'] === 'Public' ? 'translate-x-9' : 'translate-x-0'}
              pointer-events-none inline-block h-7 w-7 rounded-full bg-white 
              shadow-lg transform ring-0 transition ease-in-out duration-200`}
            ></span>
          </button>
        </div>
      </>
    );
  }
);

export default Page2;
