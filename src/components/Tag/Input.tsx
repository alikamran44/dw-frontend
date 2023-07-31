import React, { useRef, useState } from "react";
import Select, { Props } from "react-select";

interface SelectProps extends Props {
   sizeClass?: string;
   className?: string;
  fontClass?: string;
  rounded?: string;
  errors:any;
  touched: any;
  name: string;
  suggestedValues?: any;
  values: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  options: any;
  loading: boolean
}

const CustomTagsInput: React.FC<SelectProps> = (
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-full",
      children,
      errors = {},
      touched = {},
      name,
      values,
      suggestedValues = [],
      setFieldValue,
      loading,
      options,
      ...args
    },
  ) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const customClass: any = {
      input: `block w-full border-neutral-200 focus:border-primary-300 focus:ring 
          focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 
          dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 tag-inputs
          ${className} ${rounded} ${fontClass} ${sizeClass}`,
    };

    return (
      <>
        <Select
          options={options}
          isMulti 
          isSearchable 
          name={name}
          value={selectedValues}
          isLoading={loading}
          onChange={(selectedOptions: any) => {
            const newArray = selectedOptions.map((item: any) => item.value);
            if(setFieldValue){
              setSelectedValues(selectedOptions);
              setFieldValue(name, newArray);
            }
          }}
          classNamePrefix="react-select"
          className={customClass}
          {...args}
        />

        {(name && (errors[name] || touched[name])) ? (
          <div className="invalid-feedback" style={{marginTop:'3px'}}>{errors[name]}</div>
        ) : null}
      </>
    );
  }
);

export default CustomTagsInput;
