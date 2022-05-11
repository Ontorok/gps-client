import { Button, Grid, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomDrawer, CustomTable, TextInput } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CLUB_API } from 'services/apiEndPoints';
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
      sortName: 'serial',
      name: 'serial',
      label: 'Serial',
      minWidth: 100,
      isDisableSorting: true
    },
    {
      sortName: 'name',
      name: 'name',
      label: 'Club Name',
      minWidth: 145,
      isDisableSorting: true
    },
    {
      sortName: 'state',
      name: 'state',
      label: 'State',
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
    const fetchActiveClubs = async () => {
      try {
        const res = await axiosPrivate.get(CLUB_API.fetch_all);
        //const res = await axiosInstance.get(CLUB_API.fetch_all, { params: { page, perPage } });
        const clubs = res.data.result.map(club => ({ ...club, editMode: false }));
        setState(clubs);
        setActiveDataLength(10);
      } catch (err) {
        // toastAlerts('error', 'There is an error');
        history.push('/signin', { state: { from: location }, replace: true });
      }
    };

    fetchActiveClubs();
  }, [axiosPrivate, history, location, page, perPage]);
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
            <TableRow key={row._id}>
              <TableCell>{row.serial}</TableCell>
              {row.editMode ? (
                <TableCell>
                  <TextInput type="text" name="name" value={row.name} onChange={e => onInputChange(e, row._id)} />
                </TableCell>
              ) : (
                <TableCell>{row.name}</TableCell>
              )}
              <TableCell>{row.state ? 'Active' : 'Inactive'}</TableCell>

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
      <CustomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} title="Club">
        <ClubForm recordForEdit={{}} onSubmit={() => {}} />
      </CustomDrawer>
    </Fragment>
  );
};

export default withSort(AcitveClubs, 'id');
