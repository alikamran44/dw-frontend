import {useState, useEffect} from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import { Formik, Form } from 'formik';
import Label from "components/Label/Label";
import React from "react";
import Select from "components/Select/Select";
import dashboardSchema from './Schema'
import helperForm from './Helper'
import { selectProfile } from "app/auth/auth";
import { useAppSelector } from "app/hooks";
import NcImage from "components/NcImage/NcImage";

const DashboardEditProfile = () => {
  interface Profile {
    email: string;
    firstName: string;
    lastName: string;
    pic: string;
    _id?: string;
    location: string;
    bgImage: string;
    username: string;
    coverPhoto: Blob | null;
    avatar: Blob | null;
    id?: string;
  } 
  const [initialValues, setInitialValues] = useState<Profile | null>(null);
  const profile = useAppSelector(selectProfile)
  const { profileSubmitHandler } = helperForm();

  useEffect(()=>{
    if(profile){
      setInitialValues({ email: profile.email || '', firstName: profile.firstName || '', 
        lastName: profile.lastName || '', pic: profile.pic || '', id: profile._id || '',
        location: profile.location || '', avatar: null, coverPhoto: null, bgImage: profile.bgImage || '',
        username: profile.username || ''
      })
    }
  },[profile])

  if(!initialValues) return <></>
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <Formik
          initialValues={initialValues}
          validationSchema={dashboardSchema.profileSchema}
          onSubmit={profileSubmitHandler}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="grid md:grid-cols-2 gap-6">
            <div className="block md:col-span-2">
            <div className="block md:col-span-2">
              <div className="rounded-3xl md:rounded-[20px] relative aspect-w-16 aspect-h-8 sm:aspect-h-7 xl:sm:aspect-h-6 overflow-hidden ">
                <NcImage
                  containerClassName="absolute inset-0"
                  src={`${values['coverPhoto'] ? URL.createObjectURL(values['coverPhoto']) : values['bgImage']}`}
                  className="object-cover w-full h-full"
                />
                 <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125" 
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" 
                      stroke-linejoin="round">
                    </path>
                  </svg>
                  <span className="mt-1 text-xs">Change Cover Photo</span>
                </div>
                <input
                  name="coverPhoto" accept='.png, .jpg, .jpeg'
                  onChange={(e) => e.target.files && setFieldValue(e.target.name, e.target.files[0])}
                  type="file" className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="relative container -mt-20 lg:-mt-15">
                <div className='flex-shrink-0 flex items-center justify-center'>
                <div className="relative rounded-full overflow-hidden flex">
                  <img src={`${values['avatar'] ? URL.createObjectURL(values['avatar']) : values['pic']}`} 
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
                  <input accept='.png, .jpg, .jpeg' name='avatar' 
                    onChange={(e) => e.target.files && 
                    setFieldValue(e.target.name, e.target.files[0])} 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              </div>
              </div>
            </div>              
            </div>
            <label className="block">
              <Label>First name</Label>
              <Input 
                values={values['firstName']} name='firstName' errors={errors} touched={touched} 
                setFieldValue={setFieldValue}
                placeholder="Example Doe" type="text" className="mt-1" 
              />
            </label>
            <label className="block">
              <Label>Last name</Label>
              <Input values={values['lastName']} name='lastName' errors={errors} touched={touched} 
                setFieldValue={setFieldValue} type="text" className="mt-1" />
            </label>
            <label className="block">
              <Label>User name</Label>
              <Input values={values['username']} name='username' errors={errors} touched={touched} 
                setFieldValue={setFieldValue} type="text" className="mt-1" />
            </label>
           
            <label className="block">
              <Label>Location</Label>
              <Input values={values['location']} name='location' errors={errors} touched={touched} 
                setFieldValue={setFieldValue} type="text" className="mt-1" />
            </label>
            <label className="block md:col-span-2">
              <Label> Email address</Label>
              <Input
                type="email"
                values={values['email']} name='email' errors={errors} touched={touched} 
                setFieldValue={setFieldValue}
                className="mt-1"
              />
            </label>
            <ButtonPrimary className="md:col-span-2" type="submit">
              Update profile
            </ButtonPrimary>
          </Form>
          )}
      </Formik>
    </div>
  );
};

export default DashboardEditProfile;
