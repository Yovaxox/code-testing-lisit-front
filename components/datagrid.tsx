'use client'
import * as React from 'react'
import Container from '@mui/material/Container'
import { DataGrid, GridToolbar, enUS } from '@mui/x-data-grid'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function Datagrid(props: any) {
  const theme = createTheme(
    {
      palette: {
        primary: { main: '#000' },
      },
    },
    enUS
  )

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <div style={{ height: props.height, width: '100%' }}>
          {props.rowAutoHeight ? (
            <DataGrid
              rows={props.rows}
              columns={props.columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              onCellClick={props.handleCellClick}
              onRowClick={props.handleRowClick}
              getRowHeight={() => 'auto'}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  csvOptions: { utf8WithBom: true }, // UTF8 for special characters
                },
              }}
            />
          ) : (
            <DataGrid
              rows={props.rows}
              columns={props.columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              onCellClick={props.handleCellClick}
              onRowClick={props.handleRowClick}
              rowHeight={50}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  csvOptions: { utf8WithBom: true }, // UTF8 for special characters
                },
              }}
            />
          )}
        </div>
      </Container>
    </ThemeProvider>
  )
}
export default Datagrid
