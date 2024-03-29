import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtList from '@coremat/CmtList';
import { Box, IconButton, makeStyles, Popover, Tooltip, useTheme } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { alpha } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NotificationItem from './NotificationItem';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 4,
      paddingBottom: 4
    },
    '& .Cmt-card-content': {
      padding: '0 0 16px !important'
    }
  },
  typography: {
    padding: theme.spacing(2)
  },
  iconRoot: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &.active': {
      color: theme.palette.common.white
    }
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20
  },
  scrollbarRoot: {
    height: 300,
    padding: 16
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 375
    }
  }
}));

const actions = [
  {
    label: 'More Detail'
  },
  {
    label: 'Close'
  }
];

const headerNotifications = [];

const HeaderNotifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [counter, setCounter] = React.useState(5);
  const theme = useTheme();

  const onOpenPopOver = event => {
    setAnchorEl(event.currentTarget);
    setCounter(0);
  };

  const onClosePopOver = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box pr={2}>
      <Tooltip title="Notifications">
        <IconButton
          onClick={onOpenPopOver}
          className={clsx(classes.iconRoot, 'Cmt-appIcon', {
            active: counter > 0
          })}>
          <Badge badgeContent={counter} classes={{ badge: classes.counterRoot }}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        className={classes.popoverRoot}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClosePopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <CmtCard className={classes.cardRoot}>
          <CmtCardHeader
            title="Notifications"
            actionsPos="top-corner"
            actions={actions}
            separator={{
              color: theme.palette.borderColor.dark,
              borderWidth: 1,
              borderStyle: 'solid'
            }}
          />
          <CmtCardContent>
            {headerNotifications.length > 0 ? (
              <PerfectScrollbar className={classes.scrollbarRoot}>
                <CmtList data={headerNotifications} renderRow={(item, index) => <NotificationItem key={index} item={item} />} />
              </PerfectScrollbar>
            ) : (
              <Box p={6}>
                <Typography variant="body2">No notifications found</Typography>
              </Box>
            )}
          </CmtCardContent>
        </CmtCard>
      </Popover>
    </Box>
  );
};

export default HeaderNotifications;
