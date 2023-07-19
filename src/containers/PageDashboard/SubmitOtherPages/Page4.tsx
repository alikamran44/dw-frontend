import React, { InputHTMLAttributes, useState } from "react";
import Label from "components/Label/Label"; 
import {CKEditor} from 'ckeditor4-react';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  errors:any;
  touched: any;
  name: string;

}

const Page4 = React.forwardRef<HTMLInputElement, InputProps>(
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
      values,
      setFieldValue,
      ...args
    },
    ref
  ) => {
   
    return (
      <>        
       <div className='mb-8'>
          <h2 className="text-2xl font-semibold">Post Content </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Write Post Content 
          </span>
        </div>
        {/*colorbutton,codesnippet,emoji,magicline,language,
                      preview,mentions,templates,smiley,tableselection,tableresize,tabletools,
                      table, specialchar,pastefromword,justify,docprops,codesnippetgeshi,embed,
                      font,forms,stylesheetparser,pagebreak,bidi,copyformatting,autolink,
                      easyimage,imagebase,div,divarea,devtools*/}
        <div className='mb-12'>
          <CKEditor 
            onChange={(event) => setFieldValue('content',event.editor.getData(),'hello')}
            config={{
              extraPlugins: `colorbutton, emoji, smiley, font, bidi, specialchar, tableresize,
              templates,div,preview, pastefromword, embed, justify, language, forms, 
              mentions, `,
            }}
            data={values['content'] || ''}
          />
        </div>
      </>
    );
  }
);

export default Page4;
