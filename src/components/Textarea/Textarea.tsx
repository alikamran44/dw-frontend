import React, { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className = "", 
      children, 
      errors={},
      touched={},
      name,
      values,
      setFieldValue,
      ...args 
    }, 
      ref) => {
    const handleChange = (e: any) => {
      if(setFieldValue && name){
        setFieldValue(name, e.target.value)
      }
    }
    return (
      <>
        <textarea
          ref={ref}
          name={name}
          value={values}
          onChange={handleChange}
          className={`block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
          rows={4}
          {...args}
        >
          {children}
        </textarea>
        {name && (errors[name] || touched[name] ? <div className="invalid-feedback">{errors[name]}</div> : null)}
      </>
    );
  }
);

export default Textarea;
