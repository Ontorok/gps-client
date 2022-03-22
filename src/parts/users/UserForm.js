import { Save } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  btnChild: {
    fill: '#62AD2D',
  },
  buttonSuccess: {
    border: 'none',
    backgroundColor: '#FFFFFF',
    color: '#62AD2D',
    '&:hover': {
      backgroundColor: '#62AD2D',
      color: '#FFFFFF',
      border: 'none',
      '& $btnChild': {
        fill: '#FFFFFF'
      }
    }
  },
}));


const UserForm = () => {
  const classes = useStyles();
  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={12} >
          <TextField fullWidth size="small" margin="dense" label='name' />
        </Grid>
        <Grid item xs={12} >
          <TextField fullWidth size="small" margin="dense" label='email' />
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-end'>
        <Button variant="contained" endIcon={<Save className={classes.btnChild} />} className={classes.buttonSuccess} >Save</Button>
      </Grid>
    </form >
  )
}

export default UserForm