import { useDispatch } from 'react-redux';
import { RegisterUser, SignIn, RegisterBlogger } from '../../Actions/AuthAction';

const HelperAuth = () => {
  const dispatch = useDispatch();

  const loginSubmitHandler = (values) => {
    dispatch(SignIn(values))
  };

  const registerSubmitHandler = (values) => {
    dispatch(RegisterUser(values));
  };

  const registerBloggerSubmitHandler = (values) => {
    dispatch(RegisterBlogger(values));
  };

  const handleAvatarClick = () => {
    console.log("handleAvatarClick");
  }

  return { loginSubmitHandler, registerSubmitHandler, handleAvatarClick, registerBloggerSubmitHandler };
};

export default HelperAuth;
