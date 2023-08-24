import React, { FC, useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ButtonCircle from "components/Button/ButtonCircle";
import rightImg from "images/SVG-subcribe2.png";
import NcImage from "components/NcImage/NcImage";
import Badge from "components/Badge/Badge";
import Input from "components/Input/Input";
import { subscribe } from '../../Actions/AuthAction';
import useUserDetail from "hooks/useUserDetail";
import  { setAlert, selectConfirmAlert,  onRemoveConfirmAlert, removeAlert 
  } from "app/auth/auth";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const confirmAlert = useAppSelector(selectConfirmAlert);
  const user = useUserDetail();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const alertHandler = () => {
    dispatch(setAlert({
      children: "Please Login to Subscribe!",
      containerClassName: "",
      type: "default",
      title: "Login",
      emoji: "🚫",
      showCloseButton: true,
      showConfirmButton: true,
      alertAction : 'subscribe',
      showCancel: true,
      confirmButtonText: "Login",
      cancelButtonText: "Stay",
    }));
  }
  const submitHandler = (values: any) => {
    console.log(values,'tesstttt')
    if(user){
      dispatch(subscribe(values)).then((res: any) => {
        console.log(res,'ddddddddd')
      }).catch((error) => {
        console.log(error,'errr')
      })
    }else{
      alertHandler()
    }
  }

  useEffect(()=>{
    if(confirmAlert === 'subscribe'){
      dispatch(onRemoveConfirmAlert())
      dispatch(removeAlert())
      history.push("/login");
    }
  },[confirmAlert])
  return (
    <div 
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our newsletter 📬</h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get in touch with our latest article
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              We'll email you every time we release a new of article
            </span>
          </li>
        </ul>
        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="mt-10 relative max-w-sm">
              <Input
                required
                aria-required
                placeholder="Enter your email"
                type="email"
                values={values['email']} name='email' errors={errors} touched={touched} 
                setFieldValue={setFieldValue}
              />
              <ButtonCircle
                type="submit"
                className="absolute transform top-1/2 -translate-y-1/2 right-1"
              >
                <i className="las la-arrow-right text-xl"></i>
              </ButtonCircle>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
