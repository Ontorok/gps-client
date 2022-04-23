import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Box, Button } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Business, LocalPhone, MailOutline, Memory } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { AUTH_API } from 'services/apiEndPoints';
import { axiosInstance } from 'services/auth/jwt/config';

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

const Profile = props => {
  const classes = useStyles();
  const [state, setState] = useState({});
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchAuthUser = async () => {
      try {
        const res = await axiosInstance.get(AUTH_API.get_me, {
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
  }, []);

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

        <Box display="flex" alignItems="center">
          <Button variant="contained" color="secondary">
            Force re-start
          </Button>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Profile;

Profile.prototype = {
  userDetail: PropTypes.object.isRequired
};
