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
import ActionButtonGroup from "../components/ActionButtonGroup";
import CustomDrawer from "../components/CustomDrawer";
import CustomTable from "../components/CustomTable";
import { ClubApi } from "../constants/apiEndPoints";
import withSortBy from "../hoc/withSortedBy";
import ClubForm from "../parts/club/ClubForm";
import { axiosInstance } from "../services/config";

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
];

const Club = ({ sortedColumn, sortedBy, onSort }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchClubs = async () => {
      try {
        const res = await axiosInstance.get(ClubApi.get, {
          params: { page, perPage },
          signal: controller.signal,
        });
        if (isMounted) {
          setData(res.data.data);
          setTotalRows(res.data.total);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchClubs();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
      <Paper style={{ margin: "40px 0 10px 0", padding: "0px 5px 5px 5px" }}>
        <Grid container alignItems="center">
          <Grid item container justifyContent="flex-start" xs={6}>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "capitalize", width: 100, height: 40 }}
              onClick={() => setDrawerOpen(true)}
              size="small"
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
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <input
                  type="text"
                  className="search-box"
                  name="name"
                  placeholder="Name"
                />
              </Grid>

              <Grid
                container
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                style={{ gap: 10 }}
                justifyContent="center"
              >
                <Button variant="contained" color="primary" size="small">
                  Search
                </Button>
                <Button variant="contained" color="secondary" size="small">
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

      <CustomDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        title="Club"
      >
        <ClubForm />
      </CustomDrawer>
    </>
  );
};

export default withSortBy(Club, "id");
