import { CancelPresentation } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  btnChild: {
    fill: '#F44336',
    fontSize: 16
  },
  btnParent: {
    '&:hover': {
      backgroundColor: '#F44336',
      '& $btnChild': {
        fill: '#FFFFFF'
      }
    }
  }
}));

const DrawerCloseIcon = (props) => {
  const classes = useStyles({});
  const { onClick } = props;
  return (
    <IconButton className={classes.btnParent} onClick={onClick} size="medium">
      <CancelPresentation className={classes.btnChild} />
    </IconButton>

  )
}

export default DrawerCloseIcon