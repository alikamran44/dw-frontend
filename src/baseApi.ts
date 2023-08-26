import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const isProduction: boolean = import.meta.env.MODE === 'production';
const API_ROOT: string | boolean | undefined = 
        import.meta.env.VITE_BASE_API;

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
interface RequestConfig {
  headers: {
    accept: string;
    authorization?: string;
    'Content-Type': string;
  };
}
const getRequestConfig = (): RequestConfig => {
  let auth = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null;
  return {
    headers: {
      accept: 'application/json',
      authorization: `${auth ? `Bearer ${auth?.token}` : ''}`,
      'Content-Type': 'application/json',
    },
  };
};

interface RequestMethods {
  get: (url: string) => Promise<any>;
  put: (url: string, body: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
  post: (url: string, body: any) => Promise<any>;
}

const requests: RequestMethods = {
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
  let auth = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null;
  return {
    headers: {
      authorization: `${auth ? `Bearer ${auth?.token}` : ''}`,
      'content-type': 'multipart/form-data'
    },
  };
};

const Auth = {
  allBloggers: (values: any) =>
    requests.post('/user/all/blogger', values),
  allUsers: (num: number, limit: number) => 
    requests.get(`/user?page=${num}&limit=${limit}`),
  login: (values: any) =>
    requests.post('/user/login', values),
  subscribe: (values: any) =>
    requests.post('/user/subscribe', values),
  toatalUserBlogs: (values: any) =>
    requests.post('/user/total/blogs', values),
  register: (values: any) =>
    requests.post('/user', values),
  registerBlogger: (values: any) =>
    axios.post(`${API_ROOT}`+'/user/blogger',values,config),
  fetchUserProfile: () => 
    requests.get('/user/profile'),
  ___register: ( values: any ) =>
    axios.post(`${API_ROOT}`+'/user',{data: values},config
  ),
  removeUser:(id: any) => 
    requests.delete('/user/'+id),
  updateUser: (values: any,id: any) =>
    axios.put(`${API_ROOT}`+`/user/${id}`,values,getMediaConfig()),
  updateProfile: (values: any,id: any) =>
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
  fetchPost: (slug: any) => 
    requests.get('/blog/'+slug),
  fetchPosts: (data: any) =>  
    requests.post('/blogs/', data),
  blogsType: (data: any) =>  
    requests.post('/blogs-type', data),
  createPost: (values: any) =>
    requests.post('/blog', values),
  updatePost: (values: any) =>
    requests.put(`/blog/${values.id}`, values),
  uploadFile: ( values: any ) =>
    axios.post(`${API_ROOT}`+'/media',values,config
  ),
  fetchMediaFiles: (id: any) => 
    requests.post(`/media/folder`,id),
  fetchMedia: (id: any) => 
    requests.get(`/media/${id}`),
  fetchUserBlogs: (id: any, data: any) => 
    requests.post(`/blogs/user/${id}`, data),
  fetchUserPublicBlogs: (id: any, filter: any) => 
    requests.post(`/blogs/public/user/${id}`, filter),
  removeBlog: (id: any) => 
    requests.delete('/blog/'+id),
  bookmarkBlog: (id: any) => 
    requests.post(`/blog/bookmark/${id}`,{}),
  likeBlog: (id: any) => 
    requests.post(`/blog/like/${id}`,{}),
  relatedBog: (data: any) => 
    requests.post(`/blogs/related`, data),
  searchBlog: (slug: any,data: any) => 
    requests.post(`/search/blogs/${slug}`,data),
  changeBlogPrivacy: (id: any,data: any) => 
    requests.put(`/blog/${id}`,{data}),
};

const Category = {
  fetchCategories: (num: number, limit: number) => 
    requests.get(`/category?page=${num}&limit=${limit}`),
  viewCategory: (id: any) => 
    requests.get(`/category/${id}`),
  fetchCategory: (slug: any, data: any) => 
    requests.post(`/category/fetch/${slug}`, data), 
  createCategory: (values: any) =>
    requests.post('/category', values),
  deleteCategory: (id: any) =>
    requests.delete(`/category/${id}`),
  updateCategory: (values: any,id: any) =>
    requests.put(`/category/${id}`, values),
  navCategories: () => 
    requests.get('/category/navbar'),
  categoryWithTotalBlogs: (data: any) => 
    requests.post('/category/total/blogs',data),
};

const Tag = {
  fetchTags: (num: number, limit: number) => 
    requests.get(`/tags?page=${num}&limit=${limit}`),
  fetchTag: (slug: any, data: any) => 
    requests.post(`/tag/fetch/${slug}`, data), 
  viewtag: (id: any) => 
    requests.get(`/tag/${id}`),
  createTag: (values: any) =>
    requests.post('/tag', values),
  deleteTag: (id: any) =>
    requests.delete(`/tag/${id}`),
  updateTag: (values: any,id: any) =>
    requests.put(`/tag/${id}`, values),
  tagWithTotalBlogs: (data: any) => 
    requests.post('/tag/total/blogs', data),
};

const Comment = {
  fetchComments: (id: any, num: any, limit: any) => 
    requests.get(`/comments/blog/${id}?page=${num}&limit=${limit}`),
  createComment: (values: any) =>
    requests.post('/comment', values),
  likeComment: (id: any) => 
     requests.post(`/comment/like/${id}`,{}),
  deleteComment: (id: any) =>
    requests.delete(`/comment/${id}`),
  replyComment: (data: any) =>
    requests.post(`/reply_comment`, data),
  updateComment: (id: any, data: any) => 
    requests.put(`/comment/${data._id}`, { data }),
  
};
export default {
  Auth,Post, Category, Tag, Comment,
  setToken: (_token: string) => { token = _token; }
};
