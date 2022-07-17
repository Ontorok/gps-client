import { TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomBackdrop, SelectableTable } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { ENTRIES_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { sleep } from 'utils/commonHelper';
import { formattedDate } from 'utils/dateHelper';

const columns = [
  {
    name: 'deviceId',
    sortName: 'deviceId',
    label: 'ID',
    minWidth: 80,
    isDisableSorting: true
  },
  {
    name: 'groomerName',
    sortName: 'groomerName',
    label: 'Groomer',
    minWidth: 150,
    isDisableSorting: true
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
    isDisableSorting: true
  },
  {
    name: 'trailName',
    sortName: 'trailName',
    label: 'Trail',
    minWidth: 120,
    isDisableSorting: true
  },
  {
    name: 'eligibleTimeInHour',
    sortName: 'eligibleTimeInHour',
    label: 'Hours',
    minWidth: 130,
    isDisableSorting: true
  },
  {
    name: 'rate',
    sortName: 'rate',
    label: 'Rate',
    minWidth: 130,
    isDisableSorting: true
  },
  {
    name: 'total',
    sortName: 'total',
    label: 'Total',
    minWidth: 120,
    isDisableSorting: true
  }
];

const FundedEntries = ({ sortedColumn, sortedBy, onSort }) => {
  const axiosPrivate = useAxiosPrivate();
  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [dataLength, setDataLength] = useState(0);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  //#endregion

  //#region UDF's
  const fetchFundedEntries = async () => {
    try {
      const res = await axiosPrivate.get(ENTRIES_API.fetch_all_funded, { params: { page, perPage } });
      const grooming = res.data.result.map(entry => ({
        ...entry,
        selected: false
      }));
      const total = res.data.total;
      setState(grooming);
      setDataLength(total);
    } catch (err) {
      toastAlerts('error', 'There is an error');
    }
  };
  //#endregion

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get(ENTRIES_API.fetch_all_funded, { params: { page, perPage }, signal: controller.signal });
        const grooming = res.data.result.map(entry => ({
          ...entry,
          selected: false
        }));
        const total = res.data.total;
        if (isMounted) {
          setState(grooming);
          setDataLength(total);
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
  }, [axiosPrivate, page, perPage]);

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

  return (
    <Fragment>
      <SelectableTable
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
            <TableCell>
              <input type="checkbox" checked={row.selected} onChange={e => onRowSelectionChange(e, index)} />
            </TableCell>
            <TableCell>{row.deviceId}</TableCell>
            <TableCell>{row.groomerName}</TableCell>
            <TableCell>{row.fundingStatus}</TableCell>
            <TableCell>{formattedDate(row.date, 'DD-MMM-yyyy')}</TableCell>
            <TableCell>{row.trailName}</TableCell>
            <TableCell>{row.eligibleTimeInHour}</TableCell>
            <TableCell>{row.rate}</TableCell>
            <TableCell>{row.total}</TableCell>
            <TableCell>
              <ActionButtonGroup appearedDeleteButton appearedEditButton onEdit={() => console.log(row)} onDelete={() => console.log(row)} />
            </TableCell>
          </TableRow>
        ))}
      </SelectableTable>
      <CustomBackdrop open={loading} />
    </Fragment>
  );
};

export default withSort(FundedEntries, 'deviceId');
