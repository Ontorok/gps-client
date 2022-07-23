import { Checkbox, Collapse, Grid, IconButton, makeStyles, TableCell, TableRow, Tooltip } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { ActionButtonGroup, CustomConfirmDialog, CustomTable, ResetButton, SearchButton, TextInput } from 'components';
import { ROLES } from 'constants/RolesConstants';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { CLUB_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { isObjEmpty } from 'utils/commonHelper';

const useStyles = makeStyles(theme => ({
  leftSection: {
    paddingLeft: 10,
    alignItems: 'center'
  },
  rightSection: {
    paddingRight: 10
  },
  newButton: {
    textTransform: 'none',
    height: 30
  }
}));

const initialFilterState = {
  clubName: ''
};
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
    sortName: 'state',
    name: 'state',
    label: 'State',
    minWidth: 140,
    isDisableSorting: true
  }
];

const ArchiveClubs = ({ sortedColumn, sortedBy, onSort }) => {
  //#region Hooks
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useSelector(({ auth }) => auth);
  //#endregion

  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [archiveDataLength, setArchiveDataLength] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    content: '',
    isOpen: false
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState(initialFilterState);
  //#endregion

  //#region UDF's
  const fetchArchiveClub = async (obj = {}) => {
    try {
      const res = await axiosPrivate.get(CLUB_API.fetch_all_archive, {
        params: isObjEmpty(obj) ? { page, perPage, sortedColumn, sortedBy } : { page, perPage, sortedColumn, sortedBy, ...obj }
      });
      const clubs = res.data.result;
      setState(clubs);
      setArchiveDataLength(res.data.total);
    } catch (err) {
      toastAlerts('error', err.message);
    }
  };
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
        const res = await axiosPrivate.get(CLUB_API.fetch_all_archive, {
          params: isObjEmpty(searchObj) ? { page, perPage, sortedColumn, sortedBy } : { page, perPage, sortedColumn, sortedBy, ...searchObj },
          signal: controller.signal
        });
        const clubs = res.data.result.map(user => ({ ...user, editMode: false }));
        if (isMounted) {
          setState(clubs);
          setArchiveDataLength(res.data.total);
        }
      } catch (err) {
        // toastAlerts('error', 'There is an error');
        history.push('/signin', { state: { from: location }, replace: true });
      }
    };

    fetchdata();
    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onRestore = async id => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      const res = await axiosPrivate.put(CLUB_API.reStore, {}, { params: { id } });
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchArchiveClub();
    }
  };

  const onSearch = () => {
    let searchObj = {};
    for (const [key, value] of Object.entries(filterState)) {
      if (value) {
        searchObj[key] = value;
      }
    }
    fetchArchiveClub(searchObj);
  };
  const onResetSearch = () => {
    setFilterState(initialFilterState);
    fetchArchiveClub();
  };
  //#endregion

  //#region Meta
  const isAdmin = authUser?.role === ROLES.Admin || authUser?.role === ROLES.SuperAdmin;
  //#endregion
  return (
    <Fragment>
      <Grid container>
        <Grid item container justifyContent="flex-start" xs={6} className={classes.leftSection}></Grid>
        <Grid item container justifyContent="flex-end" xs={6} className={classes.rightSection}>
          <Tooltip title="Filter">
            <IconButton onClick={() => setOpenFilter(prev => !prev)}>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Collapse in={openFilter}>
        <Grid container alignItems="center" spacing={3} style={{ padding: '0 10px' }}>
          <Grid item xs={12}>
            <TextInput
              label="Club Name"
              name="clubName"
              value={filterState.clubName}
              onChange={e => setFilterState({ ...filterState, clubName: e.target.value })}
            />
          </Grid>

          <Grid item container justifyContent="flex-end">
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
        count={Math.ceil(archiveDataLength / perPage)}>
        {state.map(row => {
          return (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
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
              <TableCell align="center">
                <ActionButtonGroup
                  appearedReactiveButton={isAdmin}
                  onRestore={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Re-store Club?',
                      content: 'Are you sure to re-store this club??',
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

export default withSort(ArchiveClubs, 'name');
