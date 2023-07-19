import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from "app/hooks";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Textarea from "components/Textarea/Textarea";
import { createComment } from '../../Actions/CommentAction';
import  { setAlert, 
          selectConfirmAlert, 
          onRemoveConfirmAlert, 
          removeAlert 
        } from "app/auth/authSlice";

export interface SingleCommentFormProps {
  className?: string;
  commentId?: number;
  onClickSubmit: (values?: any) => void;
  onClickCancel: (id?: number) => void;
  textareaRef?: React.MutableRefObject<null>;
  defaultValue?: string;
  rows?: number;
} 

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = "mt-5",
  commentId,
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue = "",
  rows = 4,
  commentsTemp,
  setComments,
  blog_id,
  blog_user_id
}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
   const confirmAlert = useAppSelector(selectConfirmAlert);
  const user = JSON.parse(localStorage.getItem('userInfo')) || null;
  const initialValues = { content: defaultValue ? defaultValue : '', email: user ? 
    user.email : '', name: '', userLoggedIn: user ? true : false 
  };

  const alertHandler = () => {
    dispatch(setAlert({
      children: "Please Login to Comment!",
      containerClassName: "",
      type: "default",
      title: "Login",
      emoji: "🚫",
      showCloseButton: true,
      showConfirmButton: true,
      alertAction : 'save',
      showCancel: true,
      confirmButtonText: "Login",
      cancelButtonText: "Stay",
    }));
  }
  useEffect(()=>{
    if(confirmAlert === 'save'){
      dispatch(onRemoveConfirmAlert())
      dispatch(removeAlert())
      history.push("/login");
    }
  },[confirmAlert])
 
  const commentSchema = Yup.object().shape({
        userLoggedIn: Yup.boolean(),
        name: Yup.string()
        .when('userLoggedIn', {
        is: false,
        then: (schema) => schema.required('Enter Your Name'),
    // otherwise: (schema) => schema.required('Enter  Name'),
      }),
           
      email: Yup.string()
        .when('userLoggedIn', {
        is: false,
        then: (schema) => schema.email('Invalid email').required('Required')
      }),
      content: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
  })
  if(!initialValues) return  <></>
  return (
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        onSubmit={onClickSubmit}
      >
      {({ errors,values, touched, setFieldValue, resetForm  }) => (
        <Form className={`nc-SingleCommentForm ${className}`} >
          <Textarea
            placeholder="Add to discussion"
            ref={textareaRef}
            name='content'
            setFieldValue={setFieldValue}
            values={values['content']}
            required={true}
            rows={rows}
          />
          <div className="mt-2 space-x-3">
            <ButtonPrimary onClick={() => {
                if(user){
                  onClickSubmit(values, resetForm )
                }else{
                  alertHandler()
                }
              }}
              type="button"
            >
              Submit
            </ButtonPrimary>
            <ButtonSecondary type="button" onClick={() => 
              onClickCancel(commentId)
            }>
              Cancel
            </ButtonSecondary>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SingleCommentForm;
