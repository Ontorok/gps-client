import { Group, LocalShipping, PostAdd, Public } from '@material-ui/icons';
import React from 'react';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: 'Configuration',
    type: 'section',
    children: [
      {
        name: 'Users',
        type: 'item',
        icon: <Group />,
        link: '/users'
      },
      {
        name: 'Club',
        type: 'item',
        icon: <Public />,
        link: '/club'
      },
      {
        name: 'Groomer',
        type: 'item',
        icon: <LocalShipping />,
        link: '/groomer'
      }
    ]
  },
  {
    name: 'Operation',
    type: 'section',
    children: [
      {
        name: 'Entries',
        type: 'item',
        icon: <PostAdd />,
        link: '/entries'
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
    name: 'Configuration',
    type: 'collapse',
    children: [
      {
        name: 'Users',
        type: 'item',
        icon: <Group />,
        link: '/users'
      },
      {
        name: 'Club',
        type: 'item',
        icon: <Public />,
        link: '/club'
      },
      {
        name: 'Groomer',
        type: 'item',
        icon: <LocalShipping />,
        link: '/groomer'
      }
    ]
  },
  {
    name: 'Operation',
    type: 'collapse',
    children: [
      {
        name: 'Entries',
        type: 'item',
        icon: <PostAdd />,
        link: '/entries'
      }
    ]
  }
];
