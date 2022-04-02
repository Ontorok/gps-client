import { useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";
export default function PublicRoute({ component: Component, ...rest }) {
  const {
    auth: { authUser }, router: { location: { pathname } } } = useSelector(state => state);



  return !authUser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to={pathname} />
  );
}
