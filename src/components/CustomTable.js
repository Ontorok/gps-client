import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import classes from "../styles/CustomTable.module.css";
import CustomPagination from "./CustomPagination";
import {
  StyledTableHeadCell,
  StyledTableSortedHeadCell,
} from "./StyledTableHeadCell";

const CustomTable = ({
  children,
  data,
  columns,
  sortedColumn,
  sortedBy,
  onSort,
  checkedItems,
  checkedAll,
  onCheckedAllChange,
  count,
  onPageChange,
  perPage,
  onPerPageChange,
  onRangeAction,
}) => {
  return (
    <>
      <Paper>
        {checkedItems.length > 0 && (
          <div className={classes.contextContainer}>
            <span style={{ marginLeft: "10px" }}>
              {checkedItems.length} row(s) selected
            </span>
            <button style={{ marginRight: "10px" }} onClick={onRangeAction}>
              action
            </button>
          </div>
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>
                  <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={onCheckedAllChange}
                  />
                </StyledTableHeadCell>
                {columns.map((column) => {
                  const {
                    name,
                    label,
                    align,
                    sortName,
                    minWidth,
                    isDisableSorting,
                  } = column;

                  return (
                    <StyledTableHeadCell
                      key={name}
                      align={align}
                      style={{ minWidth: minWidth }}
                    >
                      {isDisableSorting ? (
                        label
                      ) : (
                        <StyledTableSortedHeadCell
                          active={sortedColumn === sortName}
                          direction={
                            sortedColumn === sortName ? sortedBy : "asc"
                          }
                          onClick={() => {
                            onSort(sortName);
                          }}
                        >
                          {label}
                        </StyledTableSortedHeadCell>
                      )}
                    </StyledTableHeadCell>
                  );
                })}
                <StyledTableHeadCell align="center">Action</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          justifyContent="space-between"
          className={classes.paginationContainer}
        >
          <Grid item container xs={6} justifyContent="flex-start">
            <label>Row per page:</label>
            <select
              style={{ padding: 0 }}
              value={perPage}
              onChange={onPerPageChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </Grid>
          <Grid item container xs={6} justifyContent="flex-end">
            <CustomPagination count={count} onChange={onPageChange} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CustomTable;
