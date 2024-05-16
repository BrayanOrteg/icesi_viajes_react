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
import { Button, TextField } from '@mui/material';
import { Grid } from '@mui/joy';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function UserList({clients}) {

    const [query, setQuery] = useState('');
    const [filterdata, setFilterdata]= useState(Object.values({clients})[0]);
    const [userdata, setUserdata]= useState(filterdata);
    const navigate = useNavigate();


    useEffect(() => {
      setFilterdata(Object.values({clients})[0])
      setUserdata(filterdata)
  
    }, [clients]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#46ad95',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

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
      
        return (
          <>
          <Stack>
          <TableContainer component={Paper} sx={{
            zIndex: 1,
            width: '100vh'
            }}>
            <Table aria-label="customized table">
            <TableHead sx={{height: '15vh'}}>
              <TableRow>
                <StyledTableCell>
                  <Grid container wrap="nowrap" alignItems="center">
                    <Grid item xs={12}>
                    <TextField name='name' value={query} onChange={(e)=>handlesearch(e)} placeholder='Search...' 
                
                sx = {{backgroundColor: 'white', marginLeft: 2, borderRadius: 2}}/>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => navigate('/client/registration')} sx={{
                        width:'fit-content', 
                        height:'fit-content',
                        borderRadius:10,
                        '&:hover': {
                            color: "white",
                            backgroundColor:'#46ad95'
                          }
                        }}>
                        <AddCircleIcon sx={{color:'white'} }/>
                      </Button> 
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} sx={{
            height: '60vh',
            width: '100vh',
            zIndex: 1,
            }}>
            <Table aria-label="customized table">
              <TableBody>
              <ClientsTable userdata= {userdata}/>
              </TableBody>
            </Table>
          </TableContainer>
          </Stack>
          </>
        );
}