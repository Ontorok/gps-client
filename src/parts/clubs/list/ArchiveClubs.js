import { TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomTable, TextInput } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CLUB_API } from 'services/apiEndPoints';

const ArchiveClubs = ({ sortedColumn, sortedBy, onSort }) => {
  //#region Colums for Table
  const columns = [
    {
      sortName: 'id',
      name: 'id',
      label: 'ID',
      minWidth: 100,
      isDisableSorting: false
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
      isDisableSorting: false
    }
  ];
  //#endregion
  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeDataLength, setActiveDataLength] = useState(0);

  const location = useLocation();
  const history = useHistory();
  const axiosPrivate = useAxiosPrivate();

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
    const fetchArchiveClubs = async () => {
      try {
        const res = await axiosPrivate.get(CLUB_API.fetch_all);
        const users = res.data.result.map(user => ({ ...user, editMode: false }));
        setState(users);
        setActiveDataLength(10);
      } catch (err) {
        // toastAlerts('error', 'There is an error');
        history.push('/signin', { state: { from: location }, replace: true });
      }
    };

    fetchArchiveClubs();
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
                  <TextInput type="text" name="name" value={row.name} onChange={e => onInputChange(e, row.id)} />
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
    </Fragment>
  );
};

export default withSort(ArchiveClubs, 'id');
