import CmtImage from '@coremat/CmtImage';
import { Box } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

const FooterLogo = ({ color, ...props }) => {
  const logoUrl = color === 'white' ? '/images/logo-white-symbol.png' : '/images/footer-logo.png';

  return (
    <Box className="pointer" {...props}>
      <NavLink to="/">
        <CmtImage src={logoUrl} alt="logo" />
      </NavLink>
    </Box>
  );
};

export default FooterLogo;
