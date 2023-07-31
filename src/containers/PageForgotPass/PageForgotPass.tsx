import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import { selectUser, selectLoading } from "app/auth/auth";
import { useAppDispatch, useAppSelector } from "app/hooks";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import helperAuth from "containers/PageLogin/Helper";
import authSchema from "containers/PageLogin/Schema";

export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = "" }) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const { loginSubmitHandler } = helperAuth();
  const initialValues = { email: '' };
  const history = useHistory()
  useEffect( ()=>{
      const navigationTo = () => {
        if (!user)
        {
          history.push("/forgot-pass");
        }
        else {
          history.push("/");
        }
      }
      navigationTo();
  }, [user]);

  const sendPasswordLink = (values: any) => {
    history.push("/confirmation-link");
    
  }
  return (
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass" 
    >
      <Helmet>
        <title>Forgot Password || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="We will sent reset password instruction to your email"
        headingEmoji="🔐"
        heading="Forgot password"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <Formik
              initialValues={initialValues}
              // validationSchema={authSchema.loginSchema}
              onSubmit={sendPasswordLink}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form  className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Email address
                  </span>
                  <Input
                    values={values['email']} name='email' errors={errors} touched={touched} 
                    setFieldValue={setFieldValue} type="email" placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <ButtonPrimary type="submit">Continue</ButtonPrimary>
              </Form>
            )}
          </Formik>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            <NcLink to="/signup">Sign up</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageForgotPass;
