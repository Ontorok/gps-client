import { TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomBackdrop, SelectableTable } from 'components';
import { ROLES } from 'constants/RolesConstants';
import { SORT_TYPES } from 'constants/SortTypes';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ENTRIES_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { sleep } from 'utils/commonHelper';
import { formattedDate } from 'utils/dateHelper';

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

const InvalidEntries = ({ sortedColumn, sortedBy, onSort }) => {
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
  //#endregion

  //#region UDF's
  const fetchInvalidEntries = async () => {
    try {
      const res = await axiosPrivate.get(ENTRIES_API.fetch_all_invalid_entries, { params: { page, perPage } });
      const invalid = res.data.result.map(entry => ({
        ...entry,
        eligibleTimeInHour: entry.eligibleTimeInHour.toFixed(2),
        total: entry.total.toFixed(2),
        selected: false
      }));
      const total = res.data.total;
      const totalHours = invalid.reduce((acc, curr) => (acc += parseFloat(curr.eligibleTimeInHour)), 0);
      const totalofTotal = invalid.reduce((acc, curr) => (acc += parseFloat(curr.total)), 0);
      const totalHoursInDecimal = totalHours.toFixed(2);
      const totalofTotalInDecimal = totalofTotal.toFixed(2);
      setState(invalid);
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
    const fetchEntries = async () => {
      try {
        const res = await axiosPrivate.get(ENTRIES_API.fetch_all_invalid_entries, { params: { page, perPage }, signal: controller.signal });
        const invalid = res.data.result.map(entry => ({
          ...entry,
          eligibleTimeInHour: entry.eligibleTimeInHour.toFixed(2),
          total: entry.total.toFixed(2),
          selected: false
        }));
        const total = res.data.total;
        const totalHours = invalid.reduce((acc, curr) => (acc += parseFloat(curr.eligibleTimeInHour)), 0);
        const totalofTotal = invalid.reduce((acc, curr) => (acc += parseFloat(curr.total)), 0);
        const totalHoursInDecimal = totalHours.toFixed(2);
        const totalofTotalInDecimal = totalofTotal.toFixed(2);
        if (isMounted) {
          setState(invalid);
          setDataLength(total);
          setTotalHours(totalHoursInDecimal);
          setTotalofTotal(totalofTotalInDecimal);
        }
      } catch (err) {
        toastAlerts('error', 'There is an error');
      }
    };
    fetchEntries();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, page, perPage]);
  //#endregion

  //#region Events
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
    // eslint-disable-next-line no-undef
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
      isInvalid: false
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
        fetchInvalidEntries();
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
        rangeActionButtonText="Restore">
        {state.length > 0 ? (
          state.map((row, index) => (
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
                <ActionButtonGroup appearedDeleteButton={isAdmin} onDelete={() => console.log(row)} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10}>
              <h3 style={{ textAlign: 'center' }}>No data to show</h3>
            </TableCell>
          </TableRow>
        )}
      </SelectableTable>
      <CustomBackdrop open={loading} />
    </Fragment>
  );
};

export default withSort(InvalidEntries, 'date', SORT_TYPES.Desc);
