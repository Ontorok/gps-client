import { Collapse, Grid, IconButton, TableCell, TableRow, Tooltip } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { ActionButtonGroup, CustomAutoComplete, CustomBackdrop, CustomDatePicker, ResetButton, SearchButton, SelectableTable } from 'components';
import { ROLES } from 'constants/RolesConstants';
import { SORT_TYPES } from 'constants/SortTypes';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CLUB_API, ENTRIES_API, GROOMER_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { isObjEmpty, mapArrayToDropdown, sleep } from 'utils/commonHelper';
import { formattedDate, serverDate } from 'utils/dateHelper';

const initialFilterState = {
  clubId: '',
  deviceId: '',
  fromDate: '',
  toDate: ''
};

const columns = [
  {
    name: 'clubName',
    sortName: 'clubName',
    label: 'Club',
    minWidth: 150,
    isDisableSorting: false
  },
  {
    name: 'groomerName',
    sortName: 'groomerName',
    label: 'Groomer',
    minWidth: 150,
    isDisableSorting: false
  },
  {
    name: 'fundingStatus',
    sortName: 'fundingStatus',
    label: 'Funding Status',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    name: 'date',
    sortName: 'date',
    label: 'Date',
    minWidth: 150,
    isDisableSorting: false
  },
  {
    name: 'trailName',
    sortName: 'trailName',
    label: 'Trail',
    minWidth: 120,
    isDisableSorting: true
  },
  {
    name: 'rate',
    sortName: 'rate',
    label: 'Rate',
    minWidth: 130,
    isDisableSorting: false
  },
  {
    name: 'eligibleTimeInHour',
    sortName: 'eligibleTimeInHour',
    label: 'Hours',
    minWidth: 130,
    isDisableSorting: false
  },

  {
    name: 'total',
    sortName: 'total',
    label: 'Total',
    minWidth: 120,
    isDisableSorting: false
  }
];

