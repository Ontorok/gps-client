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
  Tooltip
} from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ActionButtonGroup from "../../components/ActionButtonGroup";
import CustomTable from "../../components/CustomTable";
import { NeededToBeSentApi } from "../../constants/apiEndPoints";
import withSortBy from "../../hoc/withSortedBy";
import { axiosInstance } from "../../services/config";
import { columns } from "./utils";

const NeededToBeSentNonGrooming = ({ sortedColumn, sortedBy, onSort }) => {
  const [state, setstate] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(NeededToBeSentApi.get, {
          params: { page, perPage },
        });
        setstate(res.data.data);
        setTotalRows(res.data.total);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page, perPage]);

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

  const onRowSelectionChange = (e, rowIndex) => {
    const { checked } = e.target;
    const _state = _.cloneDeep(state);
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
    setstate(_state);
  };

  const onCheckedAllChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      const _checkedItems = [...state];
      _checkedItems.forEach((item) => (item.selected = true));
      setCheckedItems(_checkedItems);
    } else {
      const _checkedItems = [...state];
      _checkedItems.forEach((item) => (item.selected = false));
      setCheckedItems([]);
    }
    setCheckedAll(checked);
  };

  const onRangeAction = async () => {
    try {
      const res = await axiosInstance.put(
        NeededToBeSentApi.update_fund_status,
        checkedItems,
        { params: { page, perPage } }
      );
      setstate(res.data.data);
    } catch (err) {}
  };
  // For Filter Area Open and close
  const handleFilterToggle = () => {
    setIsFilter(!isFilter);
  };

  return (
    <div>
      <Paper style={{ marginBottom: 10, padding: "10px 5px" }}>
        <Grid container>
          <Grid item container justifyContent="flex-start" xs={6}>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "capitalize", width: 100, height: 40, padding:0 }}
              onClick={() => {}}
            >
              <NavLink style={{color:'white', textDecoration:'none', cursor:'pointer'}} to={`/new-vehicles`}>Add New</NavLink>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <input
                  type="text"
                  className="search-box"
                  name="status"
                  placeholder="Fund Status"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <input
                  type="text"
                  className="search-box"
                  name="date"
                  placeholder="Date"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <input
                  type="text"
                  className="search-box"
                  name="operator"
                  placeholder="Operator"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <input
                  type="text"
                  className="search-box"
                  name="equipment"
                  placeholder="Equipment"
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                style={{ gap: 10 }}
                justifyContent="flex-end"
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
        data={state}
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
        {state.map((row, index) => (
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
            <TableCell align="left">{row.fundStatus}</TableCell>
            <TableCell align="left">{row.date}</TableCell>
            <TableCell align="left">{row.trail}</TableCell>
            <TableCell align="left">{row.operator}</TableCell>
            <TableCell align="center">{row.laborHours}</TableCell>
            <TableCell align="left">{row.equiment1}</TableCell>
            <TableCell align="left">{row.equiment2}</TableCell>
            <TableCell align="left">{row.equiment3}</TableCell>
            <TableCell align="left">{row.equiment4}</TableCell>
            <TableCell align="center">{row.subTotal}</TableCell>
            <TableCell align="center">{row.total}</TableCell>
            <TableCell align="center">
              <ActionButtonGroup
                appearedDeleteButton
                appearedEditButton
                onEdit={() => console.log(row)}
                onDelete={() => console.log(row)}
              />
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
    </div>
  );
};

export default withSortBy(NeededToBeSentNonGrooming, "id");
