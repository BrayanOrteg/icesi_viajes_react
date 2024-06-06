import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TopTypeDestinationsTable = ({data}) => {

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
          "Nombre del plan": content.name,
          "Nombre del destino": content.destinationName,
          Código: content.code,
          Costo: content.totalCost
         
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Tipos de destino populares');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(dataBlob, 'Tipos_de_destino_populares.xlsx');
    };
   
    return(
      <div style={{ position: 'relative', zIndex:'2 ' }}>
            <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%', backgroundColor: '#55B8A1', padding: '16px', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="div" style={{ color: 'white', margin: '0 auto' }}>
                    Tipos de destino populares
                </Typography>
                <button onClick={exportToExcel} variant="contained" color="primary" style={{ left: '0', fontSize: '16px', width: 'auto', marginTop: '0px' }}>
                    Exportar a Excel
                </button>
            </div>
      <TableContainer component={Paper} sx={{ width: 'auto', height: '50vh', overflowY: 'auto' }}>
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


export default TopTypeDestinationsTable;