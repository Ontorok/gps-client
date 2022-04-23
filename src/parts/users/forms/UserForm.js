import { Grid, makeStyles } from '@material-ui/core';
import { TextInput } from 'components';
import CustomAutoComplete from 'components/CustomAutoComplete/CustomAutoComplete';
import GridContainer from 'components/GridContainer';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300
  }
}));

const USER_ROLES = [
  { id: 'role101', label: 'Admin', value: 'admin' },
  { id: 'role102', label: 'Manager', value: 'manager' },
  { id: 'role103', label: 'User', value: 'user' }
];
const USER_CLUBS = [
  { id: 'club101', label: 'CLUB_1', value: 'club_1' },
  { id: 'club102', label: 'CLUB_2', value: 'club_2' },
  { id: 'club103', label: 'CLUB_3', value: 'club_3' }
];

const initialFieldValues = {
  id: 0,
  fullName: '',
  roleId: '',
  roleName: '',
  clubId: '',
  clubName: '',
  username: '',
  password: ''
};

const UserForm = () => {
  const classes = useStyles();
  const [state, setState] = useState(initialFieldValues);
  const [roles] = useState(USER_ROLES);
  const [role, setRole] = useState(null);

  const [clubs] = useState(USER_CLUBS);
  const [club, setClub] = useState(null);

  //#region Events
  const onChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const onRoleChange = (e, newValue) => {
    if (newValue) {
      setRole(newValue);
    } else {
      setRole(null);
    }
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
        <TextInput name="fullName" label="Full Name" value={state.fullName} onChange={onChange} />
      </Grid>
      <Grid item xs={12}>
        <CustomAutoComplete name="roleId" label="Roles" data={roles} value={role} onChange={onRoleChange} />
      </Grid>
      <Grid item xs={12}>
        <CustomAutoComplete name="clubId" label="Club" data={clubs} value={club} onChange={onClubChange} />
      </Grid>
      <Grid item xs={12}>
        <TextInput name="username" label="Username" value={state.username} onChange={onChange} />
      </Grid>
      <Grid item xs={12}>
        <TextInput name="password" label="Password" type="password" value={state.password} onChange={onChange} />
      </Grid>
    </GridContainer>
  );
};

export default UserForm;
