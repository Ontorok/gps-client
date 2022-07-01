import { Box, Button, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Save } from '@material-ui/icons';
import { CustomCheckbox, TextInput } from 'components';
import GridContainer from 'components/GridContainer';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300
  },
  wrapper: {
    position: 'relative'
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
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

const initialFieldValues = {
  groomerName: '',
  groomerGPSId: '',
  rate: 0,
  isActive: true
};

const GroomerForm = props => {
  const { create, loading } = props;
  const classes = useStyles();
  const [state, setState] = useState(initialFieldValues);

  //#region Events
  const onChange = e => {
    const { type, name, value, checked } = e.target;
    switch (type) {
      case 'checkbox':
        setState({
          ...state,
          [name]: checked
        });
        break;

      default:
        setState({
          ...state,
          [name]: value
        });
        break;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const payload = {
      name: state.groomerName,
      gpsId: state.groomerGPSId,
      rate: +state.rate,
      isActive: state.isActive
    };
    create(payload);
  };
  //#endregion

  return (
    <GridContainer className={classes.root}>
      <form onSubmit={onSubmit}>
        <Grid item xs={12}>
          <TextInput name="groomerName" label="Groomer Name" value={state.groomerName} onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          <TextInput name="groomerGPSId" label="GPS ID" value={state.groomerGPSId} onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          <TextInput name="rate" label="Rate" type="number" value={state.rate} onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          <CustomCheckbox name="isActive" label="Is Active" checked={state.isActive} onChange={onChange} />
        </Grid>

        <Grid item container justifyContent="flex-start" xs={12}>
          <Box className={classes.wrapper}>
            <Button type="submit" variant="contained" color="default" className={classes.buttonSuccess} endIcon={<Save />}>
              Save
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Box>
        </Grid>
      </form>
    </GridContainer>
  );
};

export default GroomerForm;
