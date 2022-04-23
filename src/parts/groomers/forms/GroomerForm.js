import { Button, Grid, makeStyles } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { TextInput } from 'components';
import CustomAutoComplete from 'components/CustomAutoComplete/CustomAutoComplete';
import GridContainer from 'components/GridContainer';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300
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


const CLUBS = [
  { id: 1, label: 'CLUB_1', value: 'club_1' },
  { id: 2, label: 'CLUB_2', value: 'club_2' },
  { id: 3, label: 'CLUB_3', value: 'club_3' }
];

const initialFieldValues = {
  id: 0,
  clubId: '',
  clubName: '',
  groomerName: '',
  groomerGPSId: '',
  rate:0
};

const GroomerForm = () => {
  const classes = useStyles();
  const [state, setState] = useState(initialFieldValues);

  const [clubs] = useState(CLUBS);
  const [club, setClub] = useState(null);

  //#region Events
  const onChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const onClubChange = (e, newValue) => {
    if (newValue) {
      setClub(newValue);
    } else {
      setClub(null);
    }
  };
  //#endregion

  return (
    <GridContainer className={classes.root}>
      <Grid item xs={12}>
        <CustomAutoComplete name="clubId" label="Clubs" data={clubs} value={club} onChange={onClubChange} />
      </Grid>
      <Grid item xs={12}>
        <TextInput name="groomerName" label="Groomer Name" value={state.groomerName} onChange={onChange} />
      </Grid>
      <Grid item xs={12}>
        <TextInput name="groomerGPSId" label="Groomer GPS Id"  value={state.groomerGPSId} onChange={onChange} />
      </Grid>
      <Grid item xs={12}>
        <TextInput name="rate" label="Rate" type="number" value={state.rate} onChange={onChange} />
      </Grid>

      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="default" className={classes.buttonSuccess} endIcon={<Save />}>
          Save
        </Button>
      </Grid>
    </GridContainer>
  );
};

export default GroomerForm;
