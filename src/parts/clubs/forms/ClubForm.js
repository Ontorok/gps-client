import { Box, Button, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
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
  id: 0,
  name: '',
  state: true
};

const ClubForm = props => {
  const classes = useStyles();
  const [state, setState] = useState(initialFieldValues);

  const { create, loading } = props;

  //#region Events
  const onChange = e => {
    const { type, name, value, checked } = e.target;

    setState({
      ...state,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    create(state);
  };

  //#endregion

  return (
    <GridContainer className={classes.root}>
      <form onSubmit={onSubmit}>
        <Grid item xs={12}>
          <TextInput name="name" label="Club Name" value={state.name} onChange={onChange} />
        </Grid>

        <Grid item xs={12}>
          <CustomCheckbox name="state" label="Is State" checked={state.state} onChange={onChange} />
        </Grid>

        <Grid item container justifyContent="flex-start" xs={12}>
          <Box className={classes.wrapper}>
            <Button type="submit" variant="contained" color="default" className={classes.buttonSuccess} disabled={loading} endIcon={<Save />}>
              Save
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Box>
        </Grid>
      </form>
    </GridContainer>
  );
};

export default ClubForm;
