import CmtVertical from '@coremat/CmtNavigation/Vertical';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Group, LocalShipping, PostAdd, Public } from '@material-ui/icons';
import { ROLES } from 'constants/RolesConstants';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import { getPermittedNavMenus } from 'utils/commonHelper';

const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)'
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)'
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)'
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)'
    }
  }
}));

const SideBar = () => {
  const classes = useStyles();
  const { authUser } = useSelector(({ auth }) => auth);
  const isAdmin = authUser?.role === ROLES.Admin || authUser?.role === ROLES.SuperAdmin;

  /* ----------------- Configuration--------------- */
  const configurationChilds = {
    usersPermisstion: isAdmin,
    clubsPermisstion: isAdmin,
    groomerPermisstion: true
  };
  const configurationParent = Object.values(configurationChilds).some(c => c);
  /* ----------------- Configuration--------------- */

  /* ----------------- Operation--------------- */
  const operationnChilds = {
    newEntriesPermisstion: isAdmin,
    entriesPermisstion: true
  };
  const operationParent = Object.values(operationnChilds).some(c => c);
  /* ----------------- Operation--------------- */
  const sidebarNavs = [
    {
      hasPermission: configurationParent,
      name: 'Configuration',
      type: 'section',
      children: [
        {
          hasPermission: configurationChilds.usersPermisstion,
          name: 'Users',
          type: 'item',
          icon: <Group />,
          link: '/users'
        },
        {
          hasPermission: configurationChilds.clubsPermisstion,
          name: 'Club',
          type: 'item',
          icon: <Public />,
          link: '/club'
        },
        {
          hasPermission: configurationChilds.groomerPermisstion,
          name: 'Groomer',
          type: 'item',
          icon: <LocalShipping />,
          link: '/groomer'
        }
      ]
    },
    {
      hasPermission: operationParent,
      name: 'Operation',
      type: 'section',
      children: [
        {
          hasPermission: operationnChilds.newEntriesPermisstion,
          name: 'New Entries',
          type: 'item',
          icon: <PostAdd />,
          link: '/new-entries'
        },
        {
          hasPermission: operationnChilds.entriesPermisstion,
          name: 'Entries',
          type: 'item',
          icon: <PostAdd />,
          link: '/entries'
        }
      ]
    }
  ];
  const permittedSidebarNavs = getPermittedNavMenus(sidebarNavs);

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={permittedSidebarNavs} />
    </PerfectScrollbar>
  );
};

export default SideBar;
