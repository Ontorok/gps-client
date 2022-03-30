import { Save } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef } from 'react';
import CustomAutoComplete from '../../components/CustomAutoComplete';

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

const roleArray=[
  {label:'User', value:"User"},
  {label:'Vehicles', value:"Vehicles"},
  {label:'Admin', value:"Admin"},
]
const clubArray=[
  {label:'Club01', value:"Club01"},
  {label:'Club02', value:"Club02"},
  {label:'Club03', value:"Club03"},
]


const UserForm = () => {
  const classes = useStyles();
  const refRole = useRef();
  const refClub= useRef();

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={12} >
          <TextField fullWidth size="small" margin="dense" label='Name' />
        </Grid>
        <Grid item xs={12} >
          <CustomAutoComplete name="role" label="Role" data={roleArray} innerref={refRole} />
        </Grid>
        <Grid item xs={12} >
          <CustomAutoComplete name="club" label="Club" data={clubArray} innerref={refClub} />
        </Grid>
        <Grid item xs={12} >
          <TextField fullWidth size="small" margin="dense" label='User Name' />
        </Grid>
        <Grid item xs={12} >
          <TextField fullWidth size="small" margin="dense" label='Password' />
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-end'>
        <Button variant="contained" endIcon={<Save className={classes.btnChild} />} className={classes.buttonSuccess} >Save</Button>
      </Grid>
    </form >
  )
}

export default UserForm