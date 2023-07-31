import { useDispatch } from 'react-redux';
import { RegisterUser, SignIn, RegisterBlogger } from '../../Actions/AuthAction';

const HelperAuth = () => {
  const dispatch = useDispatch();

  const loginSubmitHandler = (values: any) => {
    dispatch(SignIn(values))
  };

  const registerSubmitHandler = (values: any) => {
    dispatch(RegisterUser(values));
  };

  const registerBloggerSubmitHandler = (values: any) => {
    dispatch(RegisterBlogger(values));
  };

  const handleAvatarClick = () => {
    console.log("handleAvatarClick");
  }

  return { loginSubmitHandler, registerSubmitHandler, handleAvatarClick, 
  registerBloggerSubmitHandler };
};

export default HelperAuth;
