import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Box, Button, Collapse, FormControlLabel, Switch, TextField } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Business, LocalPhone, MailOutline, Memory } from '@material-ui/icons';
import clsx from 'clsx';
import { CurrentAuthMethod } from 'constants/AppConstants';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH_API } from 'services/apiEndPoints';
import { AuhMethods } from 'services/auth';
import { toastAlerts } from 'utils/alert';

const useStyles = makeStyles(theme => ({
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block'
    },
    '&.address': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark
    },
    '&.role': {
      backgroundColor: alpha(theme.palette.error.main, 0.15),
      color: theme.palette.error.dark
    }
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer'
  }
}));
const initialPasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};
const Profile = props => {
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [passwordState, setPasswordState] = useState(initialPasswordState);
  const [openPasswordBox, setOpenPasswordBox] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchAuthUser = async () => {
      try {
        const res = await axiosPrivate.get(AUTH_API.get_me, {
          signal: controller.signal
        });
        const authUser = res.data.user;
        isMounted && setState(authUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const onInputChange = e => {
    const { name, value } = e.target;
    setPasswordState(prev => ({ ...prev, [name]: value }));
  };

  const onChangePassword = async () => {
    const isValidForm = Object.values(passwordState).every(item => item !== '');
    if (isValidForm) {
      const isPasswordMatch = passwordState.newPassword === passwordState.confirmPassword;
      if (isPasswordMatch) {
        try {
          const res = await axiosPrivate.put(AUTH_API.change_password, passwordState);
          toastAlerts('success', res.data.message);
          setPasswordState(initialPasswordState);
          setOpenPasswordBox(false);
          dispatch(AuhMethods[CurrentAuthMethod].onLogout());
        } catch (err) {
          toastAlerts('error', err.response.data.message);
        }
      } else {
        toastAlerts('warning', 'Password did not match');
      }
    } else {
      toastAlerts('warning', 'Please fillup all fields');
    }
  };

  return (
    <CmtCard>
      <CmtCardHeader title="Profile" />
      <CmtCardContent>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={classes.iconView}>
            <MailOutline />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Email
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16}>
              <Box component="a" href={`mailto:${state?.email}`}>
                {state?.email}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={clsx(classes.iconView, 'address')}>
            <Business />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Address
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16}>
              <Box component="span">{state?.address}</Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={clsx(classes.iconView, 'phone')}>
            <LocalPhone />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Phone
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
              {state?.phone}
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={clsx(classes.iconView, 'role')}>
            <Memory />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Role
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
              {state?.role}
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={clsx(classes.iconView, 'role')}>
            <FormControlLabel
              control={<Switch checked={openPasswordBox} onChange={() => setOpenPasswordBox(prev => !prev)} />}
              label={openPasswordBox ? 'Hide' : 'Show'}
            />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Change Password
            </Box>
            <Box component="div" className={classes.wordAddress} fontSize={16} color="text.primary">
              <Collapse in={openPasswordBox}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  name="currentPassword"
                  label="Current Pass"
                  value={passwordState.currentPassword}
                  onChange={onInputChange}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  name="newPassword"
                  label="New Pass"
                  value={passwordState.newPassword}
                  onChange={onInputChange}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  name="confirmPassword"
                  label="Confirm Pass"
                  value={passwordState.confirmPassword}
                  onChange={onInputChange}
                />
                <Button type="button" variant="contained" color="primary" onClick={onChangePassword}>
                  Change Password
                </Button>
              </Collapse>
            </Box>
          </Box>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Profile;

Profile.prototype = {
  userDetail: PropTypes.object.isRequired
};
