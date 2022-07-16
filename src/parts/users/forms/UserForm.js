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
  { id: 'role102', label: 'Manager', value: 'manager' },
  { id: 'role103', label: 'User', value: 'user' }
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
    } else {
      setClub(null);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const payload = {
      name: state.fullName,
      username: state.username,
      email: 'mail@mail.com',
      address: 'Chattogram, Bangladesh',
      phone: '01911612755',
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
