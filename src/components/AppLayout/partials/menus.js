import { PostAdd } from '@material-ui/icons';
import React from 'react';
import IntlMessages from '../../../utils/IntlMessages';

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/users'
      }
    ]
  }
];
