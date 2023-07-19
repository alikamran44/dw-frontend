import baseApi from '../baseApi';
import { toast } from 'react-toastify';
import {
    CREATE_CATEGORY,
    FETCH_CATEGORIES,
    LOADINGSTART,
    LOADINGSTOP,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    LOAD_MORE_LOADING
} from "./Types";

import {
  fetchCategories,
  createCategory,
  startLoading,
  stopLoading,
  loadMoreLoading
} from "../app/category/categorySlice";


export const CreateCategory = (values) => (dispatch) => {
  dispatch(startLoading())
  return baseApi.Category.createCategory(values).then(
   
    (data) => {
      toast.success("Category is successfully added"); 
      dispatch(stopLoading())
      return Promise.resolve(data)
      /*Promise.resolve(dispatch({type: CREATE_CATEGORY, payload: data})).then(
        () => {
          dispatch(stopLoading())
          toast.success("Category is successfully added"); 
      });*/
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
      toast.error(message); 
      return Promise.reject();
    }
  );
};

export const updateCategory = (values, id) => (dispatch) => {
  // dispatch(stopLoading())
  return baseApi.Category.updateCategory(values, id).then(
    (data) => {
      dispatch(stopLoading())
      return Promise.resolve(data.data)
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

export const FetchCategories = () => (dispatch) => {
    dispatch(startLoading())
    return baseApi.Category.fetchCategories().then(
      (data) => {
        dispatch(stopLoading())
        return Promise.resolve(data.categories)
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


  export const deleteCategory = (id) => (dispatch) => {
     dispatch(startLoading())
    return baseApi.Category.deleteCategory(id).then(
      (data) => {
        Promise.resolve(data);
        dispatch(stopLoading())
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

  export const fetchCategory = (slug, data) => (dispatch) => {
     const {skip} = data
    if(skip === 0)
      dispatch({
        type: LOADINGSTART
      });
    else
      dispatch({
        type: LOAD_MORE_LOADING,payload: true
      });
    return baseApi.Category.fetchCategory(slug, data).then(
      (data) => {
        if(skip === 0)
          dispatch(stopLoading())
        else
          dispatch({
            type: LOAD_MORE_LOADING,payload: false
          });
        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.response.data.msg ||
          error.message ||
          error.toString();
        if(skip === 0)
          dispatch(stopLoading())
        else
          dispatch({
            type: LOAD_MORE_LOADING,payload: false
          });
       
        toast.error(message); 
        return Promise.reject();
      }
    );
  };

  export const categoryWithTotalBlogs = ( data ) => (dispatch) => {
    const {skip} = data
    if(skip === 0)
      dispatch(startLoading())
    else
      dispatch(loadMoreLoading(true));
     
    return baseApi.Category.categoryWithTotalBlogs(data).then(
      (data) => {
        if(skip === 0)
          dispatch(stopLoading())
        else
          dispatch(loadMoreLoading(false));
        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.response.data.msg ||
          error.message ||
          error.toString();
        if(skip === 0)
          dispatch(stopLoading())
        else
          dispatch(loadMoreLoading(false));
       
        toast.error(message); 
        return Promise.reject();
      }
    );
  };

  export const viewCategory = (id) => (dispatch) => {
    dispatch({
      type: LOADINGSTART,
    });
    return baseApi.Category.viewCategory(id).then(
      (data) => {
        dispatch(stopLoading())
        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.response.data.msg ||
          error.message ||
          error.toString();
        dispatch({
          type: LOADINGSTOP,
        });
        toast.error(message); 
        return Promise.reject();
      }
    );
  };

  export const NavCategories = () => (dispatch) => {
    dispatch({
      type: LOADINGSTART,
    });
    return baseApi.Category.navCategories().then(
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
        dispatch({
          type: LOADINGSTOP,
        });
        toast.error(message); 
        return Promise.reject();
      }
    );
  };