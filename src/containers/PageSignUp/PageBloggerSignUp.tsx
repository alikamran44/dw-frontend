import { FC, useEffect } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import { useAppSelector } from "app/hooks";
import { selectUser } from "app/auth/auth";
import facebookSvg from "images/Facebook.svg";
import { Formik, Form } from 'formik';
import authSchema from './Schema'
import { useHistory } from "react-router-dom";
import helperAuth from './Helper'
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Select from "components/Select/Select";
import Input from "components/Input/Input";
import Textarea from "components/Textarea/Textarea";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import NcImage from "components/NcImage/NcImage";
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

const PageBloggerSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const user = useAppSelector(selectUser);
  const { registerBloggerSubmitHandler } = helperAuth();
  const initialValues = { email: '', password: '', firstName: '', lastName: '', 
    confirmPassword: '', gender: '', about: '', jobName: '', pic: null, 
    bgImage: null, username: ''};
  const history = useHistory()

  useEffect( ()=>{
    const navigationTo = () => {
      if (!user)
      {
        history.push("/blogger-signup");
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
        heading="Write For US"
      >
        <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
          <div className='space-y-10 sm:space-y-12'>
            <Formik
                initialValues={initialValues}
                validationSchema={authSchema.registerBloggerSchema}
                onSubmit={registerBloggerSubmitHandler}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form >
                  <div className="flex flex-col md:flex-row">
                    
                    <div className="block md:col-span-2">
              <div className="rounded-3xl md:rounded-[20px] relative aspect-w-16 aspect-h-8 sm:aspect-h-7 xl:sm:aspect-h-9 overflow-hidden ">
                <NcImage
                  containerClassName="absolute inset-0"
                  src={`${values['bgImage'] ? URL.createObjectURL(values['bgImage']) : ''}`}
                  className="object-cover w-full h-full"
                />
                 <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125" 
                      stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" 
                      stroke-linejoin="round">
                    </path>
                  </svg>
                  <span className="mt-1 text-xs">Change Cover Photo</span>
                </div>
                <input
                  name="bgImage"
                  onChange={(e: any) => setFieldValue(e.target.name, e.target.files[0])}
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="relative container -mt-20 lg:mt-2">
                <div className='flex-shrink-0 flex items-center justify-center'>
                <div className="relative rounded-full overflow-hidden flex">
                  <img src={`${values['pic'] ? URL.createObjectURL(values['pic']) : ''}`}  
                    alt="" className="w-32 h-32 rounded-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" 
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125" 
                        stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" 
                        stroke-linejoin="round">
                      </path>
                    </svg>
                    <span className="mt-1 text-xs">Change Image</span>
                  </div>
                  <input name='pic' onChange={(e: any) => setFieldValue(e.target.name, e.target.files[0])} type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              </div>
            </div>

                    <div className='flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6'>
                      
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
                          User Name
                        </span>
                        <Input
                          type="text" 
                          values={values['username']} name='username' errors={errors} touched={touched} 
                          setFieldValue={setFieldValue}
                          placeholder="Enter User Name"
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
                      <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                          Job
                        </span>
                        <Select className="mt-1"
                          name='jobName' errors={errors} touched={touched} 
                          values={values['jobName']}  setFieldValue={setFieldValue} 
                        >
                          <option>– select –</option>
                          <option value="Author Job">Author Job</option>
                          <option value="Editor">Editor</option>
                          <option value="Content Writer">Content Writer</option>
                          <option value="Social Media Manager">Social Media Manager</option>
                          <option value="Graphic Designer">Graphic Designer</option>
                          <option value="Web Developer">Web Developer</option>
                          <option value="Video Editor">Video Editor</option>
                          <option value="UI/UX Designer">UI/UX Designer</option>
                          <option value="SEO Specialist">SEO Specialist</option>
                          <option value="Marketing Manager">Marketing Manager</option>
                          <option value="Data Analyst">Data Analyst</option>
                          <option value="Project Manager">Project Manager</option>
                        </Select>
                      </label>
                      <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                          Gender
                        </span>
                        <Select className="mt-1"
                          name='gender' errors={errors} touched={touched} 
                          values={values['gender']}  setFieldValue={setFieldValue} 
                        >
                          <option>– select –</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Select>
                      </label>
                      <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                          About
                        </span>
                        <Textarea rows={2} 
                          values={values['about']} name='about' errors={errors} touched={touched} 
                          setFieldValue={setFieldValue}
                          className="mt-1" 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="text-center mx-auto mt-8 md:mt-8">
                      <ButtonPrimary type="submit">Continue</ButtonPrimary>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300 mt-5">
            Already have an account? {` `}
            <NcLink to="/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageBloggerSignUp;
