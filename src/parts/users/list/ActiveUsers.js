import { Button, Grid, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomDrawer, CustomTable } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
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
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();

  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //#endregion

  //#region UDF's
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
  //#endregion
  return (
    <Fragment>
      <Grid container justifyContent="flex-start" className={classes.buttonContainer}>
        <Button size="small" color="primary" variant="contained" className={classes.newButton} onClick={onDrawerOpen}>
          New
        </Button>
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
                  appearedEditButton={!row.editMode}
                  onEdit={() => {
                    toggleEditMode(row.id);
                  }}
                  appearedDeleteButton={!row.editMode}
                  onDelete={() => {}}
                  appearedCancelButton={row.editMode}
                  onCancel={() => {
                    toggleEditMode(row.id);
                  }}
                  appearedDoneButton={row.editMode}
                  onDone={() => {
                    toggleEditMode(row.id);
                  }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </CustomTable>
      <CustomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} title="User">
        <UserForm create={onCreate} loading={loading} />
      </CustomDrawer>
    </Fragment>
  );
};

export default withSort(ActiveUsers, 'id');
