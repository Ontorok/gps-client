import CmtAvatar from '@coremat/CmtAvatar';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import { alpha, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import clsx from 'clsx';
import { CurrentAuthMethod } from 'constants/AppConstants';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AuhMethods } from 'services/auth';

const useStyles = makeStyles(theme => ({
  profileRoot: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingLeft: 10,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 20
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 2,
      zIndex: 1,
      height: 35,
      width: 1,
      backgroundColor: alpha(theme.palette.common.dark, 0.15)
    }
  }
}));

const actionsList = [
  {
    icon: <PersonIcon />,
    label: 'Profile'
  },
  {
    icon: <ExitToAppIcon />,
    label: 'Logout'
  }
];

const UserDropDown = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);

  const onItemClick = item => {
    if (item.label === 'Logout') {
      dispatch(AuhMethods[CurrentAuthMethod].onLogout());
    }
    if (item.label === 'Profile') {
      history.push('/profile');
    }
  };

  return (
    <Box className={clsx(classes.profileRoot, 'Cmt-profile-pic')}>
      <CmtDropdownMenu
        onItemClick={onItemClick}
        TriggerComponent={<CmtAvatar variant="rounded" size={30} src={'https://via.placeholder.com/150'} />}
        items={actionsList}
      />
      <span style={{ fontSize: 12 }}>{authUser?.username}</span>
    </Box>
  );
};

export default UserDropDown;
