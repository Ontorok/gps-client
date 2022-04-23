import { Button, Grid, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomDrawer, CustomTable, TextInput } from 'components';
import withSort from 'hoc/withSort';
import React, { Fragment, useEffect, useState } from 'react';
import { GROOMER_API } from 'services/apiEndPoints';
import { axiosInstance } from 'services/auth/jwt/config';
import { toastAlerts } from 'utils/alert';
import GroomerForm from '../forms/GroomerForm';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    padding: '10px'
  },
  newButton: {
    textTransform: 'none'
  }
}));

const ActiveGroomer = ({ sortedColumn, sortedBy, onSort }) => {
  const classes = useStyles();
  //#region Colums for Table
  const columns = [
    {
      sortName: 'id',
      name: 'id',
      label: 'ID',
      minWidth: 150,
      isDisableSorting: false
    },
    {
      sortName: 'clubName',
      name: 'clubName',
      label: 'Club Name',
      minWidth: 150,
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
      sortName: 'groomerGPSId',
      name: 'groomerGPSId',
      label: 'Groomer GPS Id',
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
  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    const fetchActiveGroomer = async () => {
      try {
        const res = await axiosInstance.get(GROOMER_API.fetch_all, { params: { page, perPage } });
        const users = res.data.result.map(user => ({ ...user, editMode: false }));
        setState(users);
        setActiveDataLength(res.data.totalRows);
      } catch (err) {
        toastAlerts('error', 'There is an error');
      }
    };

    fetchActiveGroomer();
  }, [page, perPage]);
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
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.clubName}</TableCell>
              {row.editMode ? (
                <TableCell>
                  <TextInput type="text" name="groomerName" value={row.groomerName} onChange={e => onInputChange(e, row.id)} />
                </TableCell>
              ) : (
                <TableCell>{row.groomerName}</TableCell>
              )}

              <TableCell>{row.groomerGPSId}</TableCell>
              <TableCell>{row.rate}</TableCell>
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
      <CustomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} title="Groomer">
        <GroomerForm recordForEdit={{}} onSubmit={() => {}} />
      </CustomDrawer>
    </Fragment>
  );
};

export default withSort(ActiveGroomer, 'id');