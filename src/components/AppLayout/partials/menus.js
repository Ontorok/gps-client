import { PostAdd } from '@material-ui/icons';
import React from 'react';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
      {
        name: 'Users',
        type: 'item',
        icon: <PostAdd />,
        link: '/users'
      },
      {
        name: 'Entries',
        type: 'item',
        icon: <PostAdd />,
        link: '/entries'
      },
      {
        name: 'Club',
        type: 'item',
        icon: <PostAdd />,
        link: '/club'
      },
      {
        name: 'Groomer',
        type: 'item',
        icon: <PostAdd />,
        link: '/groomer'
      }
    ]
  }
];

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

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: 'Users',
        type: 'item',
        icon: <PostAdd />,
        link: '/users'
      },
      {
        name: 'Entries',
        type: 'item',
        icon: <PostAdd />,
        link: '/entries'
      },
      {
        name: 'Club',
        type: 'item',
        icon: <PostAdd />,
        link: '/club'
      },
      {
        name: 'Groomer',
        type: 'item',
        icon: <PostAdd />,
        link: '/groomer'
      }
    ]
  }
];
