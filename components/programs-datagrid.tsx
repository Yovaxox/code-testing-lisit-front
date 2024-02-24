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
import { DeleteConfirm, OperationAlert, OperationAlertProgram } from '@/components/alert'
import Loader from '@/components/loader'
import { GetProgramsLogic } from '@/presentation/view-model/SettingsMaintenance.logic'
import {
  CreateProgramLogic,
  DeleteProgramLogic,
  UpdateProgramLogic,
} from '@/presentation/view-model/SettingsMaintenance.logic'
import {
  GetCountriesLogic,
  GetDistrictsLogic,
  GetRegionsLogic,
} from '@/presentation/view-model/Home.logic'
import toUpperCamelCase from '@/utils/toUpperCamelCase'
import ProgramsForm from './programs-form'

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

const CountriesDatagrid = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dialogText, setDialogText] = useState('')
  const [optionAPI, setOptionAPI] = useState(0)
  const [optionType, setOptionType] = useState('')
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const height = 620

  const [countryId, setCountryId] = useState(0)
  const [country, setCountry] = useState(null)
  const [regionId, setRegionId] = useState(0)
  const [region, setRegion] = useState(null)
  const [districtId, setDistrictId] = useState(0)
  const [district, setDistrict] = useState(null)

  const [list, setList] = useState([])
  const [programId, setProgramId] = useState(0)
  const [programName, setProgramName] = useState('')
  const [programNameExists, setProgramNameExists] = useState(false)

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
      field: 'districtName',
      headerName: 'District Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'programName',
      headerName: 'Program Name',
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
        const dataCountry: any = {
          id: data.countryId,
          countryName: data.countryName,
        }
        const dataRegion: any = {
          id: data.regionId,
          regionName: data.regionName,
        }
        const dataDistrict: any = {
          id: data.districtId,
          districtName: data.districtName,
        }

        handleClickOpen('Update', 'District')

        setCountry(dataCountry)
        setCountryId(data.countryId)

        setRegion(dataRegion)
        setRegionId(data.regionId)

        setDistrict(dataDistrict)
        setDistrictId(data.districtId)

        setProgramName(data.programName)
        setProgramId(data.id)
        break
      case 'Delete':
        DeleteConfirm('Program ' + data.programName + ' will be deleted.').then(
          (confirm: any) => {
            if (confirm) {
              DeleteProgramLogic(DeleteProgramCallBack, parseInt(data.id))
            }
          }
        )
        break
    }
  }

  const DeleteProgramCallBack = async (error: Boolean, err: any, data: any) => {
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

  const handleClickOpen = (action: string, type: string) => {
    switch (action) {
      case 'Create':
        setDialogText(`${action} ${type}`)
        setOptionAPI(1)
        setOptionType(type)
        clear()
        break
      case 'Update':
        setDialogText(`${action} ${type}`)
        setOptionAPI(2)
        setOptionType(type)
        break
    }
    setOpen(true)
  }

  const clear = () => {
    setCountry(null)
    setCountryId(0)

    setRegion(null) 
    setRegionId(0)

    setDistrict(null)
    setDistrictId(0)
    
    setProgramName('')
    setProgramId(0)
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
      case 'programName':
        if (value.length <= 50) {
          setProgramName(value)
        }
        break
    }
  }

  // Option 1 = Create, Option 2 = Update
  const sendData = () => {
    let data = {}
    switch (optionType) {
      case 'Country':
        if (optionAPI == 1) {
          data = {
            countryId,
            programName,
          }
        } else {
          data = {
            id: programId,
            countryId,
            programName,
          }
        }
        break
      case 'Region':
        if (optionAPI == 1) {
          data = {
            regionId,
            programName,
          }
        } else {
          data = {
            id: programId,
            regionId,
            programName,
          }
        }
        break
      case 'District':
        if (optionAPI == 1) {
          data = {
            districtId,
            programName,
          }
        } else {
          data = {
            id: programId,
            districtId,
            programName,
          }
          break
        }
    }
    handleClose()
    CreateOrUpdate(optionAPI, data)
  }

  // Option 1 = Create, Option 2 = Update
  const CreateOrUpdate = (option: number, data: any) => {
    setIsLoading(true)
    if (option === 1) {
      CreateProgramLogic(CreateProgramCallBack, data, optionType)
    } else {
      UpdateProgramLogic(UpdateProgramCallBack, data)
    }
  }

  const CreateProgramCallBack = async (error: Boolean, err: any, data: any) => {
    try {
      setIsLoading(false)
      if (!error) {
        setUpdate(!update)
        const alertType = data.result.data.data.alertType
        const message = data.result.data.data.message
        await OperationAlertProgram(true, message,alertType)
      } else {
        const result = data.response.data
        OperationAlert(false, result.message)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const UpdateProgramCallBack = async (error: Boolean, err: any, data: any) => {
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
    GetProgramsLogic(GetProgramsCallBack)
  }, [update])

  const GetProgramsCallBack = (error: Boolean, err: string, data: any) => {
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

  const callBackCountry = (countryId: number) => {
    setCountryId(countryId)
  }

  const callBackRegion = (regionId: number) => {
    setRegionId(regionId)
  }

  const callBackDistrict = (districtId: number) => {
    setDistrictId(districtId)
  }

  return (
    <div>
      <Loader open={isLoading} />

      <Fade in={true} unmountOnExit timeout={300}>
        <Container maxWidth={false}>
          <Grid container spacing={0}>
            <Grid item xs={3}></Grid>
            <Grid item xs={9} container direction='row' justifyContent='end'>
              <Button
                variant='contained'
                endIcon={<AddIcon />}
                onClick={() => handleClickOpen('Create', 'Country')}
                sx={{ marginBottom: '1rem' }}
              >
                Create Country Program
              </Button>
              <Button
                variant='contained'
                endIcon={<AddIcon />}
                onClick={() => handleClickOpen('Create', 'Region')}
                sx={{ marginBottom: '1rem', marginLeft: '1rem' }}
              >
                Create Region Program
              </Button>
              <Button
                variant='contained'
                endIcon={<AddIcon />}
                onClick={() => handleClickOpen('Create', 'District')}
                sx={{ marginBottom: '1rem', marginLeft: '1rem' }}
              >
                Create District Program
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
          {dialogText} Program
        </DialogTitle>
        <DialogContent>

          <ProgramsForm
            type={optionType}
            callBackCountry={callBackCountry}
            callBackRegion={callBackRegion}
            callBackDistrict={callBackDistrict}
            country={country}
            region={region}
            district={district}
            countryId={countryId}
            regionId={regionId}
            districtId={districtId}
          />

          <TextField
            error={programNameExists}
            helperText={programNameExists ? 'Program already exists' : ''}
            value={programName}
            margin='normal'
            type='text'
            required
            fullWidth
            id='programName'
            label='Program Name'
            name='programName'
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
            disabled={programName.length <= 0}
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

export default CountriesDatagrid
