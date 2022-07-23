import { Collapse, Grid, IconButton, TableCell, TableRow, Tooltip } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { ActionButtonGroup, CustomAutoComplete, CustomConfirmDialog, CustomTable, ResetButton, SearchButton, TextInput } from 'components';
import { ROLES } from 'constants/RolesConstants';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CLUB_API, USERS_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { isObjEmpty, mapArrayToDropdown, sleep } from 'utils/commonHelper';

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

const initialFilterState = {
  clubId: '',
  name: '',
  email: '',
  phone: ''
};

const Archiveuser = ({ sortedColumn, sortedBy, onSort }) => {
  //#region Hooks
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useSelector(({ auth }) => auth);
  //#endregion

  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [activeDataLength, setActiveDataLength] = useState(0);
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
  const fetchArchiveUsers = async (obj = {}) => {
    try {
      const res = await axiosPrivate.get(USERS_API.fetch_all_archive, {
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
        const res = await axiosPrivate.get(USERS_API.fetch_all_archive, {
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
    fetchArchiveUsers(searchObj);
  };

  const onResetSearch = () => {
    setFilterState(initialFilterState);
    setClub(null);
    fetchArchiveUsers();
  };

  const onRowPerPageChange = e => {
    setPerPage(e.target.value);
    setPage(1);
  };

  const onPageChange = (event, pageNumber) => {
    setPage(pageNumber);
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

  const onRestore = async id => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      const res = await axiosPrivate.put(USERS_API.reStore_user(id));
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchArchiveUsers();
    }
  };
  //#endregion

  //#region Meta
  const isAdmin = authUser?.role === ROLES.Admin || authUser?.role === ROLES.SuperAdmin;
  //#endregion
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} container justifyContent="flex-end">
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
                  appearedReactiveButton={isAdmin}
                  onRestore={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Re-store user?',
                      content: 'Are you sure to re-store this user??',
                      onConfirm: () => onRestore(row._id)
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
    </Fragment>
  );
};

export default withSort(Archiveuser, 'id');
