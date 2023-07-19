import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../app/auth/authSlice";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = useAppSelector(selectUser);
  const history = useHistory()
  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    history.push("/login");
    return null; // or a loading/error component
  }
};

export default PrivateRoute;