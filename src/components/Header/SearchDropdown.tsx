import { Popover, Transition } from "@headlessui/react";
import { Formik, Form } from 'formik';
import { useHistory  } from "react-router-dom";
import Input from "components/Input/Input";
import React, { Fragment } from "react";

const SearchDropdown = () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const history = useHistory()
  return (
    <React.Fragment>
      <Popover className="relative">
        {({ open }) => {
          if (open) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }
          const submitHandler = (values: any) => {
            history.push(`/search/${values.search}`)
          }
          return (
            <>
              <Popover.Button className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <i className="las la-search"></i>
              </Popover.Button>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute right-0 z-10 w-screen max-w-sm mt-3"
                >
                  <Formik
                    initialValues={{search: ''}}
                    onSubmit={submitHandler}
                  >
                    {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                      <Form className="relative"
                      >
                        <i className="las la-search absolute left-3 top-1/2 transform -translate-y-1/2 text-xl opacity-60"></i>
                        <Input
                          values={values['search']} name='search' errors={errors} touched={touched} 
                          setFieldValue={setFieldValue}
                          ref={inputRef}
                          type="search"
                          placeholder="Type and press enter"
                          className="pl-10"
                        />
                        <input type="submit" hidden value="" />
                      </Form>
                    )}
                  </Formik>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </React.Fragment>
  );
};

export default SearchDropdown;
