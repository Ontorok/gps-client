import { Divider, Drawer, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import DrawerCloseIcon from './DrawerCloseIcon';

const useStyles = makeStyles(theme => ({
  formContainer: {
    padding: 15
  },
  header: {
    justifyContent: 'space-between',
    marginBottom: 10
  }
}));

const CustomDrawer = (props) => {
  const classes = useStyles();
  const { drawerOpen, setDrawerOpen, title, children } = props;
  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };
  return (
    <Drawer anchor="right" open={drawerOpen}>
      <div className={classes.formContainer}>
        <Grid container className={classes.header}>
          <Grid item container alignItems="center" justifyContent="flex-start" xs={6}>
            <Typography variant="h5">{title}</Typography>
          </Grid>

          <Grid item container justifyContent="flex-end" xs={4}>
            <DrawerCloseIcon onClick={toggleDrawer(false)} />
          </Grid>
        </Grid>
        <Divider />
        {children}
      </div>
    </Drawer>
  )
}

export default CustomDrawer