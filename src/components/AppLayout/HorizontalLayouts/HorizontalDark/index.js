import CmtHorizontalLayout from '@coremat/CmtLayouts/Horizontal';
import CmtContent from '@coremat/CmtLayouts/Horizontal/Content';
import CmtFooter from '@coremat/CmtLayouts/Horizontal/Footer';
import CmtHeader from '@coremat/CmtLayouts/Horizontal/Header';
import CmtHeaderMain from '@coremat/CmtLayouts/Horizontal/Header/HeaderMain';
import CmtHeaderNav from '@coremat/CmtLayouts/Horizontal/Header/HeaderNav';
import CmtHeaderTop from '@coremat/CmtLayouts/Horizontal/Header/HeaderTop';
import CmtSidebar from '@coremat/CmtLayouts/Horizontal/Sidebar';
import CmtHorizontal from '@coremat/CmtNavigation/Horizontal';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import React from 'react';
import { HEADER_TYPE } from '../../../../constants/ThemeOptions';
import ContentLoader from '../../../ContentLoader';
import defaultContext from '../../../contextProvider/AppContextProvider/defaultContext';
import Footer from '../../partials/Footer';
import HeaderLogin from '../../partials/Header/HeaderLogin';
import { horizontalDefaultNavs } from '../../partials/menus';
import SideBar from '../../partials/SideBar';
import HeaderMain from './HeaderMain';
import useStyles from './index.style';

const layoutOptions = {
  showFooter: true,
  headerType: HEADER_TYPE.STATIC,
  layoutStyle: defaultContext.layoutType
};
const HorizontalDark = ({ className, children }) => {
  const classes = useStyles();

  return (
    <CmtHorizontalLayout
      className={clsx('Cmt-horizontalDarkLayout', className)}
      layoutOptions={layoutOptions}
      header={
        <CmtHeader className={classes.appHeaderDark}>
          <CmtHeaderNav>
            <HeaderLogin />
          </CmtHeaderNav>
          <CmtHeaderTop>
            <HeaderMain />
          </CmtHeaderTop>
          <Hidden mdDown>
            <CmtHeaderMain>
              <CmtHorizontal menuItems={horizontalDefaultNavs} />
            </CmtHeaderMain>
          </Hidden>
        </CmtHeader>
      }
      sidebar={
        <CmtSidebar>
          <SideBar />
        </CmtSidebar>
      }
      footer={
        <CmtFooter type="static">
          <Footer />
        </CmtFooter>
      }>
      <CmtContent>
        {children}
        <ContentLoader />
      </CmtContent>
    </CmtHorizontalLayout>
  );
};

export default HorizontalDark;
