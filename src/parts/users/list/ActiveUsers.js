import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  TableCell,
  TableRow,
  TextField
} from '@material-ui/core';
import { ActionButtonGroup, CustomConfirmDialog, CustomDrawer, CustomTable } from 'components';
import { ROLES } from 'constants/RolesConstants';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AUTH_API, USERS_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import UserForm from '../forms/UserForm';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    padding: '10px'
  },
  newButton: {
    textTransform: 'none'
  }
}));

//#region Colums for Table
const columns = [
  {
    sortName: 'name',
    name: 'name',
    label: 'Full Name',
    minWidth: 150,
    isDisableSorting: true
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
    isDisableSorting: true
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
  const [perPage, setPerPage] = useState(10);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [adminpassword, setAdminpassword] = useState('');
  const [username, setUsername] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    content: '',
    isOpen: false
  });
  //#endregion

  //#region UDF's

  const fetchActiveUsers = async () => {
    try {
      const res = await axiosPrivate.get(USERS_API.fetch_all_active, { params: { page, perPage } });
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
    const fetchUsers = async () => {
      try {
        const res = await axiosPrivate.get(USERS_API.fetch_all_active, { params: { page, perPage } });
        const users = res.data.result.map(user => ({ ...user, editMode: false }));
        setState(users);
        setActiveDataLength(res.data.totalRows);
      } catch (err) {
        toastAlerts('error', 'There is an error');
      }
    };

    fetchUsers();
  }, [axiosPrivate, page, perPage]);
  //#endregion

  //#region Events
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
      <Grid container justifyContent="flex-start" className={classes.buttonContainer}>
        {isAdmin && (
          <Button size="small" color="primary" variant="contained" className={classes.newButton} onClick={onDrawerOpen}>
            New
          </Button>
        )}
      </Grid>
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

export default withSort(ActiveUsers, '_id');
