import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authUser } = useAuth();

  console.log(useAuth());

  return authUser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
