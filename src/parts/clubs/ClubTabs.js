import { CustomTabControl } from 'components';
import React from 'react';
import ActiveClubs from './list/ActiveClubs';
import ArchiveClubs from './list/ArchiveClubs';

const ClubTabs = () => {
  const components = [
    {
      index: 0,
      heading: 'Active',
      component: <ActiveClubs />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Archive',
      component: <ArchiveClubs />,
      hasPermission: true
    }
  ];
  return <CustomTabControl components={components.filter(item => item.hasPermission)} />;
};

export default ClubTabs;
