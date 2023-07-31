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
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  categoryLoading: boolean;
  tagLoading: boolean;
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

            <TagInputs className="mt-1" name='categories' errors={errors} touched={touched} 
              values={values['categories']}  setFieldValue={setFieldValue} options={categories}
              loading={categoryLoading}
            />
          </label>
          <label className="block"> 
            <Label>Tags</Label>
            <TagInputs className="mt-1" name='tags' errors={errors} touched={touched} 
              values={values['tags']}  setFieldValue={setFieldValue} options={tags} loading={tagLoading}
            />
          </label>
        </div>
      </>
    );
  }
);

export default Page3;
