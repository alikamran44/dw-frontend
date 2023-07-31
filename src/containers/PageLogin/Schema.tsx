import * as Yup from 'yup';
const authSchema = {
    loginSchema: Yup.object().shape({
        password: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
      }),

      registerSchema: Yup.object().shape({
        firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        // gender: Yup.string()
        // .required('Please choose gender'),
       password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(8, 'Password must be at most 8 characters')
        .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
        }),

      registerBloggerSchema: Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
        .required('Required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        username: Yup.string()
          .matches(/^[A-Za-z][A-Za-z0-9_]*$/, 'Username must start with an alphabet and can only contain letters, numbers, and underscore')
          .min(2, 'Too Short!')
          .max(20, 'Too Long!')
          .required('Required'),
        about: Yup.string()
          .min(20, 'Too Short!')
          .max(100, 'Too Long!')
          .required('Required'),
        jobName: Yup.string()
          .required('Please Select Job'),
        pic: Yup.string()
          .required('Please Select Profile Picture'),
        bgImage: Yup.string()
          .required('Please Select Cover Photo'),
        email: Yup.string().email('Invalid email').required('Required'),
        gender: Yup.string()
          .required('Please choose gender'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .max(8, 'Password must be at most 8 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required'),
        }),
}
export default authSchema;