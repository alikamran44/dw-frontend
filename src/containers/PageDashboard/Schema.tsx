import * as Yup from 'yup';
const dashboardSchema = {
    createPostSchema: Yup.object().shape({
      title: Yup.string()
      .min(10, 'Too Short!')
      .max(70, 'Too Long!')
        .required('Title is required'),
      description: Yup.string()
      .min(50, 'Too Short!')
      .max(300, 'Too Long!')
      .required('Required'),
      content: Yup.string().required('Required'),
      tags: Yup.array().min(1, 'At least one tag is required'),
      categories: Yup.array().min(1, 'At least one tag is required'),
      media: Yup.string().required('Title is required'),
      cover: Yup.string().required('Title is required'),
    }),
    Category: Yup.object().shape({
      category: Yup.string()
        .required('Category is required'),
      cover: Yup.string()
        .required('Background Image is required'),
    }),
    TagSchema: Yup.object().shape({
      name: Yup.string()
        .required('Tag is required'),
      cover: Yup.string()
        .required('Background Image is required'),
    }),
    profileSchema: Yup.object().shape({
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
    }),

}
export default dashboardSchema;