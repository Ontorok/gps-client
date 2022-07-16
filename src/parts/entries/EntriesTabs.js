import { CustomTabControl } from 'components';
import React from 'react';
import GroomingEntries from './list/FundedEntries';
import InvalidEntries from './list/InvalidEntries';
import NonGroomingEntries from './list/NonFundedEntries';

const UserTabs = () => {
  const components = [
    {
      index: 0,
      heading: 'Funded Entries',
      component: <GroomingEntries />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Non-Funded Entries',
      component: <NonGroomingEntries />,
      hasPermission: true
    },
    {
      index: 2,
      heading: 'Invalid Entries',
      component: <InvalidEntries />,
      hasPermission: true
    }
  ];
  return <CustomTabControl components={components.filter(item => item.hasPermission)} />;
};

export default UserTabs;
