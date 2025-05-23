import React, { InputHTMLAttributes, useState } from "react";
import { ErrorMessage } from 'formik';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  errors?:any;
  touched?: any;
  name?: string;
  values?: any;
  type?: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-full",
      children,
      type = "text",
      errors={},
      touched={},
      name,
      values,
      setFieldValue,
      ...args
    },
    ref
  ) => {
    const [cValue, setCValue] = useState('')
    const handleChange = (e: any) => {
      if(setFieldValue && name){
        if(e.target.type !== 'file')
          setFieldValue(name, e.target.value)
        else{
          setCValue(e.target.value)
          setFieldValue(name, e.target.files[0])
        }
      }
    }
    return (
      <>        
        <input
          ref={ref}
          type={type || 'text'}
          name={name || ''}
          value={cValue ? cValue : values}
          onChange={handleChange}
          className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring 
          focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 
          dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 
          ${rounded} ${fontClass} ${sizeClass} ${className}`}
          {...args}
        />
        {
          name && (errors[name] || touched[name] ?
            <ErrorMessage name={name}>{msg => 
                <div 
                  style={{color: 'red',fontSize: '11px'}}
                >
                  {msg}
                </div>
              }
            </ErrorMessage>
            : null
          )}
      </>
    );
  }
);

export default Input;
