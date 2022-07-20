import { Button, Checkbox, Grid, makeStyles, TableCell, TableRow } from '@material-ui/core';
import Axios from 'axios';
import {
  ActionButtonGroup,
  CustomAutoComplete,
  CustomBackdrop,
  CustomCheckbox,
  CustomConfirmDialog,
  CustomDrawer,
  CustomTable,
  TextInput
} from 'components';
import { ROLES } from 'constants/RolesConstants';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CLUB_API, GROOMER_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { isObjEmpty, sleep } from 'utils/commonHelper';
import GroomerForm from '../forms/GroomerForm';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    padding: '10px'
  },
  newButton: {
    textTransform: 'none'
  }
}));

const initialFilterState = {
  name: '',
  status: ''
};

//#region Colums for Table
const columns = [
  {
    sortName: 'clubName',
    name: 'clubName',
    label: 'Club',
    isDisableSorting: true
  },
  {
    sortName: 'groomerName',
    name: 'groomerName',
    label: 'Groomer Name',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    sortName: 'gpsId',
    name: 'gpsId',
    label: 'GPS ID',
    minWidth: 170,
    isDisableSorting: true
  },
  {
    sortName: 'rate',
    name: 'rate',
    label: 'Rate',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    sortName: 'status',
    name: 'isActive',
    label: 'Status',
    minWidth: 140,
    isDisableSorting: true
  }
];
//#endregion

