import { TableCell, TableRow } from '@material-ui/core';
import { ActionButtonGroup, CustomConfirmDialog, CustomTable } from 'components';
import withSort from 'hoc/withSort';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import React, { Fragment, useEffect, useState } from 'react';
import { USERS_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';

//#region Colums for Table
const columns = [
  {
    sortName: 'name',
    name: 'name',
    label: 'Full Name',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    sortName: 'username',
    name: 'username',
    label: 'Username',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    sortName: 'email',
    name: 'email',
    label: 'Email',
    minWidth: 150,
    isDisableSorting: true
  },
  {
    sortName: 'phone',
    name: 'phone',
    label: 'Phone',
    minWidth: 170,
    isDisableSorting: true
  },
  {
    sortName: 'clubName',
    name: 'clubName',
    label: 'Club',
    minWidth: 170,
    isDisableSorting: true
  }
];
//#endregion

const Archiveuser = ({ sortedColumn, sortedBy, onSort }) => {
  const axiosPrivate = useAxiosPrivate();

  //#region States
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeDataLength, setActiveDataLength] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    content: '',
    isOpen: false
  });

  //#endregion

  //#region UDF's

  const fetchArchiveUsers = async () => {
    try {
      const res = await axiosPrivate.get(USERS_API.fetch_all_archive, { params: { page, perPage } });
      const users = res.data.result.map(user => ({ ...user, editMode: false }));
      setState(users);
      setActiveDataLength(res.data.totalRows);
    } catch (err) {
      toastAlerts('error', 'There is an error');
    }
  };
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
    const fetchUsers = async () => {
      try {
        const res = await axiosPrivate.get(USERS_API.fetch_all_archive, { params: { page, perPage } });
        const users = res.data.result.map(user => ({ ...user, editMode: false }));
        setState(users);
        setActiveDataLength(res.data.totalRows);
      } catch (err) {
        toastAlerts('error', 'There is an error');
      }
    };

    fetchUsers();
  }, [axiosPrivate, page, perPage]);
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

  const onRestore = async id => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      const res = await axiosPrivate.put(USERS_API.reStore_user(id));
      toastAlerts('success', res.data.message);
    } catch (err) {
      toastAlerts('error', err?.response?.data?.message);
    } finally {
      fetchArchiveUsers();
    }
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
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.clubName}</TableCell>
              <TableCell>
                <ActionButtonGroup
                  appearedReactiveButton
                  onRestore={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Re-store user?',
                      content: 'Are you sure to re-store this user??',
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

export default withSort(Archiveuser, 'id');
