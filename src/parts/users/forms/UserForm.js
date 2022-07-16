import { Box, Button, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Save } from '@material-ui/icons';
import { CustomAutoComplete, TextInput } from 'components';
import GridContainer from 'components/GridContainer';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { useEffect, useState } from 'react';
import { CLUB_API } from 'services/apiEndPoints';
import { mapArrayToDropdown } from 'utils/commonHelper';

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

const USER_ROLES = [
  { id: 'role102', label: 'Manager', value: 'Manager' },
  { id: 'role103', label: 'User', value: 'User' }
];

const initialFieldValues = {
  id: 0,
  fullName: '',
  email: '',
  address: '',
  phone: '',
  roleId: '',
  roleName: '',
  clubId: '',
  clubName: '',
  username: '',
  password: ''
};

const UserForm = props => {
  const { create, loading } = props;

  const axiosPrivate = useAxiosPrivate();
  const classes = useStyles();

  const [state, setState] = useState(initialFieldValues);
  const [roles] = useState(USER_ROLES);
  const [role, setRole] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState(null);

  //#region Effects
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchClubs = async () => {
      try {
        const res = await axiosPrivate.get(CLUB_API.fetch_all_active);
        const clubs = mapArrayToDropdown(res.data.result, 'name', '_id');

        if (isMounted) {
          setClubs(clubs);
        }
      } catch (error) {}
    };

    fetchClubs();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

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
      setState(prev => ({ ...prev, roleId: newValue.value, roleName: newValue.label }));
    } else {
      setRole(null);
    }
  };
  const onClubChange = (e, newValue) => {
    if (newValue) {
      setClub(newValue);
      setState(prev => ({ ...prev, clubId: newValue.value, clubName: newValue.label }));
    } else {
      setClub(null);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const payload = {
      name: state.fullName,
      username: state.username,
      email: state.email ? state.email : '',
      address: state.address ? state.address : '',
      phone: state.phone ? state.phone : '',
      clubId: state.clubId,
      clubName: state.clubName,
      role: state.roleId,
      password: state.password
    };
    create(payload);
  };

  //#endregion

  return (
    <GridContainer className={classes.root}>
      <form onSubmit={onSubmit}>
        <Grid item xs={12}>
          <TextInput type="text" name="fullName" label="Full Name" value={state.fullName} onChange={onChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextInput type="email" name="email" label="email" value={state.email} onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          <TextInput type="text" name="address" label="Address" value={state.address} onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          <TextInput type="text" name="phone" label="Phone" value={state.phone} onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          <CustomAutoComplete name="roleId" label="Roles" data={roles} value={role} onChange={onRoleChange} required />
        </Grid>
        <Grid item xs={12}>
          <CustomAutoComplete name="clubId" label="Club" data={clubs} value={club} onChange={onClubChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextInput name="username" label="Username" value={state.username} onChange={onChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextInput name="password" label="Password" type="password" value={state.password} onChange={onChange} required />
        </Grid>

        <Grid item container justifyContent="flex-end" xs={12}>
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

export default UserForm;
