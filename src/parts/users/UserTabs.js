import { CustomTabControl } from 'components';
import React from 'react';
import ActiveUsers from './list/ActiveUsers';
import ArchiveUsers from './list/ArchiveUsers';

const UserTabs = () => {
  const components = [
    {
      index: 0,
      heading: 'Active',
      component: <ActiveUsers />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Archive',
      component: <ArchiveUsers />,
      hasPermission: true
    }
  ];
  return <CustomTabControl components={components.filter(item => item.hasPermission)} />;
};

export default UserTabs;
