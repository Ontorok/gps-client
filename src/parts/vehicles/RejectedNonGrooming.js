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
import React, { useState } from "react";
import ActionButtonGroup from "../../components/ActionButtonGroup";
import CustomTable from "../../components/CustomTable";
import withSortBy from "../../hoc/withSortedBy";
import { columns, data } from "./utils";

const RejectedNonGrooming = ({ sortedColumn, sortedBy, onSort }) => {
  const [state, setstate] = useState(data);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

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

  // For Filter Area Open and close
  const handleFilterToggle = () => {
    setIsFilter(!isFilter);
  };

  console.log(checkedItems);
  return (
    <div>
      <Paper style={{ marginBottom: 10, padding: "10px 5px" }}>
        <Grid container>
          <Grid item container justifyContent="flex-end" xs={12}>
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
                  name="trail"
                  placeholder="Trail"
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
        sortedColumn={sortedColumn}
        sortedBy={sortedBy}
        onSort={onSort}
        checkedItems={checkedItems}
        checkedAll={checkedAll}
        onCheckedAllChange={onCheckedAllChange}
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
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
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
                appearedViewButton
                appearedDeleteButton
                appearedEditButton
                onView={() => console.log(row)}
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

export default withSortBy(RejectedNonGrooming, "id");
