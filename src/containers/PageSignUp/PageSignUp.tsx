import { FC, useEffect } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import { useAppSelector } from "app/hooks";
import { selectUser } from "app/auth/authSlice";
import facebookSvg from "images/Facebook.svg";
import { Formik, Form } from 'formik';
import authSchema from './Schema'
import { useHistory } from "react-router-dom";
import helperAuth from './Helper'
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";

export interface PageSignUpProps {
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

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const user = useAppSelector(selectUser);
  const { registerSubmitHandler } = helperAuth();
  const initialValues = { email: '', password: '', firstName: '', lastName: '', confirmPassword: '', gender: ''};
  const history = useHistory()

  useEffect( ()=>{
    const navigationTo = () => {
      if (!user)
      {
        history.push("/signup");
      }
      else {
        history.push("/");
      }
    }
    navigationTo();
  }, [user]);
  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🎉"
        heading="Sign up"
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
              validationSchema={authSchema.registerSchema}
              onSubmit={registerSubmitHandler}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form  className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    First Name
                  </span>
                  <Input
                    type="text" 
                    values={values['firstName']} name='firstName' errors={errors} touched={touched} 
                    setFieldValue={setFieldValue}
                    placeholder="Enter First Name"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Last Name
                  </span>
                  <Input
                    type="text" 
                    values={values['lastName']} name='lastName' errors={errors} touched={touched} 
                    setFieldValue={setFieldValue}
                    placeholder="Enter Last Name"
                    className="mt-1"
                  />
                </label>
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
                  </span>
                  <Input 
                    type="password" 
                    values={values['password']} name='password' errors={errors} touched={touched} 
                    setFieldValue={setFieldValue}
                    className="mt-1" 
                  />
                </label>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                    Confirm Password
                  </span>
                  <Input 
                    type="password" 
                    values={values['confirmPassword']} name='confirmPassword' errors={errors} touched={touched} 
                    setFieldValue={setFieldValue}
                    className="mt-1" 
                  />
                </label>
                <ButtonPrimary type="submit">Continue</ButtonPrimary>
              </Form>
            )}
          </Formik>
          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <NcLink to="/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
