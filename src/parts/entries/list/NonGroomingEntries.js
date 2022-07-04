import { TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, SelectableTable } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { ENTRIES_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { formattedDate } from 'utils/dateHelper';

const NonGroomingEntries = ({ sortedColumn, sortedBy, onSort }) => {
  const axiosPrivate = useAxiosPrivate();
  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [dataLength, setDataLength] = useState(0);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  //#endregion

  const columns = [
    {
      name: 'deviceId',
      sortName: 'deviceId',
      label: 'ID',
      minWidth: 80,
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
      name: 'operator',
      sortName: 'operator',
      label: 'Operator',
      minWidth: 120,
      isDisableSorting: true
    },
    {
      name: 'eligibleTime',
      sortName: 'eligibleTime',
      label: 'L.Hours',
      minWidth: 130,
      isDisableSorting: true
    },
    {
      name: 'equiment1',
      sortName: 'equiment1',
      label: 'Equip#1',
      minWidth: 120,
      isDisableSorting: true
    },
    {
      name: 'equiment2',
      sortName: 'equiment2',
      label: 'Equip#2',
      minWidth: 120,
      isDisableSorting: true
    },
    {
      name: 'equiment3',
      sortName: 'equiment3',
      label: 'Equip#3',
      minWidth: 120,
      isDisableSorting: true
    },
    {
      name: 'equiment4',
      sortName: 'equiment4',
      label: 'Equip#4',
      minWidth: 120,
      isDisableSorting: true
    },
    {
      name: 'subTotal',
      sortName: 'subTotal',
      label: 'Sub Total',
      minWidth: 120,
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchGroomingEntries = async () => {
      try {
        const res = await axiosPrivate.get(ENTRIES_API.fetch_all_non_grooming_entries, { params: { page, perPage }, signal: controller.signal });
        const nongrooming = res.data.result.map(entry => ({
          ...entry,
          operator: 'N/A',
          equiment1: 'N/A',
          equiment2: 'N/A',
          equiment3: 'N/A',
          equiment4: 'N/A',
          subTotal: 0,
          total: 0
        }));
        const total = res.data.total;
        if (isMounted) {
          setState(nongrooming);
          setDataLength(total);
        }
      } catch (err) {
        toastAlerts('error', 'There is an error');
      }
    };
    fetchGroomingEntries();
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
      _checkedItems = checkedItems.filter(item => item.id !== targetedObj.id);
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
    // eslint-disable-next-line no-console
    console.log(checkedItems);
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
            <TableCell>{row.fundingStatus}</TableCell>
            <TableCell>{formattedDate(row.date, 'DD-MMM-yyyy')}</TableCell>
            <TableCell>{row.trailName}</TableCell>
            <TableCell>{row.operator}</TableCell>
            <TableCell>{row.eligibleTime}</TableCell>
            <TableCell>{row.equiment1}</TableCell>
            <TableCell>{row.equiment2}</TableCell>
            <TableCell>{row.equiment3}</TableCell>
            <TableCell>{row.equiment4}</TableCell>
            <TableCell>{row.subTotal}</TableCell>
            <TableCell>{row.total}</TableCell>
            <TableCell>
              <ActionButtonGroup appearedDeleteButton appearedEditButton onEdit={() => console.log(row)} onDelete={() => console.log(row)} />
            </TableCell>
          </TableRow>
        ))}
      </SelectableTable>
    </Fragment>
  );
};

export default withSort(NonGroomingEntries, 'id');
