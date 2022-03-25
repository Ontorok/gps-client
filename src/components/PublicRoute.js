import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ component: Component, ...rest }) {
  const { authUser } = useAuth();

  return !authUser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/" />
  );
}
