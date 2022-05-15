import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
    padding: 10
  },
  masterInfoBoxTableCell: {
    paddingRight: 0,
    maxWidth: 16,
    [theme.breakpoints.down('md')]: {
      maxWidth: 55
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const CustomBackDrop = ({ open }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

CustomBackDrop.propTypes = {
  open: PropTypes.bool
};

CustomBackDrop.defaultProps = {
  open: false
};
export default CustomBackDrop;
