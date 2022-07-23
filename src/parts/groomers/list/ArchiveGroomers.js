import { Collapse, Grid, IconButton, TableCell, TableRow, Tooltip } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { ActionButtonGroup, CustomAutoComplete, CustomConfirmDialog, CustomTable, ResetButton, SearchButton, TextInput } from 'components';
import { ROLES } from 'constants/RolesConstants';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CLUB_API, GROOMER_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { isObjEmpty, mapArrayToDropdown, sleep } from 'utils/commonHelper';
//#region Colums for Table
const columns = [
  {
    sortName: 'clubName',
    name: 'clubName',
    label: 'Club',
    isDisableSorting: false
  },
  {
    sortName: 'name',
    name: 'name',
    label: 'Groomer Name',
    minWidth: 150,
    isDisableSorting: false
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
    isDisableSorting: false
  }
];
//#endregion

const initialFilterState = {
  clubId: '',
  name: '',
  gpsId: ''
};

const ArchiveGroomer = ({ sortedColumn, sortedBy, onSort }) => {
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
  const fetchArchiveGroomer = async (obj = {}) => {
    try {
      const res = await axiosPrivate.get(GROOMER_API.fetch_all_archive, {
        params: isObjEmpty(obj) ? { page, perPage, sortedColumn, sortedBy } : { page, perPage, sortedColumn, sortedBy, ...obj }
      });
      const groomers = res.data.result.map(groomer => ({ ...groomer }));
      setState(groomers);
      setActiveDataLength(res.data.total);
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
        const res = await axiosPrivate.get(GROOMER_API.fetch_all_archive, {
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
        const groomers = res.data.result.map(groomer => ({ ...groomer }));
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
    fetchArchiveGroomer(searchObj);
  };

  const onResetSearch = () => {
    setFilterState(initialFilterState);
    setClub(null);
    fetchArchiveGroomer();
  };

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
      const res = await axiosPrivate.put(GROOMER_API.reStore, {}, { params: { id } });
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchArchiveGroomer();
    }
  };

  //#endregion

  //#region Meta
  const isAdmin = authUser?.role === ROLES.Admin || authUser?.role === ROLES.SuperAdmin;
  //#endregion
  return (
    <Fragment>
      <Grid container>
        <Grid item container justifyContent="flex-end" xs={12}>
          <Tooltip title="Filter">
            <IconButton onClick={() => setOpenFilter(prev => !prev)}>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Collapse in={openFilter}>
        <Grid container alignItems="center" spacing={3} style={{ padding: '0 10px' }}>
          {isAdmin && (
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <CustomAutoComplete name="clubId" label="Clubs" data={clubs} value={club} onFoucs={onFetchClubs} onChange={onFilterClubChange} />
            </Grid>
          )}

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextInput label="Name" name="name" value={filterState.name} onChange={e => setFilterState({ ...filterState, name: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextInput
              label="Device ID"
              name="gpsId"
              value={filterState.gpsId}
              onChange={e => setFilterState({ ...filterState, gpsId: e.target.value })}
            />
          </Grid>

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
              <TableCell>{row.clubName}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.gpsId}</TableCell>
              <TableCell>{row.rate}</TableCell>
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

export default withSort(ArchiveGroomer, 'name');
