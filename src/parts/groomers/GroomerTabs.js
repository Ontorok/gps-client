import { CustomTabControl } from 'components';
import React from 'react';
import ActiveGroomers from './list/ActiveGroomers';
import ArchiveGroomers from './list/ArchiveGroomers';

const GroomerTabs = () => {
  const components = [
    {
      index: 0,
      heading: 'Active',
      component: <ActiveGroomers />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Archive',
      component: <ArchiveGroomers />,
      hasPermission: true
    }
  ];
  return <CustomTabControl components={components.filter(item => item.hasPermission)} />;
};

export default GroomerTabs;
