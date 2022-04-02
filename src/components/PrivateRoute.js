import { useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authUser } = useSelector(({ auth }) => auth)

  return authUser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/login" />
  );

}
