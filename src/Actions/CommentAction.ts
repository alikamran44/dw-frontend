import baseApi from '../baseApi';
import { toast } from 'react-toastify';

export const createComment = (data: any) => {
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

export const getComments = ( id: any, num: any ) =>  
{
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

export const replyComment = (data: any) => {
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

export const updateComment = (data: any) => {
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

export const likeComment = (id: any) => {
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

export const deleteComment = (_id: any) => {
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