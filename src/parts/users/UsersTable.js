import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { UsersApi } from '../../constants/apiEndPoints';
import { axiosInstance } from '../../services/config';
import UserExpandableRow from './UserExpandableRow';

const customStyles = {
  headCells: {
    style: {
      background: '#cdcdcd',
    },
  },
};

const UsersTable = () => {
  const columns = [
    {
      name: 'Name',
      selector: row => (
        row.editMode ? <input type="text" value={row.name} onChange={(e) => handleChangeName(e, row.id)} /> : row.name
      ),
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: 'Action',
      selector: row => (
        row.editMode ?
          (<div>
            <button onClick={() => handleUpdateRow(row)}>Update</button>
          </div>
          ) :
          (<div>
            <button onClick={() => enableEditMode(row.id)} > Edit</button >
          </div >
          )

      ),
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(UsersApi.get, { params: { page, perPage } })
        setData(res.data.data);
        setTotalRows(res.data.total);
        setLoading(false);
      } catch (err) {

      }
    }
    fetchUsers()
  }, [page, perPage])


  const handlePageChange = page => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page)
  };

  function enableEditMode(id) {
    const updatedState = data.map(item => {
      if (item.id === id) {
        item["editMode"] = true
      }
      return item
    })
    setData(updatedState)
  }

  function handleChangeName(e, id) {
    const updatedState = data.map(item => {
      if (item.id === id) {
        item["name"] = e.target.value
      }
      return item
    })
    setData(updatedState)
  }

  function handleUpdateRow(row) {
    const updatedState = data.map(item => {
      if (item.id === row.id) {
        item["editMode"] = false
      }
      return item
    })
    setData(updatedState)
  }



  return (
    <DataTable
      expandableRows
      expandableRowsComponent={inlineData => <UserExpandableRow data={inlineData} />}
      title="User List"
      data={data}
      columns={columns}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      customStyles={customStyles} />
  )
}

export default UsersTable