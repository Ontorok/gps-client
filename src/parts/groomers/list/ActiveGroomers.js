import { Button, Grid, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomBackdrop, CustomConfirmDialog, CustomDrawer, CustomTable, TextInput } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { GROOMER_API } from 'services/apiEndPoints';
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
  }
];
//#endregion

const ActiveGroomer = ({ sortedColumn, sortedBy, onSort }) => {
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();

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
      const res = await axiosPrivate.get(GROOMER_API.fetch_all, {
        params: isObjEmpty(obj) ? { page, perPage, sortedColumn, sortedBy } : { page, perPage, sortedColumn, sortedBy, ...obj }
      });
      const groomers = res.data.result.map(groomer => ({ ...groomer, editMode: false, prevName: groomer.name }));
      setState(groomers);
      setActiveDataLength(res.data.total);
    } catch (err) {
      toastAlerts('error', err.message);
    }
  };

  function toggleEditMode(id) {
    const updatedState = state.map(item => {
      if (item.id === id) {
        item['editMode'] = !item.editMode;
        if (item.editMode === false && item.name !== item.prevName) {
          item['name'] = item.prevName;
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
        const res = await axiosPrivate.get(GROOMER_API.fetch_all, {
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
        const groomers = res.data.result.map(groomer => ({ ...groomer, editMode: false, prevName: groomer.name }));
        isMounted && setState(groomers);
        isMounted && setActiveDataLength(res.data.total);
      } catch (err) {
        toastAlerts('error', 'There is an error');
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
    const { name, value } = e.target;
    const _data = [...state];
    _data.map(u => {
      if (u._id === id) {
        u[name] = value;
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
      gpsId: formValue.gpsId,
      rate: formValue.rate
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

              <TableCell>{row.gpsId}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell align="center">
                <ActionButtonGroup
                  appearedEditButton={!row.editMode}
                  onEdit={() => {
                    toggleEditMode(row.id);
                  }}
                  appearedDeleteButton={!row.editMode}
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
                    toggleEditMode(row.id);
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
