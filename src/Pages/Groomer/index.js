import PageContainer from 'components/PageComponents/layouts/PageContainer';
import GroomerTabs from 'parts/groomers/GroomerTabs';
import React from 'react';
import IntlMessages from 'utils/IntlMessages';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.main'} />, link: '/' },
  { label: 'Groomers', isActive: true }
];

const GroomerList = () => {
  return (
    <PageContainer heading="Groomers" breadcrumbs={breadcrumbs}>
      <GroomerTabs />
    </PageContainer>
  );
};

export default GroomerList;
