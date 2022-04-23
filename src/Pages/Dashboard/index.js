import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  welcomeText: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 30,
    textShadow: '10px 6px 8px hsla(0,0%,45.9%,.8)'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box fontSize={{ xs: 60, sm: 80, lg: 100 }} className={classes.welcomeText}>
        Welcome
      </Box>
    </Box>
  );
};

export default Dashboard;
