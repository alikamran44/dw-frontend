import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface User {
  // Define your user properties here
}

interface Profile {
  // Define your profile properties here
}

export interface AlertProps {
  children?: React.ReactNode;
  containerClassName?: string;
  type?: "default" | "warning" | "info" | "success" | "error";
  title?: string;
  emoji?: string;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  showCancel?: boolean;
  alertAction: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}


interface LoginState {
  user: User | null;
  loading: boolean;
  profile: Profile | null;
  pageLoading: boolean;
  loadMoreLoading: boolean;
  alert: object | null;
  confirmAlert: null;
}

const initialState: LoginState = {
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  loading: false,
  profile: null,
  pageLoading: true,
  loadMoreLoading: false,
  confirmAlert: false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setUserProfile(state, action: PayloadAction<Profile>) {
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
    setLoadMoreLoading(state, action: PayloadAction<boolean>) {
      state.loadMoreLoading = action.payload;
    },
    setPageLoading(state, action: PayloadAction<boolean>) {
      state.pageLoading = action.payload;
    },
    setAlert(state, action: PayloadAction<AlertProps>) {
      state.alert = action.payload;
    },
    removeAlert(state, action) {
      state.alert = null;
    },
    onConfirmAlert(state, action) {
      state.confirmAlert = action.payload;
    },
    onRemoveConfirmAlert(state) {
      state.confirmAlert = null;
    }
  },
});

export const {
  login,
  setUserProfile,
  startLoading,
  stopLoading,
  logout,
  setLoadMoreLoading,
  setPageLoading,
  setAlert,
  removeAlert,
  onConfirmAlert,
  onRemoveConfirmAlert
} = loginSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.login.user;
export const selectConfirmAlert = (state: RootState) => state.login.confirmAlert;
export const selectAlert = (state: RootState) => state.login.alert;
export const selectLoading = (state: RootState) => state.login.loading;
export const selectProfile = (state: RootState) => state.login.profile;
export const selectPageLoading = (state: RootState) => state.login.pageLoading;
export const selectLoadMoreLoading = (state: RootState) => state.login.loadMoreLoading;



export default loginSlice.reducer;
