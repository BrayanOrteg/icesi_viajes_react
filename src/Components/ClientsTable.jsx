import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import UserCard from './UserCard';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#46ad95',
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


const mapComp=({userdata})=>{

    return(
    <>
        { 
        userdata.map((client) => (
            <StyledTableRow key={client.id}>
            <StyledTableCell>
                <UserCard client={client}></UserCard>
            </StyledTableCell>
            </StyledTableRow>
        ))}
    </>
    )

}

export default mapComp