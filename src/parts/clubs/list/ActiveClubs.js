import { Button, Checkbox, Grid, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomBackdrop, CustomConfirmDialog, CustomDrawer, CustomTable, TextInput } from 'components';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CLUB_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { sleep } from 'utils/commonHelper';
import ClubForm from '../forms/ClubForm';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    padding: '10px'
  },
  newButton: {
    textTransform: 'none'
  }
}));

const AcitveClubs = ({ sortedColumn, sortedBy, onSort }) => {
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const history = useHistory();
  //#region Colums for Table
  const columns = [
    {
      sortName: 'name',
      name: 'name',
      label: 'Club Name',
      minWidth: 145,
      isDisableSorting: false
    },
    {
      sortName: 'status',
      name: 'status',
      label: 'Status',
      minWidth: 140,
      isDisableSorting: true
    }
  ];
  //#endregion
  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    content: '',
    isOpen: false
  });
  //#endregion

  //#region UDF's

  const fetchActiveClub = async () => {
    try {
      const res = await axiosPrivate.get(CLUB_API.fetch_all, {
        params: { page, perPage, sortedColumn, sortedBy }
      });
      const clubs = res.data.result.map(club => ({ ...club, editMode: false }));
      setState(clubs);
      setActiveDataLength(res.data.total);
    } catch (err) {
      toastAlerts('error', err.message);
    }
  };

  function toggleEditMode(id) {
    const updatedState = state.map(item => {
      if (item._id === id) {
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
    const fetchdata = async () => {
      try {
        const res = await axiosPrivate.get(CLUB_API.fetch_all, {
          params: { page, perPage, sortedColumn, sortedBy },
          signal: controller.signal
        });
        const clubs = res.data.result.map(club => ({ ...club, editMode: false }));
        if (isMounted) {
          setState(clubs);
          setActiveDataLength(res.data.total);
        }
      } catch (err) {
        history.push('/signin', { state: { from: location }, replace: true });
      }
    };

    fetchdata();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, history, location, page, perPage, sortedBy, sortedColumn]);
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

  const onCreate = async formValue => {
    setLoading(true);
    try {
      const res = await axiosPrivate.post(CLUB_API.create, formValue);
      await sleep(1000);
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      setLoading(false);
      setDrawerOpen(false);
      fetchActiveClub();
    }
  };

  const onUpdate = async formValue => {
    setLoading(true);
    try {
      const res = await axiosPrivate.put(CLUB_API.update, formValue);
      await sleep(1000);
      setLoading(false);
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchActiveClub();
    }
  };

  const onDelete = async id => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      const res = await axiosPrivate.delete(CLUB_API.delete, { params: { id } });
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchActiveClub();
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
              {row.editMode ? (
                <TableCell>
                  <TextInput type="text" name="name" value={row.name} onChange={e => onInputChange(e, row._id)} />
                </TableCell>
              ) : (
                <TableCell>{row.name}</TableCell>
              )}

              {row.editMode ? (
                <TableCell>
                  <CustomCheckbox name="status" label="Active?" checked={row.status} onChange={e => onInputChange(e, row._id)} />
                </TableCell>
              ) : (
                <TableCell>
                  <Checkbox
                    style={{ color: '#215280' }}
                    color="primary"
                    defaultChecked={row.status}
                    disabled
                    disableFocusRipple
                    disableTouchRipple
                    disableRipple
                  />
                </TableCell>
              )}

              <TableCell align="center">
                <ActionButtonGroup
                  appearedEditButton={!row.editMode}
                  onEdit={() => {
                    toggleEditMode(row._id);
                  }}
                  appearedDeleteButton={!row.editMode}
                  onDelete={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Delete Club?',
                      content: 'Are you sure to delete this club??',
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
      <CustomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} title="Club">
        <ClubForm create={onCreate} loading={loading} />
      </CustomDrawer>
      <CustomBackdrop open={loading} />
    </Fragment>
  );
};

export default withSort(AcitveClubs, 'name');
