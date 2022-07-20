import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
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

const StyledTableFooterCell = withStyles(theme => ({
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
  },
  contextContainer: {
    width: 'inherit',
    height: 60,
    background: 'rgba(102, 51, 153, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

const CustomTable = props => {
  const {
    children,
    columns,
    sortedColumn,
    sortedBy,
    onSort,
    checkedItems,
    onCheckedAllChange,
    checkedAll,
    onRangeAction,
    rowPerPage,
    onRowPerPageChange,
    onPageChange,
    rangeActionButtonText,
    count,
    appearedMarkAllCheck,
    totalHours,
    totalofTotal
  } = props;
  const classes = useStyles();

  return (
    <Fragment>
      {checkedItems.length > 0 && (
        <div className={classes.contextContainer}>
          <span style={{ marginLeft: '10px' }}>{checkedItems.length} row(s) selected</span>
          <Button color="primary" size="small" variant="contained" style={{ marginRight: '10px' }} onClick={onRangeAction}>
            {rangeActionButtonText}
          </Button>
        </div>
      )}
      <div className="test">
        <TableContainer>
          <Table stickyHeader className={classes.table} aria-label="customized table" size="small">
            <TableHead>
              <TableRow>
                {appearedMarkAllCheck && (
                  <StyledTableCell>
                    <input type="checkbox" checked={checkedAll} onChange={onCheckedAllChange} />
                  </StyledTableCell>
                )}

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
            <TableFooter>
              <TableRow>
                <TableCell
                  align="right"
                  colSpan={appearedMarkAllCheck ? 7 : 6}
                  style={{ background: '#BDCBD8', color: '#000', fontSize: '16px !important' }}>
                  <span style={{ fontSize: 20 }}>Total</span>
                </TableCell>
                <TableCell style={{ background: '#BDCBD8', color: '#000', fontSize: '16px !important' }}>
                  <span style={{ fontSize: 20 }}>{totalHours}</span>
                </TableCell>
                <TableCell style={{ background: '#BDCBD8', color: '#000', fontSize: '16px !important' }}>
                  <span style={{ fontSize: 20 }}>{totalofTotal}</span>
                </TableCell>
                <TableCell style={{ background: '#BDCBD8', color: '#000', fontSize: '16px !important' }}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Grid container style={{ padding: 10 }}>
          <Grid item container justifyContent="flex-start" xs={12} sm={6} md={6} lg={6}>
            <FormControl>
              <Typography>Row per page : {'\u00A0'}</Typography>
            </FormControl>
            <Select value={rowPerPage} onChange={onRowPerPageChange}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </Grid>
          <Grid item container justifyContent="flex-end" xs={12} sm={6} md={6} lg={6}>
            <CustomPagination count={count} onChange={onPageChange} />
          </Grid>
        </Grid>
      </div>
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
  onSort: PropTypes.func,
  checkedItems: PropTypes.array,
  appearedMarkAllCheck: PropTypes.bool,
  totalHours: PropTypes.number,
  totalofTotal: PropTypes.number
};

CustomTable.defaultProps = {
  showPagination: true,
  rowPerPage: 10,
  // eslint-disable-next-line no-console
  onRowPerPageChange: () => console.error(`Not passed 'onRowPerPageChange()'`),
  count: 0,
  // eslint-disable-next-line no-console
  onChangePage: () => console.error(`Not passed 'onChangePage()'`),
  checkedItems: [],
  appearedMarkAllCheck: true,
  totalHours: 0,
  totalofTotal: 0
};

export default CustomTable;
