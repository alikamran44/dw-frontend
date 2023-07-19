import axios from 'axios';

const API_ROOT = 'http://127.0.0.1:5000/api';
export const APP_NAME = 'Daily World';
let token;

// axios.interceptors.request.use(
//   config => {
//     config.headers.accept = "application/json";
//       config.headers.authorization = `Bearer ${token}`;
//       config.headers['Content-Type'] = 'application/json';
//       return config;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
const getRequestConfig = () => {
  let auth = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  return {
    headers: {
      accept: 'application/json',
      authorization: `${auth ? `Bearer ${auth?.token}` : ''}`,
      'Content-Type': 'application/json',
    },
  };
};

const requests = {
  get: async url => {
    const config = getRequestConfig();
    return await axios.get(`${API_ROOT}${url}`, { ...config }).then(responseBody => {
      return responseBody.data;
    });
  },
  put: async (url, body) => {
    const config = getRequestConfig();
    return await axios.put(`${API_ROOT}${url}`, body, { ...config }).then(responseBody => {
      return responseBody.data;
    });
  },
  delete: async url => {
    const config = getRequestConfig();
    return await axios.delete(`${API_ROOT}${url}`, { ...config }).then(responseBody => {
      return responseBody.data;
    });
  },
  post: async (url, body) => {
    const config = getRequestConfig();
    return await axios.post(`${API_ROOT}${url}`, body, { ...config }).then(responseBody => {
      return responseBody.data;
    });
  },
};

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};
const getMediaConfig = () => {
  let auth = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  return {
    headers: {
      authorization: `${auth ? `Bearer ${auth?.token}` : ''}`,
      'content-type': 'multipart/form-data'
    },
  };
};

const Auth = {
  allBloggers: (values) =>
    requests.post('/user/all/blogger', values),
  allUsers: () => 
    requests.get('/user'),
  login: (values) =>
    requests.post('/user/login', values),
  toatalUserBlogs: (values) =>
    requests.post('/user/total/blogs', values),
  register: (values) =>
    requests.post('/user', values),
  registerBlogger: (values) =>
    axios.post(`${API_ROOT}`+'/user/blogger',values,config),
  fetchUserProfile: () => 
    requests.get('/user/profile'),
  ___register: ( values ) =>
    axios.post(`${API_ROOT}`+'/user',{data: values},config
  ),
  removeUser:(id) => 
    requests.delete('/user/'+id),
  updateUser: (values,id) =>
    axios.put(`${API_ROOT}`+`/user/${id}`,values,getMediaConfig()),
  updateProfile: (values,id) =>
    requests.put(`/user/${id}`, values),

//   role: (values) =>
//     requests.get('/admin/roles', values),
//   roleCreate: (values) =>
//     requests.post('/admin/roles', values),
//   save: user =>
//     requests.put('/user', { user }),
//   getCategory: () =>
//     requests.get('/admin/categories'),
};
const Post = {
  fetchHomePosts: () => 
    requests.get('/home/blogs'),
  fetchRecentPosts: () => 
    requests.get('/blogs/recent'),
  fetchPost: (slug) => 
    requests.get('/blog/'+slug),
  fetchPosts: (data) =>  
    requests.post('/blogs/', data),
  blogsType: (data) =>  
    requests.post('/blogs-type', data),
  createPost: (values) =>
    requests.post('/blog', values),
  updatePost: (values) =>
    requests.put(`/blog/${values.id}`, values),
  uploadFile: ( values ) =>
    axios.post(`${API_ROOT}`+'/media',values,config
  ),
  fetchMediaFiles: (id) => 
    requests.post(`/media/folder`,id),
  fetchMedia: (id) => 
    requests.get(`/media/${id}`),
  fetchUserBlogs: (id, data) => 
    requests.post(`/blogs/user/${id}`, data),
  fetchUserPublicBlogs: (id, filter) => 
    requests.post(`/blogs/public/user/${id}`, filter),
  removeBlog: (id) => 
    requests.delete('/blog/'+id),
  bookmarkBlog: (id) => 
    requests.post(`/blog/bookmark/${id}`),
  likeBlog: (id) => 
    requests.post(`/blog/like/${id}`),
  relatedBog: (data) => 
    requests.post(`/blogs/related`, data),
  searchBlog: (slug,data) => 
    requests.post(`/search/blogs/${slug}`,data),
  changeBlogPrivacy: (id,data) => 
    requests.put(`/blog/${id}`,{data}),
};

const Category = {
  fetchCategories: () => 
    requests.get('/category'),
  viewCategory: (id) => 
    requests.get(`/category/${id}`),
  fetchCategory: (slug, data) => 
    requests.post(`/category/fetch/${slug}`, data), 
  createCategory: (values) =>
    requests.post('/category', values),
  deleteCategory: (id) =>
    requests.delete(`/category/${id}`),
  updateCategory: (values,id) =>
    requests.put(`/category/${id}`, values),
  navCategories: () => 
    requests.get('/category/navbar'),
  categoryWithTotalBlogs: (data) => 
    requests.post('/category/total/blogs',data),
};

const Tag = {
  fetchTags: () => 
    requests.get('/tags'),
  fetchTag: (slug, data) => 
    requests.post(`/tag/fetch/${slug}`, data), 
  viewtag: (id) => 
    requests.get(`/tag/${id}`),
  createTag: (values) =>
    requests.post('/tag', values),
  deleteTag: (id) =>
    requests.delete(`/tag/${id}`),
  updateTag: (values,id) =>
    requests.put(`/tag/${id}`, values),
  tagWithTotalBlogs: (data) => 
    requests.post('/tag/total/blogs', data),
};

const Comment = {
  fetchComments: (id, num, limit) => 
    requests.get(`/comments/blog/${id}?page=${num}&limit=${limit}`),
  createComment: (values) =>
    requests.post('/comment', values),
  likeComment: (id) => 
     requests.post(`/comment/like/${id}`),
  deleteComment: (id) =>
    requests.delete(`/comment/${id}`),
  replyComment: (data) =>
    requests.post(`/reply_comment`, data),
  updateComment: (id, data) => 
    requests.put(`/comment/${data._id}`, { data }),
  
};
export default {
  Auth,Post, Category, Tag, Comment,
  setToken: _token => { token = _token; }
};
