import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Paper,
  PaperProps,
  TextField,
  Grid,
  Container,
  Fade,
  Autocomplete,
} from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import Draggable from 'react-draggable'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import Datagrid from '@/components/datagrid'
import { DeleteConfirm, OperationAlert } from '@/components/alert'
import Loader from '@/components/loader'
import {
  GetCountriesLogic,
  GetRegionsLogic,
} from '@/presentation/view-model/Home.logic'
import {
  CreateRegionLogic,
  DeleteRegionLogic,
  UpdateRegionLogic,
} from '@/presentation/view-model/SettingsMaintenance.logic'

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

const RegionsDatagrid = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dialogText, setDialogText] = useState('')
  const [optionAPI, setOptionAPI] = useState(0)
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const height = 620

  const [list, setList] = useState([])
  const [regionId, setRegionId] = useState(0)
  const [regionName, setRegionName] = useState('')
  const [regionNameExists, setRegionNameExists] = useState(false)

  const [countriesList, setCountriesList] = useState([])
  const [country, setCountry] = useState(null)
  const [countryId, setCountryId] = useState(0)

  const columnList: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'countryName',
      headerName: 'Country Name',
      width: 200,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'regionName',
      headerName: 'Region Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'Update',
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <ModeEditIcon
            style={{ cursor: 'pointer' }}
            color='info'
            onClick={(event) => {
              handleClick(event, cellValues)
            }}
          />
        )
      },
      disableColumnMenu: true,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      disableExport: true,
    },
    {
      field: 'Delete',
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <DeleteIcon
            style={{ cursor: 'pointer' }}
            color='error'
            onClick={(event) => {
              handleClick(event, cellValues)
            }}
          />
        )
      },
      disableColumnMenu: true,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      disableExport: true,
    },
  ]

  const handleClick = (event: any, cellValues: any) => {
    let data = cellValues.row
    let accion = cellValues.field

    switch (accion) {
      case 'Update':
        const dataCountry: any = {id: data.countryId, countryName: data.countryName}      

        handleClickOpen('Update')
        setRegionName(data.regionName)
        setRegionId(data.id)
        setCountry(dataCountry)
        setCountryId(data.countryId)
        break
      case 'Delete':
        // Create Delete component alert
        DeleteConfirm('Region ' + data.regionName + ' will be deleted.').then(
          (confirm: any) => {
            if (confirm) {
              DeleteRegionLogic(DeleteRegionCallBack, parseInt(data.id))
            }
          }
        )
        break
    }
  }

  const DeleteRegionCallBack = async (error: Boolean, err: any, data: any) => {
    try {
      setIsLoading(false)
      if (!error) {
        setUpdate(!update)
        await OperationAlert(true)
      } else {
        const result = data.response.data
        OperationAlert(false, result.message)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const handleClickOpen = (action: string) => {
    switch (action) {
      case 'Create':
        setDialogText('Create')
        setOptionAPI(1)
        clear()
        break
      case 'Update':
        setDialogText('Update')
        setOptionAPI(2)
        break
    }
    setOpen(true)
  }

  const clear = () => {
    setRegionName('')
    setRegionId(0)
    setCountry(null)
    setCountryId(0)
  }

  const handleCellClick = (param: any, event: any) => {
    event.stopPropagation()
  }

  const handleRowClick = (param: any, event: any) => {
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onChangeValue = (e: any) => {
    let id = e.target.id
    let value = e.target.value
    switch (id) {
      case 'regionName':
        if (value.length <= 50) {
          setRegionName(value)
        }
        break
    }
  }

  // Option 1 = Create, Option 2 = Update
  const sendData = () => {
    let data = {}
    if (optionAPI == 1) {
      data = {
        regionName,
        countryId,
      }
    } else {
      data = {
        id: regionId,
        regionName,
        countryId,
      }
    }
    handleClose()
    CreateOrUpdate(optionAPI, data)
  }

  // Option 1 = Create, Option 2 = Update
  const CreateOrUpdate = (option: number, data: any) => {
    setIsLoading(true)
    if (option === 1) {
      CreateRegionLogic(CreateRegionCallBack, data)
    } else {
      UpdateRegionLogic(UpdateRegionCallBack, data)
    }
  }

  const CreateRegionCallBack = async (error: Boolean, err: any, data: any) => {
    try {
      setIsLoading(false)
      if (!error) {
        setUpdate(!update)
        await OperationAlert(true)
      } else {
        const result = data.response.data
        OperationAlert(false, result.message)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const UpdateRegionCallBack = async (error: Boolean, err: any, data: any) => {
    try {
      setIsLoading(false)
      if (!error) {
        setUpdate(!update)
        await OperationAlert(true)
      } else {
        const result = data.response.data
        OperationAlert(false, result.message)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    GetCountriesLogic(GetCountriesCallBack)
    GetRegionsLogic(GetRegionsCallBack)
  }, [update])

  const GetCountriesCallBack = (error: Boolean, err: string, data: any) => {
    let newData = data
    setIsLoading(false)
    try {
      if (error === false && data.length > 0) {
        setCountriesList(newData)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const GetRegionsCallBack = (error: Boolean, err: string, data: any) => {
    let newData = data
    setIsLoading(false)
    try {
      if (error === false && data.length > 0) {
        setList(newData)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const handleSelectCountry = (e: any, newValue: any) => {
    if (newValue !== null) {
      const countryId = newValue.id
      // Set the country id and the country in Autocomplete component
      setCountryId(countryId)
      setCountry(newValue)
    }
  }

  return (
    <div>
      <Loader open={isLoading} />
      <Fade in={true} unmountOnExit timeout={300}>
        <Container maxWidth={false}>
          <Grid container spacing={0}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3} container direction='row' justifyContent='end'>
              <Button
                variant='contained'
                endIcon={<AddIcon />}
                onClick={() => handleClickOpen('Create')}
                sx={{ marginBottom: '1rem' }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Fade>

      <Fade in={true} unmountOnExit timeout={300}>
        <div>
          <Datagrid
            height={height}
            rows={list}
            columns={columnList}
            rowAutoHeight={false}
            handleCellClick={handleCellClick}
            handleRowClick={handleRowClick}
          />
        </div>
      </Fade>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
        fullWidth
      >
        <DialogTitle
          style={{ cursor: 'move' }}
          id='draggable-dialog-title'
          className='headerDialog'
        >
          {dialogText} Region
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            options={countriesList}
            getOptionLabel={(option: any) => option.countryName}
            noOptionsText={'There is no option available.'}
            id='cbxCountry'
            value={country}
            onChange={handleSelectCountry}
            disableClearable
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label='Country'
                required
                id='country'
                name='country'
              />
            )}
          />

          <TextField
            error={regionNameExists}
            helperText={regionNameExists ? 'Region already exists' : ''}
            value={regionName}
            margin='normal'
            type='text'
            required
            fullWidth
            id='regionName'
            label='Region Name'
            name='regionName'
            onChange={(e) => {
              onChangeValue(e)
            }}
            inputProps={{
              autoComplete: 'off',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              sendData()
            }}
            disabled={regionName.length <= 0 || countryId <= 0}
            variant='contained'
            color='success'
          >
            Confirm
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            variant='contained'
            color='error'
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RegionsDatagrid
