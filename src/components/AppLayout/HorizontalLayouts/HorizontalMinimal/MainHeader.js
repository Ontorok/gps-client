import SidebarToggleHandler from '@coremat/CmtLayouts/Horizontal/SidebarToggleHandler';
import CmtHorizontal from '@coremat/CmtNavigation/Horizontal';
import { alpha, Box, darken, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Group, LocalShipping, PostAdd, Public } from '@material-ui/icons';
import { ROLES } from 'constants/RolesConstants';
// import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { getPermittedNavMenus } from 'utils/commonHelper';
// import AppsMenu from '../../partials/Header/AppsMenu';
// import HeaderMessages from '../../partials/Header/HeaderMessages';
// import HeaderNotifications from '../../partials/Header/HeaderNotifications';
// import LanguageSwitcher from '../../partials/LanguageSwitcher';
import Logo from '../../partials/Logo';
// import SearchPopover from '../../partials/SearchPopover';
import UserDropDown from '../../partials/UserDropDown';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: 0,
    minHeight: 10,
    [theme.breakpoints.down('md')]: {
      paddingTop: 12,
      paddingBottom: 12
    },
    '& .Cmt-appIcon': {
      color: theme.palette.text.secondary,
      '&:hover, &:focus': {
        color: darken(theme.palette.text.secondary, 0.2)
      },
      [theme.breakpoints.down('xs')]: {
        padding: 7
      }
    },
    '& .Cmt-horizontalNavMenu': {
      position: 'static',
      '& .Cmt-navMegaBtn, & > .Cmt-navCollapse > .Cmt-navCollapseBtn': {
        minHeight: 64
      }
    }
  },
  langRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 15,
      paddingRight: 15
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 2,
      zIndex: 1,
      height: 35,
      width: 1,
      backgroundColor: alpha(theme.palette.common.dark, 0.15)
    }
  },
  searchIcon: {
    [theme.breakpoints.down('xs')]: {
      padding: 9
    }
  }
}));

const MainHeader = () => {
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

  const minimalHorizontalMenus = [
    {
      hasPermission: configurationParent,
      name: 'Configuration',
      type: 'collapse',
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
      type: 'collapse',
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

  const permittedMinimalHorizontalNavs = getPermittedNavMenus(minimalHorizontalMenus);

  return (
    <Toolbar className={classes.root}>
      <SidebarToggleHandler edge="start" color="inherit" aria-label="menu" />
      <Logo mr={{ xs: 2, sm: 4, lg: 6, xl: 8 }} color="white" />
      <Hidden mdDown>
        <CmtHorizontal menuItems={permittedMinimalHorizontalNavs} />
      </Hidden>

      <Box display="flex" alignItems="center" ml="auto">
        {/* <SearchPopover iconClassName={clsx(classes.searchIcon, 'Cmt-searchIcon')} /> */}
        {/* <AppsMenu /> */}
        {/* <HeaderMessages /> */}
        {/* <HeaderNotifications /> */}
        {/* <Box className={clsx(classes.langRoot, 'Cmt-i18n-switch')}>
          <LanguageSwitcher />
        </Box> */}
        <UserDropDown />
      </Box>
    </Toolbar>
  );
};

export default MainHeader;
