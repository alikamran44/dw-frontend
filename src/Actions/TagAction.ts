import axios from 'axios';
import baseApi from '../baseApi';
import { toast } from 'react-toastify';
import { AppDispatch } from "app/store";

import {
  // fetchTags,
  createTag,
  startLoading,
  stopLoading,
  loadMoreLoading
} from "../app/tag/tagSlice";

export const CreateTag = (values: any) => (dispatch: AppDispatch): Promise<any> => {
  dispatch(startLoading())
  return baseApi.Tag.createTag(values).then(
    (data) => {
      // Promise.resolve(dispatch({type: CREATE_TAG, payload: data})).then(
      //   () =>{
      //     dispatch(stopLoading())
      //     toast.success("Tag is successfully added"); 
      //   });
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

export const FetchTags = () => (dispatch: AppDispatch) => {
    dispatch(startLoading())
    return baseApi.Tag.fetchTags().then(
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

export const deleteTag = (id: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading())
  return baseApi.Tag.deleteTag(id).then(
   
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

export const UpdateTag = (values: any, id: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading())
  return baseApi.Tag.updateTag(values, id).then(
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

export const tagWithTotalBlogs = (data: any) => (dispatch: AppDispatch) => {
  const {skip} = data
    if(skip === 0)
      dispatch(startLoading())
    else
      dispatch(loadMoreLoading(true));
  return baseApi.Tag.tagWithTotalBlogs(data).then(
    (res) => {
       if(skip === 0)
          dispatch(stopLoading())
        else
          dispatch(loadMoreLoading(false));
      return Promise.resolve(res);
    },
    (error) => {
      if (error.response.status === 401)
        dispatch(stopLoading())
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        if(skip === 0)
          dispatch(stopLoading())
        else
          dispatch(loadMoreLoading(false));
      if(message !== 'Network Error'){
        toast.error(message);
      }
      return Promise.reject();
    }
  );
};

export const fetchTag = (slug: any, data: any) => (dispatch: AppDispatch) => {
  const {skip} = data
  if(skip === 0)
    dispatch(startLoading())
  else
    dispatch(loadMoreLoading(true));
  return baseApi.Tag.fetchTag(slug,data).then(
    (data) => {
      if(skip === 0)
        dispatch(stopLoading())
      else
        dispatch(loadMoreLoading(false));
      return Promise.resolve(data);
    },
    (error) => {
      // if (error.response.status === 401)
      //   dispatch({ type: 'PAGE_LOADING', payload: false })
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
       if(skip === 0)
        dispatch(stopLoading())
      else
        dispatch(loadMoreLoading(false));
      if(message !== 'Network Error'){
        toast.error(message);
      }
      return Promise.reject();
    }
  );
};

export const viewTag = (id: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading())
  return baseApi.Tag.viewtag(id).then(
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

