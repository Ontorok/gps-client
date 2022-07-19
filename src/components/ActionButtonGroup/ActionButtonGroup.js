import { Button, ButtonGroup, makeStyles, Tooltip } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Cancel, Delete, Done, DoneOutline, Edit, Visibility } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  btnViewChild: {
    color: '#1976D2',
    fontSize: 20
  },
  btnViewParent: {
    '&:hover': {
      backgroundColor: '#1976D2',
      '& $btnViewChild': {
        color: '#FFFFFF'
      }
    }
  },
  btnEditChild: {
    color: '#4CAF50',
    fontSize: 20
  },
  btnEditParent: {
    '&:hover': {
      backgroundColor: '#4CAF50',
      '& $btnEditChild': {
        color: '#FFFFFF'
      }
    },
    '&:disabled': {
      backgroundColor: '#CCC',
      '& $btnEditChild': {
        color: '#000'
      }
    }
  },
  btnDeleteChild: {
    color: '#F44336',
    fontSize: 20
  },
  btnDeleteParent: {
    '&:hover': {
      backgroundColor: '#F44336',
      '& $btnDeleteChild': {
        color: '#FFFFFF'
      }
    }
  },
  btnReactiveChild: {
    color: '#9A4EF1',
    fontSize: 20
  },
  btnReactiveParent: {
    '&:hover': {
      backgroundColor: '#9A4EF1',
      '& $btnReactiveChild': {
        color: '#FFFFFF'
      }
    }
  },
  buttonProgress: {
    color: grey[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

const ActionButtonGroup = props => {
  const {
    appearedViewButton,
    appearedEditButton,
    appearedDeleteButton,
    appearedReactiveButton,
    appearedCancelButton,
    appearedDoneButton,
    onView,
    onEdit,
    onDelete,
    onRestore,
    onCancel,
    onDone
  } = props;
  const classes = useStyles();
  return (
    <ButtonGroup>
      {appearedViewButton && (
        <Tooltip arrow title="View" placement="bottom">
          <Button size="small" className={classes.btnViewParent} onClick={onView}>
            <Visibility className={classes.btnViewChild} />
          </Button>
        </Tooltip>
      )}
      {appearedEditButton && (
        <Tooltip arrow title="Edit" placement="bottom">
          <Button size="small" className={classes.btnEditParent} onClick={onEdit}>
            <Edit className={classes.btnEditChild} />
          </Button>
        </Tooltip>
      )}
      {appearedDeleteButton && (
        <Tooltip arrow title="Delete" placement="bottom">
          <Button size="small" className={classes.btnDeleteParent} onClick={onDelete}>
            <Delete className={classes.btnDeleteChild} />
          </Button>
        </Tooltip>
      )}
      {appearedReactiveButton && (
        <Tooltip arrow title="Re-store" placement="bottom">
          <Button size="small" className={classes.btnReactiveParent} onClick={onRestore}>
            <DoneOutline className={classes.btnReactiveChild} />
          </Button>
        </Tooltip>
      )}
      {appearedCancelButton && (
        <Tooltip arrow title="Cancel" placement="bottom">
          <Button size="small" className={classes.btnDeleteParent} onClick={onCancel}>
            <Cancel className={classes.btnDeleteChild} />
          </Button>
        </Tooltip>
      )}
      {appearedDoneButton && (
        <Tooltip arrow title="Done" placement="bottom">
          <Button size="small" className={classes.btnReactiveParent} onClick={onDone}>
            <Done className={classes.btnReactiveChild} />
          </Button>
        </Tooltip>
      )}
    </ButtonGroup>
  );
};

ActionButtonGroup.propTypes = {
  appearedViewButton: PropTypes.bool,
  onView: PropTypes.func,
  appearedEditButton: PropTypes.bool,
  onEdit: PropTypes.func,
  appearedDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  appearedReactiveButton: PropTypes.bool,
  onRestore: PropTypes.func,
  appearedCancelButton: PropTypes.bool,
  onCancel: PropTypes.func,
  appearedDoneButton: PropTypes.bool,
  onDone: PropTypes.func
};

ActionButtonGroup.defaultProps = {
  appearedViewButton: false,
  onView: () => {
    // eslint-disable-next-line no-console
    console.error(`'onView' event not passed!!`);
  },
  appearedEditButton: false,
  onEdit: () => {
    // eslint-disable-next-line no-console
    console.error(`'onEdit' event not passed!!`);
  },
  appearedDeleteButton: false,
  onDelete: () => {
    // eslint-disable-next-line no-console
    console.error(`'onDelete' event not passed!!`);
  },
  appearedReactiveButton: false,
  onRestore: () => {
    // eslint-disable-next-line no-console
    console.error(`'onRestore' event not passed!!`);
  },
  appearedCancelButton: false,
  onCancel: () => {
    // eslint-disable-next-line no-console
    console.error(`'onCancel' event not passed!!`);
  },
  appearedDoneButton: false,
  onDone: () => {
    // eslint-disable-next-line no-console
    console.error(`'onDone' event not passed!!`);
  }
};

export default ActionButtonGroup;