const FundedEntries = ({ sortedColumn, sortedBy, onSort }) => {
  //#region Hooks
  const axiosPrivate = useAxiosPrivate();
  const { authUser } = useSelector(({ auth }) => auth);
  //#endregion

  //#region States
  const [state, setState] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalofTotal, setTotalofTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [dataLength, setDataLength] = useState(0);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState(null);
  const [groomers, setGroomers] = useState([]);
  const [groomer, setGroomer] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  //#endregion

  //#region UDF's
  const fetchFundedEntries = async (obj = {}) => {
    try {
      const res = await axiosPrivate.get(ENTRIES_API.fetch_all_funded, {
        params: isObjEmpty(obj) ? { page, perPage, sortedColumn, sortedBy } : { page, perPage, sortedColumn, sortedBy, ...obj }
      });
      const grooming = res.data.result.map(entry => ({
        ...entry,
        eligibleTimeInHour: entry.eligibleTimeInHour.toFixed(2),
        total: entry.total.toFixed(2),
        selected: false
      }));
      const total = res.data.total;
      const totalHours = grooming.reduce((acc, curr) => (acc += parseFloat(curr.eligibleTimeInHour)), 0);
      const totalofTotal = grooming.reduce((acc, curr) => (acc += parseFloat(curr.total)), 0);
      const totalHoursInDecimal = totalHours.toFixed(2);
      const totalofTotalInDecimal = totalofTotal.toFixed(2);
      setState(grooming);
      setDataLength(total);
      setTotalHours(totalHoursInDecimal);
      setTotalofTotal(totalofTotalInDecimal);
    } catch (err) {
      toastAlerts('error', 'There is an error');
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
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get(ENTRIES_API.fetch_all_funded, {
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
        const grooming = res.data.result.map(entry => ({
          ...entry,
          eligibleTimeInHour: entry.eligibleTimeInHour.toFixed(2),
          total: entry.total.toFixed(2),
          selected: false
        }));
        const totalRows = res.data.total;
        const totalHours = grooming.reduce((acc, curr) => (acc += parseFloat(curr.eligibleTimeInHour)), 0);
        const totalofTotal = grooming.reduce((acc, curr) => (acc += parseFloat(curr.total)), 0);
        const totalHoursInDecimal = totalHours.toFixed(2);
        const totalofTotalInDecimal = totalofTotal.toFixed(2);
        if (isMounted) {
          setState(grooming);
          setDataLength(totalRows);
          setTotalHours(totalHoursInDecimal);
          setTotalofTotal(totalofTotalInDecimal);
        }
      } catch (err) {
        toastAlerts('error', 'There is an error');
      }
    };
    fetchData();
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
      setGroomers([]);
      setGroomer(null);
      setFilterState(prev => ({ ...prev, clubId: newValue.value }));
    } else {
      setClub(null);
      setFilterState(prev => ({ ...prev, clubId: '' }));
    }
  };

  const onFetchGroomers = async () => {
    if (groomers.length === 0) {
      const clubId = club ? club.value : authUser.clubId;
      try {
        const res = await axiosPrivate.get(GROOMER_API.fetch_by_club(clubId));
        if (res.data.succeed) {
          const activeGroomers = mapArrayToDropdown(res.data.result, 'name', 'normalizeGpsId');
          await sleep(500);
          setGroomers(activeGroomers);
        }
      } catch (err) {}
    }
  };

  const onFilterGroomerChange = (e, newValue) => {
    if (newValue) {
      setGroomer(newValue);
      setFilterState({ ...filterState, deviceId: newValue.value });
    } else {
      setGroomer(null);
      setFilterState({ ...filterState, deviceId: '' });
    }
  };

  const onFromDateChange = date => {
    if (date) {
      setFromDate(date);
      setToDate(null);
      setFilterState({ ...filterState, fromDate: serverDate(date) });
    } else {
      setFromDate(null);
      setToDate(null);
      setFilterState({ ...filterState, fromDate: '' });
    }
  };

  const onToDateChange = date => {
    if (date) {
      setToDate(date);
      setFilterState({ ...filterState, toDate: serverDate(date) });
    } else {
      setToDate(null);
      setFilterState({ ...filterState, toDate: '' });
    }
  };

  const onSearch = () => {
    let searchObj = {};
    for (const [key, value] of Object.entries(filterState)) {
      if (value) {
        searchObj[key] = value;
      }
    }
    fetchFundedEntries(searchObj);
  };

  const onResetSearch = () => {
    setFilterState(initialFilterState);
    setClub(null);
    setGroomer(null);
    fetchFundedEntries();
  };

  const onPageChange = (event, pageNumber) => {
    setPage(pageNumber);
    setCheckedAll(false);
    setCheckedItems([]);
  };

  const onPerPageChange = e => {
    setPerPage(e.target.value);
    setPage(1);
    setCheckedAll(false);
    setCheckedItems([]);
  };

  const onRowSelectionChange = (e, rowIndex) => {
    const { checked } = e.target;
    const _state = _.cloneDeep(state);
    let _checkedItems = [...checkedItems];
    const targetedObj = _state[rowIndex];
    targetedObj.selected = checked;
    if (checked) {
      _checkedItems.push(targetedObj);
    } else {
      _checkedItems = checkedItems.filter(item => item._id !== targetedObj._id);
    }
    _state[rowIndex] = targetedObj;
    setCheckedAll(_state.every(item => item.selected));
    setCheckedItems(_checkedItems);
    setState(_state);
  };

  const onCheckedAllChange = e => {
    const { checked } = e.target;
    if (checked) {
      const _checkedItems = [...state];
      _checkedItems.forEach(item => (item.selected = true));
      setCheckedItems(_checkedItems);
    } else {
      const _checkedItems = [...state];
      _checkedItems.forEach(item => (item.selected = false));
      setCheckedItems([]);
    }
    setCheckedAll(checked);
  };

  const onRangeAction = async () => {
    const markedIds = checkedItems.map(ci => ci._id);
    const payload = {
      markedIds: markedIds,
      isInvalid: true
    };
    setLoading(true);
    try {
      const res = await axiosPrivate.put(ENTRIES_API.change_validity, payload);
      await sleep(1000);
      if (res.data.succeed) {
        setCheckedItems([]);
        setCheckedAll(false);
        setLoading(false);
        toastAlerts('success', res.data.message);
        fetchFundedEntries();
      }
    } catch (err) {
      setLoading(false);
      toastAlerts('error', err.response.data.message);
    }
  };
  //#endregion

  //#region Meta
  const isAdmin = authUser?.role === ROLES.Admin || authUser?.role === ROLES.SuperAdmin;
  const isManager = authUser?.role === ROLES.Manager;
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
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <CustomAutoComplete name="clubId" label="Clubs" data={clubs} value={club} onFoucs={onFetchClubs} onChange={onFilterClubChange} />
            </Grid>
          )}

          <Grid item xs={12} sm={3} md={3} lg={3}>
            <CustomAutoComplete
              name="clubId"
              label="Groomers"
              data={groomers}
              value={groomer}
              onFoucs={onFetchGroomers}
              onChange={onFilterGroomerChange}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3} lg={3}>
            <CustomDatePicker clearable disableFuture label="From Date" value={fromDate} onChange={onFromDateChange} />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <CustomDatePicker
              clearable
              disabled={!fromDate}
              minDate={fromDate}
              disableFuture
              label="To Date"
              value={toDate}
              onChange={onToDateChange}
            />
          </Grid>

          <Grid item container justifyContent="flex-start">
            <SearchButton onClick={onSearch} />
            <ResetButton onClick={onResetSearch} />
          </Grid>
        </Grid>
      </Collapse>
      <SelectableTable
        appearedMarkAllCheck={isAdmin || isManager}
        totalHours={totalHours}
        totalofTotal={totalofTotal}
        columns={columns}
        rowPerPage={perPage}
        count={Math.ceil(dataLength / perPage)}
        onPageChange={onPageChange}
        onRowPerPageChange={onPerPageChange}
        sortedColumn={sortedColumn}
        sortedBy={sortedBy}
        onSort={onSort}
        checkedItems={checkedItems}
        checkedAll={checkedAll}
        onCheckedAllChange={onCheckedAllChange}
        onRangeAction={onRangeAction}
        rangeActionButtonText="Mark as Invalid">
        {state.map((row, index) => (
          <TableRow key={row._id}>
            {(isAdmin || isManager) && (
              <TableCell>
                <input type="checkbox" checked={row.selected} onChange={e => onRowSelectionChange(e, index)} />
              </TableCell>
            )}

            <TableCell>{row.clubName}</TableCell>
            <TableCell>{row.groomerName}</TableCell>
            <TableCell>{row.fundingStatus}</TableCell>
            <TableCell>{formattedDate(row.date, 'DD-MMM-yyyy')}</TableCell>
            <TableCell>{row.trailName}</TableCell>
            <TableCell>{row.rate}</TableCell>
            <TableCell>{row.eligibleTimeInHour}</TableCell>
            <TableCell>{row.total}</TableCell>
            <TableCell>
              <ActionButtonGroup appearedDeleteButton onDelete={() => console.log(row)} />
            </TableCell>
          </TableRow>
        ))}
      </SelectableTable>
      <CustomBackdrop open={loading} />
    </Fragment>
  );
};

export default withSort(FundedEntries, 'date', SORT_TYPES.Desc);
