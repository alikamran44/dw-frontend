import React, {useEffect} from "react";
import MyRouter from "routers/index";
import {AlertBox} from "components/Alert";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectUser, setPageLoading, selectProfile, selectPageLoading, 
selectLoading } from "app/auth/auth";
import { fetchUserProfile } from './Actions/AuthAction';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import baseApi from './baseApi';

function App() {
  const user = useAppSelector(selectUser);
  const pageLoading = useAppSelector(selectPageLoading);
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(user && !profile){
      dispatch(fetchUserProfile());
      baseApi.setToken(user?.token);
    }
    else{
      dispatch(setPageLoading(false))
    }
  }, [user]);
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      {
          <div>
            <MyRouter />
            <AlertBox />
            <ToastContainer 
              position="bottom-left"
            />
          </div>
        
      }
    </div>
  );
}

export default App;
