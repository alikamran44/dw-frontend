import baseApi from '../baseApi';
import { toast } from 'react-toastify';
import {
    LOADING_COMMENT, GET_COMMENTS, UPDATE_COMMENT, UPDATE_REPLY, DELETE_COMMENT, DELETE_REPLY, CREATE_COMMENT
} from './Types'


export const createComment = (data) => {
    return baseApi.Comment.createComment(data).then(
        (data) => {
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
            toast.error(message);
            return Promise.reject();
        }
    );
}


export const getComments = (
    id, num
) =>  {
    let limit = 4;
    return baseApi.Comment.fetchComments(id, num, limit).then(
        (res) => {
            return Promise.resolve(res)
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


export const replyComment = (data) => {
    return baseApi.Comment.replyComment(data).then(
        (res) => {
            return Promise.resolve(res)
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

export const updateComment = (data) => {
    return baseApi.Comment.updateComment(data._id, data).then(
        (res) => {
          return Promise.resolve(res.data)
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

export const likeComment = (id) => {
  return baseApi.Comment.likeComment(id).then(
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

export const deleteComment = (_id) => {
    return baseApi.Comment.deleteComment(_id).then(
        (res) => {
           return Promise.resolve(res.data)
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