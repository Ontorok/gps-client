import PageContainer from 'components/PageComponents/layouts/PageContainer';
import ClubTabs from 'parts/clubs/ClubTabs';
import React from 'react';
import IntlMessages from 'utils/IntlMessages';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: 'Clubs', isActive: true }
];

const ClubsList = () => {
  return (
    <PageContainer heading="Clubs" breadcrumbs={breadcrumbs}>
      <ClubTabs />
    </PageContainer>
  );
};

export default ClubsList;
