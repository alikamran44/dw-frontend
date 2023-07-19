import axios from 'axios';
import baseApi from '../baseApi';
import { toggleLoadingRecent } from "../app/blog/blogSlice";
import { toast } from 'react-toastify';
import {
  FETCH_Media_FILES,  
  LOADINGSTART,
  LOADINGSTOP,
  UPDTAE_BLOG,
  TAGLOADINGSTOP,
  TAGLOADINGSTART,
  LOADINGRECENT
} from "./Types";
import {
  startLoading,
  stopLoading,
  fetchMediaFiles,
  uploadFile,
  FetchPost,
  FetchPosts,
  setLoadMoreLoading
} from "../app/blog/blogSlice";


export const CreatePost = (values) => (dispatch) => {
  dispatch(startLoading());
  return baseApi.Post.createPost(values).then(
   
    (data) => {
      Promise.resolve(dispatch(FetchPost( data ))).then(
        () => {
          dispatch(stopLoading())
          toast.success("Blog has been successfully created"); 
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
        error.message ||
        error.toString();

      dispatch(stopLoading())

      toast.error(message); 

      return Promise.reject();
    }
  );
};

export const  UpdatePost = (values) => (dispatch) => {
  dispatch(startLoading());
  return baseApi.Post.updatePost(values).then(
   
    (data) => {
      Promise.resolve(dispatch(FetchPost( data ))).then(
        () => {
          dispatch(stopLoading())
          toast.success("Blog has been successfully updated"); 
        });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
        error.message ||
        error.toString();

      dispatch(stopLoading())

      toast.error(message); 

      return Promise.reject();
    }
  );
};

export const FetchRecentPosts  = () => (dispatch) => {
   dispatch(startLoading());
  return baseApi.Post.fetchRecentPosts().then(
    (data) => {
      dispatch(stopLoading());
      return Promise.resolve(data)
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data?.msg ||
          error.message ||
          error.toString();
      dispatch(stopLoading());
      if(message !== 'Network Error'){
        toast.error(message);
      }
      return Promise.reject();
    }
  );
};

export const fetchPosts = (data) => (dispatch) => {
  // const {skip} = data
  //  if(skip === 0)
  //     dispatch({
  //       type: LOADINGSTART
  //     });
  //   else
  //     dispatch({
  //       type: LOAD_MORE_LOADING,payload: true
  //     });

  return baseApi.Post.fetchPosts(data).then(
    (res) => {
      // if(skip === 0)
      //   dispatch(stopLoading())
      //   else
      //     dispatch({
      //       type: LOAD_MORE_LOADING,payload: false
      //     });
      return Promise.resolve(res)
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data?.msg ||
          error.message ||
          error.toString();

       if(skip === 0)
          dispatch(stopLoading())
        else
          dispatch(setLoadMoreLoading( false));

      if(message !== 'Network Error'){
        toast.error(message);
      }

      return Promise.reject();
    }
  );
};

export const fetchHomePosts = () => (dispatch) => {
  dispatch(startLoading());
  return baseApi.Post.fetchHomePosts().then(
    (data) => {
      Promise.resolve(dispatch(FetchPosts( data ))).then(
        () => dispatch(stopLoading()));
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data?.msg ||
          error.message ||
          error.toString();

      dispatch({
        type: LOADINGSTOP
      });

      if(message !== 'Network Error'){
        toast.error(message);
      }

      return Promise.reject();
    }
  );
};

export const changeBlogPrivacy = (id,data)  => (dispatch) => {
   dispatch(startLoading());
  return baseApi.Post.changeBlogPrivacy(id,data).then(
   
    (data) => {
      dispatch(stopLoading())
     return data.blog;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
        error.message ||
        error.toString();

      dispatch(stopLoading())

      toast.error(message); 

      return Promise.reject();
    }
  );
}

export const fetchPost = (slug) => {
  return baseApi.Post.fetchPost(slug).then(
    (data) => {
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
          error.message ||
          error.toString();

      toast.error(message); 
      return Promise.reject();
    }
  );
};

export const searchBlog = (slug, data) => (dispatch) => {
  const {skip} = data
  if(skip === 0)
   dispatch(startLoading());
  else
    dispatch(setLoadMoreLoading( true));
  return baseApi.Post.searchBlog(slug, data).then(
    (data) => {
      if(skip === 0)
        dispatch({type: TAGLOADINGSTOP})
      else
        dispatch(setLoadMoreLoading( false));
      return Promise.resolve(data);
    },
    (error) => {
      if (error.response.status === 401)
        dispatch({ type: 'PAGE_LOADING', payload: false })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
       if(skip === 0)
        dispatch({type: TAGLOADINGSTOP})
      else
        dispatch(setLoadMoreLoading( false));
      if(message !== 'Network Error'){
        toast.error(message);
      }
      return Promise.reject();
    }
  );
};

export const blogsType = (data) => (dispatch) => {
  const {skip} = data
  if(skip === 0)
   dispatch(startLoading());
  else
    dispatch(setLoadMoreLoading( true));
  return baseApi.Post.blogsType(data).then(
    (data) => {
      if(skip === 0)
        dispatch({type: TAGLOADINGSTOP})
      else
        dispatch(setLoadMoreLoading( false));
      return Promise.resolve(data);
    },
    (error) => {
      if (error.response.status === 401)
        dispatch({ type: 'PAGE_LOADING', payload: false })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
       if(skip === 0)
        dispatch({type: TAGLOADINGSTOP})
      else
        dispatch(setLoadMoreLoading( false));
      if(message !== 'Network Error'){
        toast.error(message);
      }
      return Promise.reject();
    }
  );
};

export const likeBlog = (id) => (dispatch) => {
   dispatch(startLoading());
  return baseApi.Post.likeBlog(id).then(
    (data) => {
      dispatch(stopLoading());
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
          error.message ||
          error.toString();
      dispatch(stopLoading());
      return Promise.reject();
    }
  );
}

export const bookmarkBlog = (id) => {
  return baseApi.Post.bookmarkBlog(id).then(
    (data) => {
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
          error.message ||
          error.toString();
      return Promise.reject();
    }
  );
}

export const removeBlog = (id)  => (dispatch) => {
  return baseApi.Post.removeBlog(id).then(
    (data) => {
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
          error.message ||
          error.toString();

      toast.error(message); 
      return Promise.reject();
    }
  );
}

export const UploadFile = (values) => (dispatch) => {
  console.log(values,'valuesvaluesvalues')
  const formData = new FormData();
  // formData.append('fileFolder', values['fileFolder']) 
  // if(values['image']){
  //   formData.append('file', values['file'])
  // }else if(values['url']){
  //   formData.append('url', values['url'])
  // }
  Object.keys(values).map(key => {
    if (values[key] !== null && values[key] !== '' && values[key] !== undefined) {
      formData.append(key, values[key]);
    } 
  });
   

  return baseApi.Post.uploadFile(formData).then(
    (data) => {
        return data.data.media;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
        error.message ||
        error.toString();
      toast.error(message); 
      return Promise.reject();
    }
  );
};


export const FetchMediaFiles = (id) => (dispatch) => {
  dispatch(startLoading());
  return baseApi.Post.fetchMediaFiles(id).then(
    (data) => {
      Promise.resolve(dispatch(fetchMediaFiles(data))).then(
        () =>   dispatch(stopLoading()) );
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
        error.message ||
        error.toString();
      dispatch(stopLoading())
      toast.error(message); 
      return Promise.reject();
    }
  );
};

export const FetchMedia = (id) => (dispatch) => {
  dispatch(startLoading());
  return baseApi.Post.fetchMedia(id).then(
    (data) => {
      dispatch(stopLoading())
      return Promise.resolve(data)
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
        error.message ||
        error.toString();

      dispatch(stopLoading())

      toast.error(message); 

      return Promise.reject();
    }
  );
};

export const fetchUserBlogs = (id,data) => (dispatch) => {
  dispatch(startLoading())
  return baseApi.Post.fetchUserBlogs(id,data).then(
    (data) => {
      dispatch(stopLoading())
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
          error.message ||
          error.toString();
      dispatch(stopLoading())
      toast.error(message); 
      return Promise.reject();
    }
  );
};

export const relatedBog = (data) => (dispatch) => {
  dispatch(startLoading())
  return baseApi.Post.relatedBog(data).then(
    (data) => {
      dispatch(stopLoading())
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
          error.message ||
          error.toString();
      dispatch(stopLoading())
      toast.error(message); 
      return Promise.reject();
    }
  );
};

export const fetchUserPublicBlogs = (id, filter) => (dispatch) => {
  dispatch(startLoading())
  return baseApi.Post.fetchUserPublicBlogs(id, filter).then(
    (data) => {
      dispatch(stopLoading())
      return data;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.response.data.msg ||
          error.message ||
          error.toString();
      dispatch(stopLoading())
      toast.error(message); 
      return Promise.reject();
    }
  );
};