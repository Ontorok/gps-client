import PageLoader from 'components/PageComponents/PageLoader';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Profile = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path={`${requestedUrl}`} component={lazy(() => import('../pages/Profile/Profile'))} />
      </Switch>
    </Suspense>
  );
};

export default Profile;