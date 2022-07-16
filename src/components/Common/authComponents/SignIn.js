import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from 'constants/AppConstants';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuhMethods } from 'services/auth';
import IntlMessages from 'utils/IntlMessages';
import ContentLoader from '../../ContentLoader';
import AuthWrapper from './AuthWrapper';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2
    }
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50
    }
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12)
    }
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12
      }
    }
  }
}));
//variant = 'default', 'standard'
const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('demo#123');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const onSubmit = () => {
    dispatch(AuhMethods[method].onLogin({ username, password }));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {/* {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/login-img.png'} />
        </Box>
      ) : null} */}
      <Box className={classes.authContent}>
        {/* <Box mb={7}>
          <CmtImage src={'/images/logo.png'} />
        </Box> */}
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Login
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={event => setUsername(event.target.value)}
              defaultValue={username}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          {/* Remember me checkbox */}
          {/* <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel className={classes.formcontrolLabelRoot} control={<Checkbox name="checkedA" />} label="Remember me" />
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="appModule.forgotPassword" />
              </NavLink>
            </Box>
          </Box> */}

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              <IntlMessages id="appModule.signIn" />
            </Button>

            {/* Sign up Link */}
            {/* <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/signup">
                <IntlMessages id="signIn.signUp" />
              </NavLink>
            </Box> */}
          </Box>
        </form>

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
