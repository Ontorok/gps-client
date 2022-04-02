import { FilterList } from "@mui/icons-material";
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  Toolbar,
  Tooltip,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionButtonGroup from "../../components/ActionButtonGroup";
import CustomDrawer from "../../components/CustomDrawer";
import CustomTable from "../../components/CustomTable";
import { UsersApi } from "../../constants/apiEndPoints";
import withSortBy from "../../hoc/withSortedBy";
import { axiosInstance } from "../../services/config";
import UserForm from "./UserForm";

const UsersTable = ({ sortedColumn, sortedBy, onSort }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const columns = [
    {
      name: "id",
      sortName: "id",
      label: "ID",
      align: "left",
      minWidth: 80,
      isDisableSorting: false,
    },
    {
      name: "name",
      sortName: "name",
      label: "Name",
      align: "left",
      minWidth: 80,
      isDisableSorting: false,
    },
    {
      name: "email",
      sortName: "email",
      label: "Email",
      align: "left",
      minWidth: 80,
      isDisableSorting: false,
    },
    {
      name: "phone",
      sortName: "phone",
      label: "Phone",
      align: "left",
      minWidth: 80,
      isDisableSorting: false,
    },
  ];
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const { authUser } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(UsersApi.get, {
          params: { page, perPage },
        });
        setData(res.data.data);
        setTotalRows(res.data.total);
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

  // For Filter Area Open and close
  const handleFilterToggle = () => {
    setIsFilter(!isFilter);
  };

  const onPageChange = (event, pageNumber) => {
    setPage(pageNumber);
    setCheckedAll(false);
    setCheckedItems([]);
  };

  const onPerPageChange = (e) => {
    setPerPage(e.target.value);
    setPage(1);
    setCheckedAll(false);
    setCheckedItems([]);
  };
  const onCheckedAllChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      const _checkedItems = [...data];
      _checkedItems.forEach((item) => (item.selected = true));
      setCheckedItems(_checkedItems);
    } else {
      const _checkedItems = [...data];
      _checkedItems.forEach((item) => (item.selected = false));
      setCheckedItems([]);
    }
    setCheckedAll(checked);
  };

  const onRowSelectionChange = (e, rowIndex) => {
    const { checked } = e.target;
    const _state = _.cloneDeep(data);
    let _checkedItems = [...checkedItems];
    const targetedObj = _state[rowIndex];
    targetedObj.selected = checked;
    if (checked) {
      _checkedItems.push(targetedObj);
    } else {
      _checkedItems = checkedItems.filter((item) => item.id !== targetedObj.id);
    }
    _state[rowIndex] = targetedObj;
    setCheckedAll(_state.every((item) => item.selected));
    setCheckedItems(_checkedItems);
    setData(_state);
  };

  const onRangeAction = () => {};

  const onInputChange = (e, id) => {
    const { name, value } = e.target;
    const _data = [...data];
    _data.map((u) => {
      if (u.id === id) {
        u[name] = value;
      }
      return u;
    });
    setData(_data);
  };
  return (
    <>
      <Paper style={{ marginBottom: 10, padding: "10px 5px" }}>
        <Grid container>
          <Grid item container justifyContent="flex-start" xs={6}>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "capitalize", width: 100, height: 40 }}
              onClick={() => setDrawerOpen(true)}
            >
              Add New
            </Button>
          </Grid>
          <Grid item container justifyContent="flex-end" xs={6}>
            <Toolbar className="toolbar">
              <Tooltip title="Filter Area" placement="left">
                <IconButton onClick={handleFilterToggle}>
                  <FilterList className="filter-list" />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Grid>
        </Grid>
        <Collapse in={isFilter}>
          <div className="filterArea">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <input
                  type="text"
                  className="search-box"
                  name="name"
                  placeholder="Name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <input
                  type="text"
                  className="search-box"
                  name="email"
                  placeholder="Email"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <input
                  type="text"
                  className="search-box"
                  name="phone"
                  placeholder="Phone"
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                style={{ gap: 10 }}
                justifyContent="center"
              >
                <Button variant="contained" color="primary">
                  Search
                </Button>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </Collapse>
      </Paper>
      <CustomTable
        data={data}
        columns={columns}
        count={Math.ceil(totalRows / perPage)}
        onPageChange={onPageChange}
        perPage={perPage}
        onPerPageChange={onPerPageChange}
        sortedColumn={sortedColumn}
        sortedBy={sortedBy}
        onSort={onSort}
        checkedItems={checkedItems}
        checkedAll={checkedAll}
        onCheckedAllChange={onCheckedAllChange}
        onRangeAction={onRangeAction}
      >
        {data.map((row, index) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>
              <input
                type="checkbox"
                checked={row.selected}
                onChange={(e) => onRowSelectionChange(e, index)}
              />
            </TableCell>
            <TableCell align="left">{row.id}</TableCell>

            <TableCell align="left">
              {row.editMode ? (
                <input
                  name="name"
                  value={row.name}
                  onChange={(e) => onInputChange(e, row.id)}
                />
              ) : (
                row.name
              )}
            </TableCell>
            <TableCell align="left">
              {row.editMode && authUser.name === "admin" ? (
                <input
                  name="email"
                  value={row.email}
                  onChange={(e) => onInputChange(e, row.id)}
                />
              ) : (
                row.email
              )}
            </TableCell>
            <TableCell align="left">
              {row.editMode && authUser.name === "admin" ? (
                <input
                  name="phone"
                  value={row.phone}
                  onChange={(e) => onInputChange(e, row.id)}
                />
              ) : (
                row.phone
              )}
            </TableCell>
            <TableCell align="center">
              {row.editMode ? (
                <>
                  <button type="button" onClick={() => toggleEditMode(row.id)}>
                    Update
                  </button>
                  <button type="button" onClick={() => toggleEditMode(row.id)}>
                    Cancel
                  </button>
                </>
              ) : (
                <ActionButtonGroup
                  appearedDeleteButton
                  appearedEditButton
                  onEdit={() => toggleEditMode(row.id)}
                  onDelete={() => console.log(row)}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
      {/* <DataTable
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
      /> */}
      <CustomDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        title="User"
      >
        <UserForm />
      </CustomDrawer>
    </>
  );
};

export default withSortBy(UsersTable, "id");
