import axios from 'axios';
import baseApi from '../baseApi';
import { toast } from 'react-toastify';
import {
  login,
  logout,
  setUserProfile,
  startLoading,
  stopLoading,
  setLoadMoreLoading,
  setPageLoading,
  removeAlert,
  onConfirmAlert,
  onRemoveConfirmAlert
} from "../app/auth/auth";
import { AppDispatch } from "app/store";

export const RegisterBlogger = (values: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading())
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (key === 'pic') {
      formData.append(key, value as Blob, 'image.jpg'); // Type assertion is necessary for 'value' to be Blob
    } else {
      formData.append(key, value as any); // Type assertion is necessary for 'value' to be string
    }
  });
  return baseApi.Auth.registerBlogger(formData).then(
    (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      Promise.resolve(dispatch(login( data.data ))).then(
        () => dispatch(stopLoading()))
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(stopLoading())

      toast.error(message);

      return Promise.reject();
    }
  );
};
export const RegisterUser = (values: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading())
  return baseApi.Auth.register(values).then(
    (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data));
      Promise.resolve(dispatch(login( data ))).then(
        () => dispatch(stopLoading()));
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(stopLoading())

      toast.error(message);

      return Promise.reject();
    }
  );
};

export const SignIn = (values: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  return baseApi.Auth.login(values).then(
    (data) => {
      localStorage.setItem("jwt", data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      Promise.resolve(dispatch(login( data ))).then(
        () => dispatch(stopLoading()));
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(stopLoading())
      toast.error(message);

      return Promise.reject();
    }
  );
};

export const fetchUserProfile = () => (dispatch: AppDispatch) => {
  dispatch(setPageLoading(true));
  return baseApi.Auth.fetchUserProfile().then(
    (data) => {
      Promise.resolve(dispatch(setUserProfile(data.user))).then(
        () =>  dispatch(setPageLoading(false)));
    },
    (error) => {
      if (error.response.status === 401)
        dispatch(setPageLoading(false))
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if(error.response?.statusText && error.response?.statusText === 'Unauthorized'){
         localStorage.clear();
      }
      dispatch(setPageLoading(false))
      toast.error(message);

      return Promise.reject();
    }
  );
};

export const allBloggers = (filter:any) => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  return baseApi.Auth.allBloggers(filter).then(
    (data) => {
      dispatch(stopLoading());
      return Promise.resolve(data)
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

      dispatch(stopLoading());
      toast.error(message);

      return Promise.reject();
    }
  );
};

export const allUsers = () => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  return baseApi.Auth.allUsers().then(
    (data) => {
      dispatch(stopLoading());
      return Promise.resolve(data)
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

      dispatch(stopLoading());
      toast.error(message);

      return Promise.reject();
    }
  );
};
export const toatalUserBlogs = (values: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  return baseApi.Auth.toatalUserBlogs(values).then(
    (data) => {
      dispatch(stopLoading())
      return Promise.resolve(data)
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if(error.response?.statusText && error.response?.statusText === 'Unauthorized'){
         localStorage.clear();
      }
      dispatch(stopLoading())
      toast.error(message);

      return Promise.reject();
    }
  );
}; 

export const removeUser = (id: any)  => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  return baseApi.Auth.removeUser(id).then(
    (data) => {
      dispatch(stopLoading())
      return data;
    },
    (error) => {
      dispatch(stopLoading())
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

export const updateUser = (values: any, id: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading())
  const formData = new FormData();
  Object.keys(values).map(key => {
    if (values[key] !== null && values[key] !== '' && values[key] !== undefined) {
      formData.append(key, values[key]);
    } 
  });
  return baseApi.Auth.updateUser(formData, id).then(
    (res) => {
      dispatch(stopLoading())
      toast.success("Profile has been successfully updated");
      console.log(res.data,'res.datares.data')
      dispatch(login( res.data ))
      return Promise.resolve(res.data);
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

export const updateProfile = (values: any, id: any) => (dispatch: AppDispatch) => {
  dispatch(startLoading())
  return baseApi.Auth.updateProfile(values, id).then(
    (res) => {
      dispatch(stopLoading())
      toast.success("Profile has been successfully updated");
      return Promise.resolve(res.data);
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
// export const getUser = () => (dispatch) => {
//   axios
//     .get('../fakedata/userList.json')
//     .then((res) => dispatch({ type: 'GET_USER', payload: res.data }))
//     .catch((err) => dispatch({ type: 'GET_USER_ERR', payload: err }));
// };

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout())
  dispatch(removeAlert())
  dispatch(onRemoveConfirmAlert())
};


