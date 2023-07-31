import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "app/store";

interface User {
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
  pic: string;
  bgImage: string;
  email: string;
  token: string;
  password: string | null;
}

interface AlertProps {
  children?: any;
  containerClassName?: string;
  type?: "default" | "warning" | "info" | "success" | "error";
  title?: string;
  emoji?: any;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  showCancel?: boolean;
  alertAction: any;
  confirmButtonText?: any;
  cancelButtonText?: any;
}

interface LoginState {
  user: User | null;
  loading: boolean;
  profile: any | null; // Replace 'any' with the actual type of your profile if needed
  pageLoading: boolean;
  loadMoreLoading: boolean;
  confirmAlert: any | null;
  alert: AlertProps | null;
}

const userInfo = localStorage.getItem('userInfo');
const user = userInfo ? JSON.parse(userInfo) : null;
const initialState: LoginState = {
  user: user,
  loading: false,
  profile: null,
  pageLoading: true,
  loadMoreLoading: false,
  confirmAlert: null,
  alert: null,
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setUserProfile(state, action: PayloadAction<any>) {
      state.profile = action.payload;
    },
    logout(state) {
      localStorage.clear();
      state.user = null;
      state.profile = null;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setLoadMoreLoading(state, action) {
      state.loadMoreLoading = action.payload;
    },
    setPageLoading(state, action: PayloadAction<boolean>) {
      state.pageLoading = action.payload;
    },
    setAlert(state, action: PayloadAction<AlertProps>) {
      state.alert = action.payload;
    },
    removeAlert(state) {
      state.alert = null;
    },
    onConfirmAlert(state, action: PayloadAction<boolean>) {
      state.confirmAlert = action.payload;
    },
    onRemoveConfirmAlert(state) {
      state.confirmAlert = null;
    }
  },
});

export const { login, setUserProfile, startLoading, stopLoading, logout, setLoadMoreLoading, 
  setPageLoading, setAlert, removeAlert, onConfirmAlert, onRemoveConfirmAlert } = authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.login.user;
export const selectConfirmAlert = (state: RootState) => state.login.confirmAlert;
export const selectAlert = (state: RootState) => state.login.alert;
export const selectLoading = (state: RootState) => state.login.loading;
export const selectProfile = (state: RootState) => state.login.profile;
export const selectPageLoading = (state: RootState) => state.login.pageLoading;
export const selectLoadMoreLoading = (state: RootState) => state.login.loadMoreLoading;

export default authSlice.reducer;
