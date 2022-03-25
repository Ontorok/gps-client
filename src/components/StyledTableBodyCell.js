import { styled, TableCell, tableCellClasses } from "@mui/material";

export const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
