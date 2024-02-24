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
  Typography,
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
  GetAssignedProgramsLogic,
  GetMyAssignedProgramsLogic,
  GetUsersLogic,
} from '@/presentation/view-model/AssignedProgram.logic'
import {
  CreateAssignedProgramLogic,
  DeleteAssignedProgramLogic,
  UpdateAssignedProgramLogic,
} from '@/presentation/view-model/AssignedProgram.logic'
import toUpperCamelCase from '@/utils/toUpperCamelCase'
import { serialize } from 'v8'
import { GetPrograms } from '@/application/interactors/SettingsMaintenance'
import { GetProgramsLogic } from '@/presentation/view-model/SettingsMaintenance.logic'
import { parse } from 'path'

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

const AssignedProgramsDatagrid = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dialogText, setDialogText] = useState('')
  const [optionAPI, setOptionAPI] = useState(0)
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const height = 620

  const [list, setList] = useState([])

  const [usersList, setUsersList] = useState([])
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(0)

  const [programsListAll, setProgramsListAll] = useState([])
  const [programsList, setProgramsList] = useState([])
  const [program, setProgram] = useState(null)
  const [programId, setProgramId] = useState(0)

  const [assignerId, setAssignerId] = useState(0)

  const [year, setYear] = useState('')

  const [assignedProgramId, setAssignedProgramId] = useState(0)

  const [userTypeId, setUserTypeId] = useState(0)

  const columnList: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'userName',
      headerName: 'User Name',
      width: 200,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'programName',
      headerName: 'Program Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'assignerName',
      headerName: 'Assigner Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'year',
      headerName: 'Assigned Year',
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

  const columnListUser: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'userName',
      headerName: 'User Name',
      width: 200,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'programName',
      headerName: 'Program Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'assignerName',
      headerName: 'Assigner Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'year',
      headerName: 'Assigned Year',
      width: 200,
      flex: 1,
    }
  ]

  const handleClick = (event: any, cellValues: any) => {
    let data = cellValues.row
    let accion = cellValues.field

    switch (accion) {
      case 'Update':
        const dataUser: any = {
          id: data.userId,
          firstName: data.userName,
          lastName: '',
        }

        const dataProgram: any = {
          id: data.programId,
          programName: data.programName,
        }

        handleClickOpen('Update')

        setAssignedProgramId(data.id)

        setUser(dataUser)
        setUserId(data.userId)

        setProgram(dataProgram)
        setProgramId(data.programId)

        // Assigner Id is not being used in the form, because it's already implemented from localstorage

        setYear(data.year)

        const filteredPrograms = programsListAll.filter(
          (e: any) => e.districtId == data.districtId
        )
        setProgramsList(filteredPrograms)
        break
      case 'Delete':
        DeleteConfirm(
          'The program assigned for ' + data.userName + ' will be deleted.'
        ).then((confirm: any) => {
          if (confirm) {
            DeleteAssignedProgramLogic(
              DeleteAssignedProgramCallBack,
              parseInt(data.id)
            )
          }
        })
        break
    }
  }

  const DeleteAssignedProgramCallBack = async (
    error: Boolean,
    err: any,
    data: any
  ) => {
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
    setUser(null)
    setUserId(0)

    setProgram(null)
    setProgramId(0)

    setAssignedProgramId(0)

    setYear('')

    setProgramsList([])
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
      case 'year':
        // Year should be less than 2100 (just to avoid mistakes)
        if (
          (parseInt(value) >= 0 && parseInt(value) <= 2_100) ||
          value === ''
        ) {
          setYear(value)
        }
        break
    }
  }

  // Option 1 = Create, Option 2 = Update
  const sendData = () => {
    let data = {}
    if (optionAPI == 1) {
      data = {
        userId,
        programId,
        assignerId,
        year: year === '' ? 0 : parseInt(year),
      }
    } else {
      data = {
        id: assignedProgramId,
        programId,
        assignerId,
        year: year === '' ? 0 : parseInt(year),
      }
    }
    handleClose()
    CreateOrUpdate(optionAPI, data)
  }

  // Option 1 = Create, Option 2 = Update
  const CreateOrUpdate = (option: number, data: any) => {
    setIsLoading(true)
    if (option === 1) {
      CreateAssignedProgramLogic(CreateAssignedProgramCallBack, data)
    } else {
      UpdateAssignedProgramLogic(UpdateAssignedProgramCallBack, data)
    }
  }

  const CreateAssignedProgramCallBack = async (
    error: Boolean,
    err: any,
    data: any
  ) => {
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

  const UpdateAssignedProgramCallBack = async (
    error: Boolean,
    err: any,
    data: any
  ) => {
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
    const storedData = localStorage.getItem('userData')
    let parsedData: any = { id: 0 }
    if (storedData) {
      parsedData = JSON.parse(storedData)
      setAssignerId(parsedData.id)
      setUserTypeId(parseInt(parsedData.userTypeId))
    }
    if (parsedData.userTypeId === 1) {
      GetAssignedProgramsLogic(GetAssignedProgramsCallBack)
    } else {
      GetMyAssignedProgramsLogic(GetMyAssignedProgramsCallBack, parseInt(parsedData.userTypeId))
    }
    GetUsersLogic(GetUsersCallBack)
    GetProgramsLogic(GetProgramsCallBack)
  }, [update])

  const GetAssignedProgramsCallBack = (
    error: Boolean,
    err: string,
    data: any
  ) => {
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

  const GetMyAssignedProgramsCallBack = (
    error: Boolean,
    err: string,
    data: any
  ) => {
    let newData = data.result
    setIsLoading(false)
    try {
      if (error === false && data.result.length > 0) {
        setList(newData)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const GetUsersCallBack = (error: Boolean, err: string, data: any) => {
    let newData = data
    setIsLoading(false)
    try {
      if (error === false && data.length > 0) {
        setUsersList(newData)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const GetProgramsCallBack = (error: Boolean, err: string, data: any) => {
    let newData = data
    setIsLoading(false)
    try {
      if (error === false && data.length > 0) {
        setProgramsListAll(newData)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const handleSelectUser = (e: any, newValue: any) => {
    if (newValue !== null) {
      const userId = newValue.id
      const userDistrictId = newValue.districtId

      // Clear the program and programId
      setProgramId(0)
      setProgram(null)

      setUserId(userId)
      setUser(newValue)

      const filteredPrograms = programsListAll.filter(
        (e: any) => e.districtId == userDistrictId
      )
      setProgramsList(filteredPrograms)
    }
  }

  const handleSelectProgram = (e: any, newValue: any) => {
    if (newValue !== null) {
      const programId = newValue.id
      setProgramId(programId)
      setProgram(newValue)
    }
  }

  return (
    <div>
      <Loader open={isLoading} />

      {userTypeId === 2 ? <Typography variant='h2' textAlign={'center'} sx={{ marginTop: '1rem' }}>My assigned programs</Typography> :
      <Fade in={true} unmountOnExit timeout={300}>
        <Container maxWidth={false}>
          <Grid container spacing={0}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3} container direction='row' justifyContent='end'>
              <Button
                variant='contained'
                endIcon={<AddIcon />}
                onClick={() => handleClickOpen('Create')}
                sx={{ marginBottom: '1rem', marginTop: '1rem' }}
              >
                Assign Program
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Fade>
      }
      <Fade in={true} unmountOnExit timeout={300}>
        <div style={userTypeId === 2 ? { marginTop: '1rem' } : {}}>
          <Datagrid
            height={height}
            rows={list}
            columns={userTypeId === 1 ? columnList : columnListUser}
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
          {dialogText} Assigned Program
        </DialogTitle>
        <DialogContent>
          <Typography>Please assign a Program to a user:</Typography>
          <Autocomplete
            sx={{ marginTop: '16px' }}
            options={usersList}
            getOptionLabel={(option: any) =>
              `${option.firstName} ${option.lastName}`
            }
            noOptionsText={'There is no option available.'}
            id='cbxUser'
            value={user}
            onChange={handleSelectUser}
            disableClearable
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label='User'
                required
                id='user'
                name='user'
              />
            )}
          />

          <Autocomplete
            sx={{ marginTop: '16px' }}
            options={programsList}
            getOptionLabel={(option: any) =>
              toUpperCamelCase(option.programName)
            }
            noOptionsText={'There is no option available.'}
            id='cbxProgram'
            value={program}
            onChange={handleSelectProgram}
            disableClearable
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label='Program'
                required
                id='program'
                name='program'
              />
            )}
          />

          <TextField
            value={year}
            margin='normal'
            type='year'
            required
            fullWidth
            id='year'
            label='Year of Assignment'
            name='year'
            onChange={(e) => {
              onChangeValue(e)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              sendData()
            }}
            disabled={
              userId <= 0 || programId <= 0 || assignerId <= 0 || year === ''
            }
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

export default AssignedProgramsDatagrid
