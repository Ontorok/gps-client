import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CustomBackdrop, CustomDatePicker } from 'components';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { uniqueId } from 'lodash';
import React, { Fragment, useState } from 'react';
import { ENTRIES_API } from 'services/apiEndPoints';
import { toastAlerts } from 'utils/alert';
import { formattedDate, serverDate } from 'utils/dateHelper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  datePicker: {
    marginBottom: 15,
    width: '90%',
    padding: '10px 0 !important'
  },
  searchBtn: {
    padding: '10px 15px !important',
    textTransform: 'none'
  },
  saveBtn: {
    marginTop: 15
  }
});

const StyledTableHeadCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    minWidth: 150
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export default function DenseTable() {
  const classes = useStyles();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const onDateChange = date => {
    setDate(date);
    setData([]);
  };

  const onSearchGpsData = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get(ENTRIES_API.fetch_knack, { params: { date: serverDate(date) } });
      const gpsData = res.data.data.map(entry => ({
        ...entry,
        key: uniqueId()
      }));
      if (gpsData.length > 0) {
        setData(gpsData);
      } else {
        toastAlerts('info', res.data.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSaveGpsData = async () => {
    const hasData = data.length > 0;
    if (hasData) {
      setLoading(true);
      try {
        const res = await axiosPrivate.post(ENTRIES_API.create, data);
        toastAlerts('success', res.data.message);
        setDate(null);
        setData([]);
      } catch (error) {
        toastAlerts('warning', error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      toastAlerts('info', 'No record to save');
    }
  };

  return (
    <Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CustomDatePicker className={classes.datePicker} label="Date" value={date} clearable={false} disableFuture onChange={onDateChange} />
        <Button variant="contained" color="primary" disableRipple className={classes.searchBtn} onClick={onSearchGpsData}>
          Search
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Groomer</StyledTableHeadCell>
              <StyledTableHeadCell align="right">Funding Status</StyledTableHeadCell>
              <StyledTableHeadCell align="right">Date</StyledTableHeadCell>
              <StyledTableHeadCell align="right">County</StyledTableHeadCell>
              <StyledTableHeadCell align="right">Trail</StyledTableHeadCell>
              <StyledTableHeadCell align="right">Eligble Time</StyledTableHeadCell>
              <StyledTableHeadCell align="right">Rate</StyledTableHeadCell>
              <StyledTableHeadCell align="right">Total</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.key}>
                <TableCell>{row.deviceId}</TableCell>
                <TableCell>{row.groomerName}</TableCell>
                <TableCell align="right">{row.fundingStatus}</TableCell>
                <TableCell align="right">{formattedDate(row.date, 'DD-MMM-yyyy')}</TableCell>
                <TableCell align="right">{row.countyName}</TableCell>
                <TableCell align="right">{row.trailName}</TableCell>
                <TableCell align="right">{row.eligibleTimeInHour}</TableCell>
                <TableCell align="right">{row.rate}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" disableRipple className={classes.saveBtn} onClick={onSaveGpsData}>
          Save
        </Button>
      </Box>
      <CustomBackdrop open={loading} />
    </Fragment>
  );
}
