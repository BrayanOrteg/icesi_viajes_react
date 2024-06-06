import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from 'react';
import ClientService from '../service/ClientService';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

    const exportToExcel = () => {
      const exportData = data.map(content => ({
          Vendedor: content.name,
          Nombre: content.name,
          Código: content.code,
          Costo: content.totalCost,
          Cliente: clientInfo[content.client]?.name || 'Cargando...'
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Planes Vendidos');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(dataBlob, 'planes_vendidos.xlsx');
    };
    console.log(clientInfo)
    return(
      <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', backgroundColor: '#55B8A1', padding: '16px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="div" style={{ color: 'white', margin: '0 auto' }}>
                    Planes vendidos
                </Typography>
                <button onClick={exportToExcel} variant="contained" color="primary" style={{ left: '0', fontSize: '16px', width: 'auto', marginTop: '0px' }}>
                    Exportar a Excel
                </button>
            </div>
      <TableContainer component={Paper} sx={{ width: 'auto', height: '50vh', overflowY: 'auto' }}>
          <Table stickyHeader>
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
                  {data.map((content) => (
                      <TableRow key={content.code}>
                          <StyledTableCell>{content.name}</StyledTableCell>
                          <StyledTableCell>{content.name}</StyledTableCell>
                          <StyledTableCell>{content.code}</StyledTableCell>
                          <StyledTableCell>{content.totalCost}</StyledTableCell>
                          <StyledTableCell>{clientInfo[content.client]?.name || 'Cargando...'}</StyledTableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
  </div>
    );
}


export default EmployeeTable;