import React, { FC, useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import { useAppSelector } from "app/hooks";
import { TaxonomyType } from "data/types";
import Select from "components/Select/Select";
import Input from "components/Input/Input";
import CardGalleryImage from "components/CardGalleryImage/CardGalleryImage";
import GalleryCard from "./GalleryCard";
import ButtonPrimary from "components/Button/ButtonPrimary";
import HeaderFilter from "components/ModalGallery/HeaderFilter";
import NcModal from "components/NcModal/NcModal";
import NcImage from "components/NcImage/NcImage";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { selectMediaFiles, selectBlogLoading } from "app/blog/blogSlice";
import Label from "components/Label/Label"; 
const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);

export interface ModalCategoriesProps {
  categories?: TaxonomyType[];
  data: any;
  setMedia: (data: any) => void;
  fetchMediaFiles: (id: any) => void;
  uploadFile: (data: any) => Promise<any>;
  setField: (name: string, value: any) => void
}

interface InitialValuesType {
  fileFolder: string;
  mediaType: string;
  url: string;
  file: any;
  thumbnail: any;
  thumbnailType: string;
  thumbnailUrl: any;
}
const GALLERY_TABS = ["feature", "cover", "avatar", 'profile', 'video', 'gallery', 'audio' , "upload"];
const ModalCategories: FC<ModalCategoriesProps> = ({ categories=DATA, data, fetchMediaFiles, setMedia, 
  uploadFile, setField }) => {
  const { name, url, selected, title, fileFolder, text } = data;
  const tabsFilter = GALLERY_TABS.filter((res) => (res === fileFolder || res === 'upload'))
  const [tabActive, setTabActive] = useState<string>(fileFolder);
  const mediaRecords = useAppSelector(selectMediaFiles);
  const loading = useAppSelector(selectBlogLoading);
  let [uploadLoading, setUploadLoading] = useState<boolean>(false);
  let [select, setSelect] = useState(data);
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [initialValues, setInitialValues] = useState<InitialValuesType | null>(null);
  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };
  const onSelectImage = (imgId: any, img: any) => {
    let newMedia = {}
    if(data.fileFolder === 'gallery'){
      newMedia = {
        ...data,
        selected: [...select.selected, imgId],
        url: [...select.url, img]
      };
    }else{
      newMedia = {...data, selected: imgId, url: img}
    }
    setSelect(newMedia)
    
  }

  const toggle = () => {
    setIsOpen(!isOpen)
    if(!isOpen){
      setSelect(data)
      setInitialValues({ fileFolder: fileFolder, mediaType: 'upload', file: '',
        url: '', thumbnail: '', thumbnailType: `${(fileFolder === 'audio' || fileFolder === 'video') ? 'url' : ''}`, thumbnailUrl: ''})
      
      fetchMediaFiles({fileFolder: fileFolder === 'thumbnail' ? 'feature' : fileFolder});
    }
    else{
      setSelect(false)
    }
  }

  const insertHandler = () => {
    setField(name, select.selected)
    setIsOpen(!isOpen)
    setMedia(select)
  }
  const renderModalContent = () => {
    const handleChange = (e: any, setFieldValue: any) => {
      setFieldValue(e.target.name, e.target.files[0])
    }
    const submitHandler = (values: any) => {
      setUploadLoading(true)
       uploadFile(values).then((res: any)=> {
          setUploadLoading(false)

          const newMedia = {...data, selected: res._id, url: (data.fileFolder === 'video' || data.fileFolder === 'audio') ? 
                  res.thumbnail : res.url}
          setField(name, res._id)
          setMedia(newMedia)
          toggle()
       }).catch(()=> setUploadLoading(false) )
    }

    return (
      <div>
        <HeaderFilter tabs={tabsFilter} tabActive={tabActive}
          onClickTab={handleClickTab}
        />
        {
          (tabActive === "feature") ?
          <div>
            <div className="flex flex-col" >
              <h3 className="text-lg sm:text-2xl font-semibold">
                <span>  
                 Select Feature Image
                </span> 
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
                {mediaRecords?.map((cat: any) => (
                  <span key={cat?._id}>
                    <GalleryCard 
                      taxonomy={cat} selectedImg={selected} select={select?.selected}
                      onSelectImage={onSelectImage} loading={loading}
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center mx-auto mt-10 md:mt-16 mb-4 md:mb-4">
              <ButtonPrimary
                type="button"
                onClick={insertHandler}
                disabled={!select?.selected}
              >
                Insert
              </ButtonPrimary>
            </div>

          </div>
          : tabActive === "cover" ?
            <div> 
              <div className="flex flex-col" >
                <h3 className="text-lg sm:text-2xl font-semibold">Select Cover Photo</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
                {mediaRecords?.map((cat: any) => (
                  <span key={cat?._id}>
                    <GalleryCard 
                      taxonomy={cat} selectedImg={selected}  select={select?.selected}
                      onSelectImage={onSelectImage} loading={loading}
                    />
                  </span>
                ))}
              </div>
              </div>
              <div className="text-center mx-auto mt-10 md:mt-16 mb-4 md:mb-4">
                <ButtonPrimary
                  type="button"
                  onClick={insertHandler}
                >
                  Insert
                </ButtonPrimary>
              </div>

            </div>
            : tabActive === "video" ?
            <div> 
              <div className="flex flex-col" >
                <h3 className="text-lg sm:text-2xl font-semibold">Select Video</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
                {mediaRecords?.map((cat: any) => (
                  <span key={cat?._id}>
                    <GalleryCard 
                      taxonomy={cat} selectedImg={selected}  select={select?.selected}
                      onSelectImage={onSelectImage} loading={loading}
                    />
                  </span>
                ))}
              </div>
              </div>
              <div className="text-center mx-auto mt-10 md:mt-16 mb-4 md:mb-4">
                <ButtonPrimary
                  type="button"
                  onClick={insertHandler}
                >
                  Insert
                </ButtonPrimary>
              </div>

            </div>
            : tabActive === "gallery" ?
            <div> 
              <div className="flex flex-col" >
                <h3 className="text-lg sm:text-2xl font-semibold">Select Multiple Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
                {mediaRecords?.map((cat: any) => (
                  <span key={cat?._id}>
                    <GalleryCard 
                      taxonomy={cat} selectedImg={selected}  select={select?.selected}
                      onSelectImage={onSelectImage} loading={loading}
                    />
                  </span>
                ))}
              </div>
              </div>
              <div className="text-center mx-auto mt-10 md:mt-16 mb-4 md:mb-4">
                <ButtonPrimary
                  type="button"
                  onClick={insertHandler}
                >
                  Insert
                </ButtonPrimary>
              </div>

            </div>

            : tabActive === "audio" ?
            <div> 
              <div className="flex flex-col" >
                <h3 className="text-lg sm:text-2xl font-semibold">Select Audio</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
                {mediaRecords?.map((cat: any) => (
                  <span key={cat?._id}>
                    <GalleryCard 
                      taxonomy={cat} selectedImg={selected}  select={select?.selected}
                      onSelectImage={onSelectImage} loading={loading}
                    />
                  </span>
                ))}
              </div>
              </div>
              <div className="text-center mx-auto mt-10 md:mt-16 mb-4 md:mb-4">
                <ButtonPrimary
                  type="button"
                  onClick={insertHandler}
                >
                  Insert
                </ButtonPrimary>
              </div>

            </div>

          : tabActive === "upload" &&
            <div className="block md:col-span-2">
              <h3 className="text-lg sm:text-2xl font-semibold">Upload 
                  {(fileFolder !== 'audio' && fileFolder !== 'video') ? ' Images' : 
                      fileFolder === 'audio' ? ' Audio' : fileFolder === 'video' && ' Video' }
              </h3>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                File types supported: 
                {(fileFolder !== 'audio' && fileFolder !== 'video') ?
                    <span> JPG, PNG, GIF, SVG</span>
                  : fileFolder === 'audio' ?
                    <span> MP3</span>
                  : fileFolder === 'video' &&
                    <span> MP4</span>
                }
              </span>
              {
                initialValues &&
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitHandler}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form  className="grid grid-cols-1 gap-6">
                      <div className='mt-4 block md:col-span-1'>
                        <div> 
                          <h4 className="text-lg sm:text-2sm font-semibold"> Select File type </h4>                
                          <Select className="mt-1"
                            name='mediaType' errors={errors} touched={touched} 
                            values={values['mediaType']}  setFieldValue={setFieldValue} 
                          >
                            <option ></option>
                            <option value="url">URL</option>
                            <option value="upload">Upload</option>
                          </Select>
                        </div>
                      </div>
                      {
                        values['mediaType'] === 'upload' ? 
                        <div>  
                          <h4 className="text-lg sm:text-2sm font-semibold"> Upload File </h4>                
                          <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              {
                                (values && !values['file']) ? 
                                  <svg
                                    className="mx-auto h-12 w-12 text-neutral-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                  : 
                                  <NcImage
                                    src={(fileFolder !== 'audio' && fileFolder !== 'video') ? URL.createObjectURL(values['file']) : ''}
                                    className="mx-auto h-12 w-12 text-neutral-400"
                                  />
                              }
                              <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name={'file'}
                                    accept={`${(fileFolder !== 'audio' && fileFolder !== 'video') 
                                            ? '.png, .jpg, .jpeg' : fileFolder === 'audio' ? 'audio/*' :
                                            fileFolder === 'video' && 'video/*'}`}
                                    type="file"
                                    className="sr-only"
                                    onChange={(e)=>handleChange(e, setFieldValue)}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              {
                                (!values['file'] && (fileFolder !== 'audio' || fileFolder !== 'video')) ?
                                <p className="text-xs text-neutral-500">
                                  {(fileFolder !== 'audio' && fileFolder !== 'video') ? `PNG, JPG, GIF up to 2MB` :
                                    fileFolder === 'audio' ? `MP3 up to 2MB` : fileFolder === 'video' && `MP4 up to 2MB`
                                  }
                                </p>
                                :
                                <p className="text-xs text-secondary-800">
                                  File has been uploaded
                                </p>
                              }
                            </div>
                          </div>
                        </div>
                        : values['mediaType'] === 'url' &&
                        <div className='mt-4 block md:col-span-1'>
                          <h4 className="text-lg sm:text-2sm font-semibold"> Add URL </h4>                
                          <div> 
                            <Input type="text" values={values['url']} name='url' errors={errors} touched={touched} 
                              setFieldValue={setFieldValue} className="mt-1" />
                          </div>
                        </div>
                      }

                      {
                        (fileFolder === 'audio' || fileFolder === 'video') &&
                        <div className='mt-4 block md:col-span-1'>
                          <div> 
                            <h4 className="text-lg sm:text-2sm font-semibold"> Select Thumbnail type </h4>                
                            <Select className="mt-1"
                              name='thumbnailType' errors={errors} touched={touched} 
                              values={values['thumbnailType']}  setFieldValue={setFieldValue} 
                            >
                              <option ></option>
                              <option value="url">URL</option>
                              <option value="upload">Upload</option>
                            </Select>
                          </div>
                        </div>
                      }
                      { values['thumbnailType'] === 'upload' ?
                        <div>
                          <h4 className="text-lg sm:text-2sm font-semibold"> Upload Thumbnail File </h4>                
                          <div className="mt-3 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              {
                                !values['thumbnail'] ? 
                                  <svg
                                    className="mx-auto h-12 w-12 text-neutral-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                  : 
                                  <NcImage
                                    src={values['thumbnail'] ? URL.createObjectURL(values['thumbnail']) : ''}
                                    className="mx-auto h-12 w-12 text-neutral-400"
                                  />
                              }
                              <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                                <label
                                  htmlFor="thumbnail"
                                  className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="thumbnail"
                                    name={'thumbnail'}
                                    accept={`'.png, .jpg, .jpeg'`}
                                    type="file"
                                    className="sr-only"
                                    onChange={(e)=>handleChange(e, setFieldValue)}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                                <p className="text-xs text-neutral-500">
                                  PNG, JPG, GIF up to 2MB
                                </p>
                            </div>
                          </div>
                        </div>
                        : values['thumbnailType'] === 'url' &&
                        <div className='mt-4 block md:col-span-1'>
                          <h4 className="text-lg sm:text-2sm font-semibold"> Add URL </h4>                
                          <div> 
                            <Input type="text" values={values['thumbnailUrl']} name='thumbnailUrl' errors={errors} touched={touched} 
                              setFieldValue={setFieldValue} className="mt-1" />
                          </div>
                        </div>
                      }
                      <div className="text-center mx-auto mt-10 md:mt-5 mb-4 md:mb-4">
                        <ButtonPrimary
                          disabled={uploadLoading}
                          type="submit"
                        >
                          {
                            uploadLoading &&
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            }
                            Upload
                        </ButtonPrimary>
                      </div>
                    </Form>
                  )}
                </Formik>
              }
            </div>
        } 
      </div>
    );
  };
 
  return (
    <div className="nc-ModalCategories">
      <NcModal
        uploadTriggerText={
          <CardGalleryImage url={url}
            name={text} selected={selected}
            onClickButton={toggle}
          />
        }
        modalTitle={title}
        isOpenProp={isOpen}
        onCloseModal={toggle}
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalCategories;
