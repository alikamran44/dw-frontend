import baseApi from '../baseApi';
import { toast } from 'react-toastify';

import {
  fetchCategories,
  createCategory,
  startLoading,
  stopLoading,
  loadMoreLoading
} from "../app/category/categorySlice";
import { AppDispatch } from "app/store";

export const CreateCategory = (values: any) => (dispatch: AppDispatch): Promise<any> => {
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

export const updateCategory = (values: any, id: any) => (dispatch: AppDispatch) => {
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

export const FetchCategories = (filter: any) => (dispatch: AppDispatch) => {
    const {skip, limit} = filter
    dispatch(startLoading())
    return baseApi.Category.fetchCategories(skip, limit).then(
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


export const deleteCategory = (id: any) => (dispatch: AppDispatch) => {
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

export const fetchCategory = (slug: any, data: any) => (dispatch: AppDispatch) => {
 const {skip} = data
if(skip === 0)
  dispatch(startLoading())
else
  dispatch(loadMoreLoading(true));
return baseApi.Category.fetchCategory(slug, data).then(
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

export const categoryWithTotalBlogs = ( data: any ) => (dispatch: AppDispatch) => {
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

export const viewCategory = (id: any) => (dispatch: AppDispatch) => {
dispatch(startLoading())
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
    dispatch(stopLoading())
    toast.error(message); 
    return Promise.reject();
  }
);
};

export const NavCategories = () => (dispatch: AppDispatch) => {
dispatch(startLoading())
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
    dispatch(stopLoading())
    toast.error(message); 
    return Promise.reject();
  }
);
};