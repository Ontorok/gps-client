import {
  styled,
  TableCell,
  tableCellClasses,
  TableSortLabel,
} from "@mui/material";

export const StyledTableHeadCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#663399",
    color: "#fff",
  },
}));

export const StyledTableSortedHeadCell = styled(TableSortLabel)(() => ({
  [`&.MuiTableSortLabel-root`]: {
    color: "#fff !important",
  },
  [`&.Mui-active`]: {
    textDecoration: "underline",
  },
  [`& .MuiTableSortLabel-icon`]: {
    fill: "#fff !important",
  },
}));
