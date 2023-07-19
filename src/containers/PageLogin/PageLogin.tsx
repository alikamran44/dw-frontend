import LayoutPage from "components/LayoutPage/LayoutPage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectUser, selectLoading } from "app/auth/authSlice";
import { Formik, Form } from 'formik';
import { FC, useState, useEffect } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import authSchema from './Schema'
import { useHistory } from "react-router-dom";
import helperAuth from './Helper'
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const { loginSubmitHandler } = helperAuth();
  const initialValues = { email: '', password: '' };
  const history = useHistory()
  useEffect( ()=>{
      const navigationTo = () => {
        if (!user)
        {
          history.push("/login");
        }
        else {
          history.push("/");
        }
      }
      navigationTo();
  }, [user]);

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <Formik
              initialValues={initialValues}
              validationSchema={authSchema.loginSchema}
              onSubmit={loginSubmitHandler}
          >
              {({ values, errors, touched, setFieldValue }) => (
                  <Form  className="grid grid-cols-1 gap-6">
                    <label className="block">
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Email address
                      </span>
                      <Input
                        type="email"
                        values={values['email']} name='email' errors={errors} touched={touched} 
                        setFieldValue={setFieldValue}
                        placeholder="example@example.com"
                        className="mt-1"
                      />
                    </label>
                    <label className="block">
                      <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                        Password
                        <NcLink to="/forgot-pass" className="text-sm">
                          Forgot password?
                        </NcLink>
                      </span>
                      <Input type="password"
                        values={values['password']} name='password' errors={errors} touched={touched} 
                        setFieldValue={setFieldValue}
                        className="mt-1" 
                      />
                    </label>
                    <ButtonPrimary disabled={loading} type="submit">
                      {
                        !loading ?
                          'Continue'
                        :
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      }
                    </ButtonPrimary>
                </Form>
              )}
          </Formik>
          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <NcLink to="/signup">Create an account</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
