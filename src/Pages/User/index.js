import PageContainer from 'components/PageComponents/layouts/PageContainer';
import UserTabs from 'parts/users/UserTabs';
import React from 'react';
import IntlMessages from 'utils/IntlMessages';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: 'Users', isActive: true }
];

const UsersList = () => {
  return (
    <PageContainer heading="Users" breadcrumbs={breadcrumbs}>
      <UserTabs />
    </PageContainer>
  );
};

export default UsersList;
