import React, { InputHTMLAttributes, useState } from "react";
import Label from "components/Label/Label"; 
import Input from "components/Input/Input";
import Textarea from "components/Textarea/Textarea";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  errors:any;
  touched: any;
  values: any;
  setCover:(media: any) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const Page1 = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-full",      
      errors={},
      touched={},
      values,
      setFieldValue,
      setCover,
      ...args
    },
    ref
  ) => {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if(setFieldValue)
        setFieldValue(e.target.name, e.target.value)
      if(e.target.value === 'standard'){
        setCover({url: '', name: 'cover', selected: null, 
          title: 'Upload or Select Cover Photo', fileFolder: 'cover', text: 'Cover Photo'
        })
      }
      else if(e.target.value === 'gallery'){
        setCover({url: [], name: 'cover', selected: [], 
          title: 'Upload or Select Images', fileFolder: 'gallery', text: 'Gallery'
        })
      }
      else if(e.target.value === 'video'){
        setCover({url: '', name: 'cover', selected: null, 
          title: 'Upload or Select Video', fileFolder: 'video', text: 'Video'
        })
      }
      else if(e.target.value === 'audio'){
        setCover({url: '', name: 'cover', selected: null, 
          title: 'Upload or Select Audio', fileFolder: 'audio', text: 'Audio'
        })
      }
  }
    return (
      <>        
        <div>
          <h2 className="text-2xl font-semibold">Article </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Share your thoughts, expertise, and stories with our readers by creating a captivating article on any topic.
          </span>
        </div>
        <div className="mt-8 w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <label className="block md:col-span-2">
            <Label>Post Title *</Label>
            <Input type="text" values={values['title']} name='title' errors={errors} touched={touched} 
            setFieldValue={setFieldValue} className="mt-1" />
          </label>
          <label className="block md:col-span-2">
          <Label>Post Excerpt</Label>

          <Textarea className="mt-1" rows={4} 
            values={values['description']} name='description' errors={errors} touched={touched} 
            setFieldValue={setFieldValue}
          />

          <p className="mt-1 text-sm text-neutral-500">
            Brief description for your article. URLs are hyperlinked.
          </p>
        </label>

        <label className="block md:col-span-2"> 
            <Label>Select Post Type</Label>
            <select className="mt-1 nc-Select block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
              name='postType' value={values['postType']}  
              onChange={(e) => changeHandler(e)}
            >
              <option value="-1">– select –</option>
              <option value="standard">standard</option>
              <option value="gallery">Gallery</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
            </select>
          </label>
          {errors['postType'] || touched['postType'] ? <div className="invalid-feedback">{errors['postType']}</div> : null}
        </div>
      </>
    );
  }
);

export default Page1;
