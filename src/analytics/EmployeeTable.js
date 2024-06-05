import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from 'react';
import ClientService from '../service/ClientService';

const EmployeeTable = ({data}) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#46ad95',
          color: theme.palette.common.white,
          fontSize: 16,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));


      
      const [clientInfo, setClientInfo] = useState({});
      useEffect(() => {
        const fetchClients = async () => {
            const clientData = {};
            try {
                const clientPromises = data.map(content => 
                    ClientService.getClient(content.client).then(client => {
                        clientData[content.client] = client;
                    }).catch(error => {
                        console.error(`Error fetching client info for client ID ${content.client}:`, error);
                    })
                );
                await Promise.all(clientPromises);
                setClientInfo(clientData);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
    
        if (data.length > 0) {
            fetchClients();
        }
    }, [data]);


    console.log(clientInfo)
    return(
        <TableContainer component={Paper} sx={{width: 'auto', height: '40vh'}}>
        <Typography variant="h6" component="div" style={{ padding: '16px', backgroundColor: '#55B8A1', textAlign: 'center', color: 'white'}}>
          Planes vendidos
        </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Vendedor</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Código</StyledTableCell>
                <StyledTableCell>Costo</StyledTableCell>
                <StyledTableCell>Cliente</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((content)=>(
                <TableRow >
                <StyledTableCell>{content.name}</StyledTableCell>
                <StyledTableCell>{content.name}</StyledTableCell>
                <StyledTableCell>{content.code}</StyledTableCell>
                <StyledTableCell>{content.totalCost}</StyledTableCell>
                <StyledTableCell>{clientInfo[content.client]?.name}</StyledTableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}


export default EmployeeTable