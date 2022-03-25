import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
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
}) => {
  return (
    <>
      {checkedItems.length > 0 && (
        <div
          style={{
            width: "inherit",
            height: "60px",
            background: "rgba(102, 51, 153, .2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ marginLeft: "10px" }}>
            {checkedItems.length} row(s) selected
          </span>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => console.log(checkedItems)}
          >
            action
          </button>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                        direction={sortedColumn === sortName ? sortedBy : "asc"}
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
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
