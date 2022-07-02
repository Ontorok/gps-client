import { TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomTable } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { GROOMER_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { isObjEmpty } from 'utils/commonHelper';
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

const initialFilterState = {
  name: '',
  status: ''
};

const ArchiveGroomer = ({ sortedColumn, sortedBy, onSort }) => {
  //#region Hooks
  const axiosPrivate = useAxiosPrivate();
  //#endregion

  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [filterState] = useState(initialFilterState);
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

  //#region Events
  const onRowPerPageChange = e => {
    setPerPage(e.target.value);
    setPage(1);
  };

  const onPageChange = (event, pageNumber) => {
    setPage(pageNumber);
  };

  //#endregion
  return (
    <Fragment>
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.gpsId}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell align="center">
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
    </Fragment>
  );
};

export default withSort(ArchiveGroomer, 'id');
