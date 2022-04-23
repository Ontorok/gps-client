import CmtVerticalLayout from '@coremat/CmtLayouts/Vertical';
import CmtContent from '@coremat/CmtLayouts/Vertical/Content';
import CmtHeader from '@coremat/CmtLayouts/Vertical/Header';
import CmtSidebar from '@coremat/CmtLayouts/Vertical/Sidebar';
import SidebarToggleHandler from '@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import { Hidden } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { HEADER_TYPE, SIDEBAR_TYPE } from '../../../../constants/ThemeOptions';
import ContentLoader from '../../../ContentLoader';
import defaultContext from '../../../contextProvider/AppContextProvider/defaultContext';
import SideBar from '../../partials/SideBar';
import SidebarHeader from '../../partials/SidebarHeader';
import Alerts from './Alerts';

const useStyles = makeStyles(theme => ({
  minimalNoHeader: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '& .Cmt-toggle-menu': {
      color: theme.palette.text.primary,
      marginLeft: 15
    }
  }
}));

const layoutOptions = {
  headerType: HEADER_TYPE.STATIC,
  sidebarType: SIDEBAR_TYPE.MINI,
  isSidebarFixed: defaultContext.isSidebarFixed,
  isSidebarOpen: false,
  miniSidebarWidth: 80,
  layoutStyle: defaultContext.layoutType
};
const MinimalNoHeader = ({ className, children }) => {
  const classes = useStyles();

  return (
    <CmtVerticalLayout
      layoutOptions={layoutOptions}
      className={clsx('verticalMinimalNoHeaderLayout', className)}
      header={
        <CmtHeader className={classes.minimalNoHeader}>
          <Hidden lgUp>
            <SidebarToggleHandler edge="start" color="inherit" aria-label="menu" />
          </Hidden>
          <Alerts />
        </CmtHeader>
      }
      sidebar={
        <CmtSidebar>
          <SidebarHeader />
          <SideBar />
        </CmtSidebar>
      }>
      <CmtContent>
        {children}
        <ContentLoader />
      </CmtContent>
    </CmtVerticalLayout>
  );
};

export default MinimalNoHeader;
