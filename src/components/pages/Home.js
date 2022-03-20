import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React, { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { v4 as uuid } from 'uuid';
import { UsersApi } from '../../constants/apiEndPoints';
import { axiosInstance } from '../../services/config';

const mock = new MockAdapter(axiosInstance)

mock.onGet(UsersApi.get).reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

const columns = [
  {
    name: 'Name',
    selector: row => row.first_name + ' ' + row.last_name,
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
];

const customStyles = {
  headCells: {
    style: {
      background: '#cdcdcd',
    },
  },
};



const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);


  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
    console.log(response);
    const modifieddata = response.data.data.map(item => ({ ...item, rowId: uuid(), phone: '01234456789' }))
    setData(modifieddata);
    //console.log(JSON.stringify(modifieddata, null, 2));
    setTotalRows(response.data.total);
    setLoading(false);
  }, [page, perPage]);

  const handlePageChange = page => {
    console.log(page);
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log({
      newPerPage, page
    });
    setLoading(true);

    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

    setTimeout(() => {
      setData(response.data.data);
      setPerPage(newPerPage);
      setLoading(false);
    }, 3000);

  };

  useEffect(() => {
    fetchUsers();

  }, [fetchUsers]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(UsersApi.get)
        console.log(res.data);
      } catch (err) {

      }
    }
    fetchUsers()
  }, [])




  return (
    <div>
      <DataTable
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
    </div>
  )
}

export default Home