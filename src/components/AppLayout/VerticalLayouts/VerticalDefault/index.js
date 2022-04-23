import CmtVerticalLayout from '@coremat/CmtLayouts/Vertical';
import CmtContent from '@coremat/CmtLayouts/Vertical/Content';
import CmtFooter from '@coremat/CmtLayouts/Vertical/Footer';
import CmtHeader from '@coremat/CmtLayouts/Vertical/Header';
import CmtSidebar from '@coremat/CmtLayouts/Vertical/Sidebar';
import React from 'react';
import ContentLoader from '../../../ContentLoader';
import defaultContext from '../../../contextProvider/AppContextProvider/defaultContext';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import SideBar from '../../partials/SideBar';
import SidebarHeader from '../../partials/SidebarHeader';

const layoutOptions = {
  headerType: defaultContext.headerType,
  footerType: 'fixed',
  sidebarType: defaultContext.sidebarType,
  isSidebarFixed: defaultContext.isSidebarFixed,
  isSidebarOpen: false,
  showTourOpt: true,
  showFooterOpt: true,
  miniSidebarWidth: 80,
  layoutStyle: defaultContext.layoutType,
  drawerBreakPoint: defaultContext.drawerBreakPoint,
  sidebarWidth: defaultContext.sidebarWidth
};

const VerticalDefault = ({ children }) => {
  return (
    <CmtVerticalLayout
      className="verticalDefaultLayout"
      layoutOptions={layoutOptions}
      header={
        <CmtHeader>
          <Header />
        </CmtHeader>
      }
      sidebar={
        <CmtSidebar>
          <SidebarHeader />
          <SideBar />
        </CmtSidebar>
      }
      footer={
        <CmtFooter>
          <Footer />
        </CmtFooter>
      }>
      <CmtContent>
        {children}
        <ContentLoader />
      </CmtContent>
    </CmtVerticalLayout>
  );
};

export default VerticalDefault;
