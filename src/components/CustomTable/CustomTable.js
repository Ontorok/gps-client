import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  withStyles
} from '@material-ui/core';
import { CustomPagination } from 'components';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#215280',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const StyledTableSortLabel = withStyles(theme => ({
  root: {
    color: 'white',
    '&:hover': {
      color: 'yellow'
    },
    '&$active': {
      color: 'inherit',
      fontWeight: 'bold',
      textDecoration: 'underline',
      fontStyle: 'italic'
    }
  },
  active: {},
  icon: {
    color: 'inherit !important'
  }
}))(TableSortLabel);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
    padding: 10
  }
}));

const CustomTable = props => {
  const { columns, showPagination, children, rowPerPage, onRowPerPageChange, count, onPageChange, sortedColumn, sortedBy, onSort } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer>
        <Table stickyHeader className={classes.table} aria-label="customized table" size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledTableCell key={column.name} style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                  {column.isDisableSorting ? (
                    column.label
                  ) : (
                    <StyledTableSortLabel
                      active={sortedColumn === column.sortName}
                      direction={sortedColumn === column.sortName ? sortedBy : 'asc'}
                      onClick={() => {
                        onSort(column.sortName);
                      }}>
                      {column.label}
                    </StyledTableSortLabel>
                  )}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Grid container style={{ padding: 10 }}>
          <Grid item container justifyContent="flex-start" xs={12} sm={6} md={6} lg={6}>
            <FormControl>
              <Typography>Row per page : {'\u00A0'}</Typography>
            </FormControl>
            <Select value={rowPerPage} onChange={onRowPerPageChange}>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
            </Select>
          </Grid>
          <Grid item container justifyContent="flex-end" xs={12} sm={6} md={6} lg={6}>
            <CustomPagination count={count} onChange={onPageChange} />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  showPagination: PropTypes.bool,
  rowPerPage: PropTypes.number,
  onRowPerPageChange: PropTypes.func,
  count: PropTypes.number,
  onChangePage: PropTypes.func,
  sortedColumn: PropTypes.string,
  sortedBy: PropTypes.string,
  onSort: PropTypes.func
};

CustomTable.defaultProps = {
  showPagination: true,
  rowPerPage: 10,
  // eslint-disable-next-line no-console
  onRowPerPageChange: () => console.error(`Not passed 'onRowPerPageChange()'`),
  count: 0,
  // eslint-disable-next-line no-console
  onChangePage: () => console.error(`Not passed 'onChangePage()'`)
};

export default CustomTable;
