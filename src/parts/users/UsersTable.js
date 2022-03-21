import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { UsersApi } from "../../constants/apiEndPoints";
import { axiosInstance } from "../../services/config";
import UserExpandableRow from "./UserExpandableRow";

const customStyles = {
  headCells: {
    style: {
      background: "#cdcdcd",
    },
  },
};

const UsersTable = () => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) =>
        row.editMode ? (
          <input
            type="text"
            value={row.name}
            onChange={(e) => handleChangeName(e, row.id)}
          />
        ) : (
          row.name
        ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Action",
      selector: (row) =>
        row.editMode ? (
          <div>
            <button onClick={() => handleUpdateRow(row)}>Update</button>
            <button onClick={() => toggleEditMode(row.id)}>Cancel</button>
          </div>
        ) : (
          <div>
            <button onClick={() => toggleEditMode(row.id)}> Edit</button>
          </div>
        ),
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(UsersApi.get, {
          params: { page, perPage },
        });
        setData(res.data.data);
        setTotalRows(res.data.total);
        setLoading(false);
      } catch (err) {}
    };
    fetchUsers();
  }, [page, perPage]);

  function toggleEditMode(id) {
    const updatedState = data.map((item) => {
      if (item.id === id) {
        item["editMode"] = !item.editMode;
      }
      return item;
    });
    setData(updatedState);
  }

  const contextActions = useMemo(() => {
    const handleDelete = async () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.name
          )}?`
        )
      ) {
        try {
          const res = await axiosInstance.delete(UsersApi.delete_range, {
            params: { selectedRows },
          });
          setData(res.data.data);
          setTotalRows(res.data.total);
          setToggleCleared(!toggleCleared);
        } catch (err) {
          console.log(err);
        }
      }
    };

    return (
      <button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
      >
        Delete
      </button>
    );
  }, [selectedRows, toggleCleared]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
  };

  const handleChangeName = (e, id) => {
    const updatedState = data.map((item) => {
      if (item.id === id) {
        item["name"] = e.target.value;
      }
      return item;
    });
    setData(updatedState);
  };

  const handleUpdateRow = (row) => {
    const updatedState = data.map((item) => {
      if (item.id === row.id) {
        item["editMode"] = false;
      }
      return item;
    });
    setData(updatedState);
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <DataTable
      title="User List"
      columns={columns}
      data={data}
      progressPending={loading}
      expandableRows
      expandableRowsComponent={(inlineData) => (
        <UserExpandableRow data={inlineData} />
      )}
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      contextActions={contextActions}
      pagination
      paginationServer
      customStyles={customStyles}
    />
  );
};

export default UsersTable;
