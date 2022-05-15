import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, makeStyles } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  btnContinue: {
    color: '#0088DD',
    backgroundColor: '#FFFFFF',
    border: 'none',
    margin: 5,
    '&:hover': {
      backgroundColor: '#0088DD',
      color: '#FFFFFF',
      border: 'none'
    }
  },
  btnCancel: {
    margin: 5,
    border: 'none',
    backgroundColor: '#FFFFFF',
    color: '#FEA362',
    [theme.breakpoints.up('xs')]: {
      marginRight: 0
    },
    '&:hover': {
      backgroundColor: '#FEA362',
      color: '#FFFFFF',
      border: 'none'
    }
  }
}));

// onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}

const CustomConfirmDialog = props => {
  const classes = useStyles();
  const { confirmDialog, setConfirmDialog } = props;

  const handleCloseDialog = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return false;
    } else {
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    }
  };
  return (
    <Dialog open={confirmDialog.isOpen} onClose={handleCloseDialog}>
      <DialogTitle id="confirm-dialog">{confirmDialog.title}</DialogTitle>
      <Divider />
      <DialogContent>{confirmDialog.content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.btnCancel}
          endIcon={<ExitToApp />}
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
          Cancel
        </Button>
        <Button variant="contained" className={classes.btnContinue} endIcon={<DoneOutlineIcon />} onClick={confirmDialog.onConfirm}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomConfirmDialog.propTypes = {
  confirmDialog: PropTypes.object,
  setConfirmDialog: PropTypes.func
};

CustomConfirmDialog.defaultProps = {
  confirmDialog: {
    isOpen: false,
    title: '',
    content: ''
  },
  setConfirmDialog: () => {}
};
export default CustomConfirmDialog;
