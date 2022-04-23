import CmtHorizontal from '@coremat/CmtNavigation/Horizontal';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import AppsMenu from '../../partials/Header/AppsMenu';
import HeaderMessages from '../../partials/Header/HeaderMessages';
import HeaderNotifications from '../../partials/Header/HeaderNotifications';
import { horizontalDefaultNavs } from '../../partials/menus';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const HeaderTopMenus = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CmtHorizontal menuItems={horizontalDefaultNavs} />
      <Box display="flex" alignItems="center" ml="auto">
        <AppsMenu />
        <HeaderMessages />
        <HeaderNotifications />
      </Box>
    </Box>
  );
};

export default HeaderTopMenus;
