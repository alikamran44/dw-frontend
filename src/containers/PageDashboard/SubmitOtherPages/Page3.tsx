import React, { InputHTMLAttributes, useState } from "react";
import Label from "components/Label/Label"; 
import TagInputs from "components/Tag/Input";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  errors:any;
  touched: any;
  values: any;
  categories: any;
  tags: any;
  initialCategories: any;
  initialTags: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  categoryLoading: boolean;
  tagLoading: boolean;
  setInitialCategories: (field: any, value?: any, shouldValidate?: any) => void;
  setInitialTags: (field: any, value?: any, shouldValidate?: any) => void;
}

const Page3 = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-full",
      errors={},
      touched={},
      categories,
      tags,
      values,
      setFieldValue,
      categoryLoading,
      tagLoading,
      initialCategories,
      initialTags,
      setInitialCategories,
      setInitialTags,
      ...args
    },
    ref
  ) => {
   
    return (
      <>        
       <div>
          <h2 className="text-2xl font-semibold">Categories & Tags </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Add Tags and Categories
          </span>
        </div>
        <div className="mt-8 w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="mt-8 grid md:grid-cols-2 gap-6 mb-12">
          <label className="block">
            <Label>Category</Label>
            <TagInputs className="mt-1" name='categories'  touched={touched} 
              values={values['categories']}  setFieldValue={setFieldValue} 
              options={categories} loading={categoryLoading} errors={errors}
              initialVal={initialCategories} setInit={setInitialCategories}
            />
          </label>
          <label className="block"> 
            <Label>Tags</Label>
            <TagInputs className="mt-1" name='tags' errors={errors} touched={touched} 
              values={values['tags']}  setFieldValue={setFieldValue} options={tags} 
              initialVal={initialTags} loading={tagLoading} setInit={setInitialTags}
            />
          </label>
        </div>
      </>
    );
  }
);

export default Page3;
