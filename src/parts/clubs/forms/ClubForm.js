import { Button, Grid, makeStyles } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { TextInput } from 'components';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox';
import GridContainer from 'components/GridContainer';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 350,
    top: 10
  },
  buttonSuccess: {
    margin: 5,
    border: 'none',
    backgroundColor: '#FFFFFF',
    color: '#62AD2D',
    [theme.breakpoints.up('xs')]: {
      marginRight: 0
    },
    '&:hover': {
      backgroundColor: '#62AD2D',
      color: '#FFFFFF',
      border: 'none'
    }
  },
}));
const initialFieldValues = {
  id: 0,
  clubName: '',
  state: false
};

const ClubForm = () => {
  const classes = useStyles();
  const [state, setState] = useState(initialFieldValues);

  //#region Events
  const onChange = e => {
    const { type, name, value, checked } = e.target;

    setState({
      ...state,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  //#endregion

  return (
    <GridContainer className={classes.root}>
      <Grid item xs={12}>
        <TextInput name="clubName" label="Club Name" value={state.clubName} onChange={onChange} />
      </Grid>

      <Grid item xs={12}>
        <CustomCheckbox name="state" label="Is State" checked={state.state} onChange={onChange} />
      </Grid>

      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="default" className={classes.buttonSuccess} endIcon={<Save />}>
          Save
        </Button>
      </Grid>
    </GridContainer>
  );
};

export default ClubForm;
