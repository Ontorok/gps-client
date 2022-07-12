import PageContainer from 'components/PageComponents/layouts/PageContainer';
import KnackApiData from 'parts/newEntries/KnackApiData';
import React from 'react';
import IntlMessages from 'utils/IntlMessages';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: 'New Entries', isActive: true }
];
const index = () => {
  return (
    <PageContainer heading="New Entries" breadcrumbs={breadcrumbs}>
      <KnackApiData />
    </PageContainer>
  );
};

export default index;
