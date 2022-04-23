import PageContainer from 'components/PageComponents/layouts/PageContainer';
import EntriesTabs from 'parts/entries/EntriesTabs';
import React from 'react';
import IntlMessages from 'utils/IntlMessages';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: 'Entries', isActive: true }
];

const UsersList = () => {
  return (
    <PageContainer heading="Entries" breadcrumbs={breadcrumbs}>
      <EntriesTabs />
    </PageContainer>
  );
};

export default UsersList;
