import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead, { tableHeadClasses } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserCard from './UserCard';
import{ useState, useEffect } from 'react';
import ClientsTable from './ClientsTable';
import { TextField } from '@mui/material';

export default function UserList({clients}) {

    const [query, setQuery] = useState('');
    const [filterdata, setFilterdata]= useState(Object.values({clients})[0]);
    const [userdata, setUserdata]= useState(filterdata);

    useEffect(() => {
      setFilterdata(Object.values({clients})[0])
      setUserdata(filterdata)
  
    }, [clients]);

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


      console.log('hola1')
      console.log(clients)

      const handlesearch=(event)=>{
        
        const getSearch= event.target.value; 
        if(getSearch.length > 0)
        {     
        const searchdata= filterdata.filter( (item)=> item.name.toLowerCase().includes(getSearch));
        setUserdata(searchdata);
        } else {
          setUserdata(filterdata);
        }
        setQuery(getSearch);
      }

      console.log('hola2')
      console.log(clients)
      
        return (
          <TableContainer component={Paper} sx={{
            height: '70vh',
            width: '100vh',
            zIndex: 1,
            marginTop: '10vh',
            }}>
            <Table aria-label="customized table">
              <TableHead sx = {{height: 100}}>

                <TableRow>
                <div className= 'searchDiv'>

                <TextField name='name' value={query} onChange={(e)=>handlesearch(e)} placeholder='Search...' 
                
                sx = {{backgroundColor: 'white', marginLeft: 2, borderRadius: 2}}/>

                </div>
                </TableRow>
              </TableHead>
              <TableBody>
              <ClientsTable userdata= {userdata}/>
              </TableBody>
            </Table>
          </TableContainer>
        );
}