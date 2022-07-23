import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  TextField,
  Tooltip
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import {
  ActionButtonGroup,
  CustomAutoComplete,
  CustomConfirmDialog,
  CustomDrawer,
  CustomTable,
  ResetButton,
  SearchButton,
  TextInput
} from 'components';
import { ROLES } from 'constants/RolesConstants';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AUTH_API, CLUB_API, USERS_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { isObjEmpty, mapArrayToDropdown, sleep } from 'utils/commonHelper';
import UserForm from '../forms/UserForm';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    padding: '10px'
  },
  newButton: {
    textTransform: 'none'
  }
}));

const initialFilterState = {
  clubId: '',
  name: '',
  email: '',
  phone: ''
};

//#region Colums for Table
const columns = [
  {
    sortName: 'name',
    name: 'name',
    label: 'Full Name',
    minWidth: 150,
    isDisableSorting: false
  },
  {
    sortName: 'username',
    name: 'username',
    label: 'Username',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    sortName: 'email',
    name: 'email',
    label: 'Email',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    sortName: 'phone',
    name: 'phone',
    label: 'Phone',
    minWidth: 170,
    isDisableSorting: true
  },
  {
    sortName: 'clubName',
    name: 'clubName',
    label: 'Club',
    minWidth: 170,
    isDisableSorting: false
  }
];
//#endregion

