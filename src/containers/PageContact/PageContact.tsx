import React, { FC } from "react";
import { Formik, Form } from 'formik';
import { useHistory } from "react-router-dom";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import LayoutPage from "components/LayoutPage/LayoutPage";
import SocialsList from "components/SocialsList/SocialsList";
import Textarea from "components/Textarea/Textarea";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";

export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  const history = useHistory();
  const initialValues = { email: '', message: '', fullName: '' };
  const sendMessage = () => {
    history.push("/thanks");
  }
  return (
    <div className={`nc-PageContact ${className}`} data-nc-id="PageContact">
      <Helmet>
        <title>Contact || Daily World</title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us message and we will get back for you."
        headingEmoji=""
        heading="Contact us"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="max-w-sm space-y-6">
            {info.map((item, index) => (
              <div key={index}>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  {item.title}
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </span>
              </div>
            ))}
            <div>
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                🌏 SOCIALS
              </h3>
              <SocialsList className="mt-2" />
            </div>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
          <div>
            <Formik
              initialValues={initialValues}
              // validationSchema={authSchema.loginSchema}
              onSubmit={sendMessage}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form  className="grid grid-cols-1 gap-6">
                  <label className="block">
                    <Label>Full name</Label>

                    <Input 
                      values={values['fullName']} name='fullName' errors={errors} touched={touched} 
                      setFieldValue={setFieldValue} type="text" 
                      className="mt-1" 
                    />
                  </label>
                  <label className="block">
                    <Label>Email address</Label>

                    <Input
                      values={values['email']} name='email' errors={errors} touched={touched} 
                      setFieldValue={setFieldValue} type="email" placeholder="example@example.com"
                      className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>Message</Label>

                    <Textarea values={values['message']} name='message' errors={errors} touched={touched} 
                      setFieldValue={setFieldValue} className="mt-1" rows={6} 
                    />
                  </label>
                  <ButtonPrimary type="submit">Send Message</ButtonPrimary>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </LayoutPage>

      {/* OTHER SECTIONS */}
      <div className="container pb-16 lg:pb-28">
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageContact;
