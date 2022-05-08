import Error404 from 'Pages/404';
import ForgotPasswordPage from 'Pages/Auth/ForgotPassword';
import Login from 'Pages/Auth/Login';
import Register from 'Pages/Auth/Register';
import Dashboard from 'Pages/Dashboard';
import Profile from 'Pages/Profile/Profile';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import Club from './club';
import Entries from './entries';
import Groomer from './groomer';
import User from './users';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/dashboard'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/dashboard" component={Dashboard} />
        <RestrictedRoute path="/users" component={User} />
        <RestrictedRoute path="/club" component={Club} />
        <RestrictedRoute path="/groomer" component={Groomer} />
        <RestrictedRoute path="/entries" component={Entries} />
        <RestrictedRoute path="/profile" component={Profile} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
