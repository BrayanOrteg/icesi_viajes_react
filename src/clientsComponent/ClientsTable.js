import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Clients.css';


export default function CustomizedTables(clients) {
  
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
if (Array.isArray(clients)) {
  console.log("SIIIIIIIIIIIIIIIIIIII")
}else{
  console.log("NOOOOOOOOOOOOOOOOOOOO")
  console.log(Object.values(clients))
}
  return (
    <TableContainer className='clients-table-container'  component={Paper}>
      <Table className='clients-table'  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Sex</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
        
        
        Object.values(clients)[0].map((client) => (
            <StyledTableRow key={client.id}>
              <StyledTableCell align="right">{client.name}</StyledTableCell>
              <StyledTableCell align="right">{client.sex}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}