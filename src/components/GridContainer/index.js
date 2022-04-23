import Grid from '@material-ui/core/Grid';
import React from 'react';

const GridContainer = ({ children, ...rest }) => {
  return (
    <Grid container {...rest}>
      {children}
    </Grid>
  );
};

export default GridContainer;
