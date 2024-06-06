import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const PopularDestinationsTable = ({data}) => {

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



    const exportToExcel = () => {
      const exportData = data.map(content => ({
          "Nombre del destino": content.name,
          "Descripción": content.description
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Destinos populares');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(dataBlob, 'Destinos_populares.xlsx');
    };
   
    return(
      <div style={{ position: 'relative', zIndex:'2 ' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', backgroundColor: '#55B8A1', padding: '16px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="div" style={{ color: 'white', margin: '0 auto' }}>
                    Destinos populares
                </Typography>
                <button onClick={exportToExcel} variant="contained" color="primary" style={{ left: '0', fontSize: '16px', width: 'auto', marginTop: '0px' }}>
                    Exportar a Excel
                </button>
            </div>
      <TableContainer component={Paper} sx={{ width: 'auto', height: '25vh', overflowY: 'auto' }}>
          <Table stickyHeader>
              <TableHead>
                  <TableRow>

                      <StyledTableCell>Nombre del Destino</StyledTableCell>
                      <StyledTableCell>Descripción</StyledTableCell>

                  </TableRow>
              </TableHead>
              <TableBody>
                  {data.map((content) => (
                      <TableRow key={content.code}>
                          
                          <StyledTableCell>{content.name}</StyledTableCell>
                          <StyledTableCell>{content.description}</StyledTableCell>
                          
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
  </div>
    );
}


export default PopularDestinationsTable;