const ActiveUsers = ({ sortedColumn, sortedBy, onSort }) => {
  //#region Hooks
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useSelector(({ auth }) => auth);
  //#endregion

  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [adminpassword, setAdminpassword] = useState('');
  const [username, setUsername] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    content: '',
    isOpen: false
  });
  //#endregion

  //#region UDF's
  const fetchActiveUsers = async (obj = {}) => {
    try {
      const res = await axiosPrivate.get(USERS_API.fetch_all_active, {
        params: isObjEmpty(obj) ? { page, perPage, sortedColumn, sortedBy } : { page, perPage, sortedColumn, sortedBy, ...obj }
      });
      const users = res.data.result.map(user => ({ ...user, editMode: false }));
      setState(users);
      setActiveDataLength(res.data.totalRows);
    } catch (err) {
      toastAlerts('error', 'There is an error');
    }
  };

  function toggleEditMode(id) {
    const updatedState = state.map(item => {
      if (item.id === id) {
        item['editMode'] = !item.editMode;
      }
      return item;
    });
    setState(updatedState);
  }
  //#endregion

  //#region Effects
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    let searchObj = {};
    for (const [key, value] of Object.entries(filterState)) {
      if (value) {
        searchObj[key] = value;
      }
    }
    const fetchUsers = async () => {
      try {
        const res = await axiosPrivate.get(USERS_API.fetch_all_active, {
          params: isObjEmpty(searchObj)
            ? {
                page,
                perPage,
                sortedColumn,
                sortedBy
              }
            : {
                page,
                perPage,
                sortedColumn,
                sortedBy,
                ...searchObj
              },
          signal: controller.signal
        });
        const users = res.data.result.map(user => ({ ...user, editMode: false }));
        if (isMounted) {
          setState(users);
          setActiveDataLength(res.data.totalRows);
        }
      } catch (err) {
        toastAlerts('error', 'There is an error');
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosPrivate, page, perPage, sortedBy, sortedColumn]);
  //#endregion

  //#region Events
  const onFetchClubs = async () => {
    if (clubs.length === 0) {
      try {
        const res = await axiosPrivate.get(CLUB_API.fetch_all_active);
        if (res.data.succeed) {
          const activeClubs = mapArrayToDropdown(res.data.result, 'name', '_id');
          await sleep(500);
          setClubs(activeClubs);
        }
      } catch (err) {}
    }
  };

  const onFilterClubChange = (e, newValue) => {
    if (newValue) {
      setClub(newValue);
      setFilterState(prev => ({ ...prev, clubId: newValue.value }));
    } else {
      setClub(null);
      setFilterState(prev => ({ ...prev, clubId: '' }));
    }
  };

  const onSearch = () => {
    let searchObj = {};
    for (const [key, value] of Object.entries(filterState)) {
      if (value) {
        searchObj[key] = value;
      }
    }
    fetchActiveUsers(searchObj);
  };

  const onResetSearch = () => {
    setFilterState(initialFilterState);
    setClub(null);
    fetchActiveUsers();
  };

  const onRowPerPageChange = e => {
    setPerPage(e.target.value);
    setPage(1);
  };

  const onPageChange = (event, pageNumber) => {
    setPage(pageNumber);
  };

  const onDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const onInputChange = (e, id) => {
    const { name, value } = e.target;
    const _data = [...state];
    _data.map(u => {
      if (u.id === id) {
        u[name] = value;
      }
      return u;
    });
    setState(_data);
  };

  const onCreate = async formValue => {
    setLoading(true);
    try {
      const res = await axiosPrivate.post(AUTH_API.create, formValue);
      if (res.status === 201) {
        toastAlerts('success', res.data.message);
      }
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      setLoading(false);
      setDrawerOpen(false);
    }
  };

  const onDelete = async id => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      const res = await axiosPrivate.delete(USERS_API.delete_user(id));
      if (res.data.succeed) {
        toastAlerts('success', res.data.message);
        fetchActiveUsers();
      }
    } catch (err) {
      toastAlerts('error', err.message);
    }
  };

  const onOpenModal = username => {
    setUsername(username);
    setAdminpassword('');
    setUserpassword('');
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onResetPassword = async () => {
    if (adminpassword && username && userpassword) {
      try {
        const payload = { adminpassword, username, userpassword };
        const res = await axiosPrivate.put(USERS_API.resetPassword(), payload);
        setOpenModal(false);
        toastAlerts('success', res.data.message);
      } catch (error) {
        setOpenModal(false);
        toastAlerts('warning', error.response.data.message);
      }
    }
  };
  //#endregion

  //#region Meta
  const isAdmin = authUser?.role === ROLES.Admin || authUser?.role === ROLES.SuperAdmin;
  //#endregion
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={6} container justifyContent="flex-start" className={classes.buttonContainer}>
          {isAdmin && (
            <Button size="small" color="primary" variant="contained" className={classes.newButton} onClick={onDrawerOpen}>
              New
            </Button>
          )}
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Tooltip title="Filter">
            <IconButton onClick={() => setOpenFilter(prev => !prev)}>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Collapse in={openFilter}>
        <Grid container alignItems="center" spacing={3} style={{ padding: '0 10px' }}>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <TextInput
              label="Full Name"
              name="name"
              value={filterState.name}
              onChange={e => setFilterState({ ...filterState, name: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3} lg={3}>
            <TextInput
              label="Email"
              name="email"
              value={filterState.email}
              onChange={e => setFilterState({ ...filterState, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <TextInput
              label="Phone"
              name="phone"
              value={filterState.phone}
              onChange={e => setFilterState({ ...filterState, phone: e.target.value })}
            />
          </Grid>
          {isAdmin && (
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <CustomAutoComplete name="clubId" label="Clubs" data={clubs} value={club} onFoucs={onFetchClubs} onChange={onFilterClubChange} />
            </Grid>
          )}

          <Grid item container justifyContent="flex-start">
            <SearchButton onClick={onSearch} />
            <ResetButton onClick={onResetSearch} />
          </Grid>
        </Grid>
      </Collapse>
      <CustomTable
        columns={columns}
        rowPerPage={perPage}
        onRowPerPageChange={onRowPerPageChange}
        onPageChange={onPageChange}
        sortedColumn={sortedColumn}
        sortedBy={sortedBy}
        onSort={onSort}
        count={Math.ceil(activeDataLength / perPage)}>
        {state.map(row => {
          return (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.clubName}</TableCell>
              <TableCell>
                <ActionButtonGroup
                  appearedResetPasswordButton={isAdmin}
                  onResetPassword={() => onOpenModal(row.username)}
                  appearedDeleteButton={isAdmin}
                  onDelete={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Delete User?',
                      content: 'Are you sure to delete this user??',
                      onConfirm: () => onDelete(row._id)
                    });
                  }}
                />
                <CustomConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
                  confirmButtonText="Delete"
                  cancelButtonText="Cancel"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </CustomTable>
      <CustomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} title="User">
        <UserForm create={onCreate} loading={loading} />
      </CustomDrawer>
      <Box>
        <Dialog open={openModal} onClose={onCloseModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>To reset the user's password, please enter your password here.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              variant="outlined"
              id="name"
              label="Your Password"
              fullWidth
              value={adminpassword}
              onChange={e => setAdminpassword(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              variant="outlined"
              id="name"
              label="User Password"
              fullWidth
              value={userpassword}
              onChange={e => setUserpassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={onResetPassword} color="primary">
              Reset
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fragment>
  );
};

export default withSort(ActiveUsers, 'name');