const ActiveGroomer = ({ sortedColumn, sortedBy, onSort }) => {
  //#region Hooks
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useSelector(({ auth }) => auth);
  //#endregion

  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterState] = useState(initialFilterState);
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    content: '',
    isOpen: false
  });
  //#endregion

  //#region UDF's
  const fetchActiveGroomer = async (obj = {}) => {
    try {
      const clubReq = axiosPrivate.get(CLUB_API.fetch_all_active);
      const groomerReq = axiosPrivate.get(GROOMER_API.fetch_all, {
        params: isObjEmpty(obj) ? { page, perPage, sortedColumn, sortedBy } : { page, perPage, sortedColumn, sortedBy, ...obj }
      });

      const [clubRes, groomerRes] = await Axios.all([clubReq, groomerReq]);
      const clubs = clubRes.data.result.map(club => ({ label: club.name, value: club._id }));
      const groomers = groomerRes.data.result.map(groomer => ({
        ...groomer,
        clubs: clubs,
        club: {
          label: groomer.clubName,
          value: groomer.clubId
        },
        editMode: false,
        prevName: groomer.name,
        prevGpsId: groomer.gpsId,
        prevRate: groomer.rate,
        prevClub: {
          label: groomer.clubName,
          value: groomer.clubId
        }
      }));
      setState(groomers);
      setActiveDataLength(groomerRes.data.total);
    } catch (err) {
      toastAlerts('error', err.message);
    }
  };

  function toggleEditMode(id) {
    const updatedState = state.map(item => {
      if (item._id === id) {
        item['editMode'] = !item.editMode;
        if (item.editMode === false && item.club.value !== item.prevClub.value) {
          item['club'] = item.prevClub;
        }
        if (item.editMode === false && item.name !== item.prevName) {
          item['name'] = item.prevName;
        }
        if (item.editMode === false && item.gpsId !== item.prevGpsId) {
          item['gpsId'] = item.prevGpsId;
        }
        if (item.editMode === false && item.rate !== item.prevRate) {
          item['rate'] = item.prevRate;
        }
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
    const fetchdata = async () => {
      try {
        const clubReq = axiosPrivate.get(CLUB_API.fetch_all_active, {
          signal: controller.signal
        });
        const groomerReq = axiosPrivate.get(GROOMER_API.fetch_all, {
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
        const [clubRes, groomerRes] = await Axios.all([clubReq, groomerReq]);
        const clubs = clubRes.data.result.map(club => ({ label: club.name, value: club._id }));
        const groomers = groomerRes.data.result.map(groomer => ({
          ...groomer,
          clubs: clubs,
          club: {
            label: groomer.clubName,
            value: groomer.clubId
          },
          editMode: false,
          prevName: groomer.name,
          prevGpsId: groomer.gpsId,
          prevRate: groomer.rate,
          prevClub: {
            label: groomer.clubName,
            value: groomer.clubId
          }
        }));
        if (isMounted) {
          setState(groomers);
          setActiveDataLength(groomerRes.data.total);
        }
      } catch (err) {
        toastAlerts('error', 'There is an error to fetch groomer');
      }
    };

    fetchdata();
    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosPrivate, page, perPage, sortedBy, sortedColumn]);
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
    const { type, name, value, checked } = e.target;
    const _data = [...state];
    _data.map(u => {
      if (u._id === id) {
        u[name] = type === 'checkbox' ? checked : value;
      }
      return u;
    });
    setState(_data);
  };

  const onClubChange = (e, newValue, id) => {
    const _data = [...state];
    _data.map(u => {
      if (u._id === id) {
        u['club'] = newValue;
      }
      return u;
    });
    setState(_data);
  };

  const onCreate = async formValue => {
    setLoading(true);
    try {
      const res = await axiosPrivate.post(GROOMER_API.create, formValue);
      await sleep(1000);
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      setLoading(false);
      setDrawerOpen(false);
      fetchActiveGroomer();
    }
  };

  const onUpdate = async formValue => {
    setLoading(true);
    const payload = {
      _id: formValue._id,
      name: formValue.name,
      clubId: formValue.club.value,
      clubName: formValue.club.label,
      gpsId: formValue.gpsId,
      rate: formValue.rate,
      isActive: formValue.isActive
    };
    try {
      const res = await axiosPrivate.put(GROOMER_API.update, payload);
      await sleep(1000);
      setLoading(false);
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchActiveGroomer();
    }
  };

  const onDelete = async id => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      const res = await axiosPrivate.delete(GROOMER_API.delete, { params: { id } });
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchActiveGroomer();
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
              {row.editMode ? (
                <TableCell style={{ minWidth: row.editMode ? 250 : 150 }}>
                  <CustomAutoComplete
                    name="clubId"
                    label="Clubs"
                    data={row.clubs}
                    value={row.club}
                    onChange={(e, newValue) => {
                      onClubChange(e, newValue, row._id);
                    }}
                  />
                </TableCell>
              ) : (
                <TableCell>{row.clubName}</TableCell>
              )}
              {row.editMode ? (
                <TableCell>
                  <TextInput type="text" name="name" value={row.name} onChange={e => onInputChange(e, row._id)} />
                </TableCell>
              ) : (
                <TableCell>{row.name}</TableCell>
              )}

              {/* <TableCell>{row.gpsId}</TableCell> */}
              {row.editMode ? (
                <TableCell>
                  <TextInput type="text" name="gpsId" value={row.gpsId} onChange={e => onInputChange(e, row._id)} />
                </TableCell>
              ) : (
                <TableCell>{row.gpsId}</TableCell>
              )}
              {/* <TableCell>{row.rate}</TableCell> */}
              {row.editMode ? (
                <TableCell>
                  <TextInput type="text" name="rate" value={row.rate} onChange={e => onInputChange(e, row._id)} />
                </TableCell>
              ) : (
                <TableCell>{row.rate}</TableCell>
              )}
              {row.editMode ? (
                <TableCell>
                  <CustomCheckbox name="isActive" label="Active?" checked={row.isActive} onChange={e => onInputChange(e, row._id)} />
                </TableCell>
              ) : (
                <TableCell>
                  <Checkbox
                    style={{ color: '#215280' }}
                    color="primary"
                    defaultChecked={row.isActive}
                    disabled
                    disableFocusRipple
                    disableTouchRipple
                    disableRipple
                  />
                </TableCell>
              )}
              <TableCell align="center">
                <ActionButtonGroup
                  appearedEditButton={!row.editMode && isAdmin}
                  onEdit={() => {
                    toggleEditMode(row._id);
                  }}
                  appearedDeleteButton={!row.editMode && isAdmin}
                  onDelete={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Delete Groomer?',
                      content: 'Are you sure to delete this groomer??',
                      onConfirm: () => onDelete(row._id)
                    });
                  }}
                  appearedCancelButton={row.editMode}
                  onCancel={() => {
                    toggleEditMode(row._id);
                  }}
                  appearedDoneButton={row.editMode}
                  onDone={() => {
                    onUpdate(row);
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
      <CustomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} title="Groomer">
        <GroomerForm create={onCreate} loading={loading} />
      </CustomDrawer>
      <CustomBackdrop open={loading} />
    </Fragment>
  );
};

export default withSort(ActiveGroomer, 'name');
