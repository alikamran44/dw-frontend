import React, { FC, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  errors?:any;
  touched?: any;
  name?: string;
  values?: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const Select: FC<SelectProps> = ({ 
  className = "",
  sizeClass = "h-11",
  children,
  errors={},
  touched={},
  name,
  values,
  setFieldValue,
  ...args
}) => {
  const handleChange = (e: any) => {
    if(setFieldValue && name){
      setFieldValue(name, e.target.value)
    }
  }
  return (
    <>
      <select name={name}
        value={values}
        onChange={handleChange}
        className={`nc-Select ${sizeClass} ${className} block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
        {...args}
      >
        {children}
      </select>
      {(name && (errors[name] || touched[name])) ? <div className="invalid-feedback">{errors[name]}</div> : null}
    </>
  );
};

export default Select;
