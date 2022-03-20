import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const data = [
  { name: 'abc', email: 'abc@mailcom', phone: '012345678910' },
  { name: 'def', email: 'def@mailcom', phone: '012345678910' },
  { name: 'geh', email: 'geh@mailcom', phone: '012345678910' },
  { name: 'ikg', email: 'ikg@mailcom', phone: '012345678910' },
  { name: 'lmn', email: 'lmn@mailcom', phone: '012345678910' },
  { name: 'opq', email: 'opq@mailcom', phone: '012345678910' },
  { name: 'rst', email: 'rst@mailcom', phone: '012345678910' },
  { name: 'uvw', email: 'uvw@mailcom', phone: '012345678910' },
  { name: 'xyz', email: 'xyz@mailcom', phone: '012345678910' },
  { name: 'abc', email: 'abc@mailcom', phone: '012345678910' },
  { name: 'def', email: 'def@mailcom', phone: '012345678910' },
  { name: 'geh', email: 'geh@mailcom', phone: '012345678910' },
  { name: 'ikg', email: 'ikg@mailcom', phone: '012345678910' },
  { name: 'lmn', email: 'lmn@mailcom', phone: '012345678910' },
  { name: 'opq', email: 'opq@mailcom', phone: '012345678910' },
  { name: 'rst', email: 'rst@mailcom', phone: '012345678910' },
  { name: 'uvw', email: 'uvw@mailcom', phone: '012345678910' },
  { name: 'xyz', email: 'xyz@mailcom', phone: '012345678910' },
  { name: 'abc', email: 'abc@mailcom', phone: '012345678910' },
  { name: 'def', email: 'def@mailcom', phone: '012345678910' },
  { name: 'geh', email: 'geh@mailcom', phone: '012345678910' },
  { name: 'ikg', email: 'ikg@mailcom', phone: '012345678910' },
  { name: 'lmn', email: 'lmn@mailcom', phone: '012345678910' },
  { name: 'opq', email: 'opq@mailcom', phone: '012345678910' },
  { name: 'rst', email: 'rst@mailcom', phone: '012345678910' },
  { name: 'uvw', email: 'uvw@mailcom', phone: '012345678910' },
  { name: 'xyz', email: 'xyz@mailcom', phone: '012345678910' },
]



const Home = () => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index + 1}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Home