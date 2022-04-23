import { Divider, Drawer, Grid, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { CancelPresentation } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  formContainer: {
    padding: 15
  },
  header: {
    justifyContent: 'space-between'
  },
  btnChild: {
    color: '#F44336'
  },
  btnParent: {
    '&:hover': {
      backgroundColor: '#F44336',
      '& $btnChild': {
        color: '#FFFFFF'
      }
    }
  }
}));

const CustomDrawer = props => {
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
            <Typography variant="h4">{title}</Typography>
          </Grid>

          <Grid item container justifyContent="flex-end" xs={4}>
            <Tooltip arrow title="Close" placement="right">
              <IconButton className={classes.btnParent} onClick={toggleDrawer(false)}>
                <CancelPresentation className={classes.btnChild} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Divider />
        {children}
      </div>
    </Drawer>
  );
};

CustomDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string
};

export default CustomDrawer;
