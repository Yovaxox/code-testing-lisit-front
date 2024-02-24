'use client'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Autocomplete } from '@mui/material'
import Copyright from '@/components/copyright'
import { OperationAlert } from '@/components/alert'
import toUpperCamelCase from '@/utils/toUpperCamelCase'
import { useEffect, useState } from 'react'
import {
  CreateUserLogic,
  GetCountriesLogic,
  GetDistrictsLogic,
  GetRegionsLogic,
} from '@/presentation/view-model/Home.logic'
import Loader from '@/components/loader'
import { errorMonitor } from 'events'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [errorEmailAddress, setErrorEmailAddress] = useState(false)
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState(false)

  const [countriesList, setCountriesList] = useState([])
  const [country, setCountry] = useState(null)
  const [countryId, setCountryId] = useState(0)

  const [regionsListAll, setRegionsListAll] = useState([])
  const [regionsList, setRegionsList] = useState([])
  const [region, setRegion] = useState(null)
  const [regionId, setRegionId] = useState(0)

  const [districtsListAll, setDistrictsListAll] = useState([])
  const [districtsList, setDistrictsList] = useState([])
  const [district, setDistrict] = useState(null)
  const [districtId, setDistrictId] = useState(0)

  const [update, setUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onChangeValue = (e: any) => {
    let id = e.target.id
    let value = e.target.value
    const nameValidator = /^(?:[a-z ,.'-]+|\s?)$/i
    const emailAddressValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordValidator = /^(?=.*\d).{8,}$/
    switch (id) {
      case 'firstName':
        if (value.length <= 50 && nameValidator.test(value)) {
          setFirstName(value)
        }
        break
      case 'lastName':
        if (value.length <= 50 && nameValidator.test(value)) {
          setLastName(value)
        }
        break
      case 'emailAddress':
        if (value.length <= 100) {
          setEmailAddress(value)
          setErrorEmailAddress(!emailAddressValidator.test(value))
        }
        break
      case 'password':
        if (value.length <= 100) {
          setPassword(value)
          setErrorPassword(!passwordValidator.test(value))
        }
        break
    }
  }

  useEffect(() => {
    setIsLoading(true)
    GetCountriesLogic(GetCountriesCallBack)
    GetRegionsLogic(GetRegionsCallBack)
    GetDistrictsLogic(GetDistrictsCallBack)
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
        setRegionsListAll(newData)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const GetDistrictsCallBack = (error: Boolean, err: string, data: any) => {
    let newData = data
    setIsLoading(false)
    try {
      if (error === false && data.length > 0) {
        setDistrictsListAll(newData)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const handleSelectCountry = (e: any, newValue: any) => {
    if (newValue !== null) {
      const countryId = newValue.id
      // Clean the region and district
      setRegionId(0)
      setRegion(null)
      setDistrictId(0)
      setDistrict(null)
      setDistrictsList([])

      // Set the country id and the country in Autocomplete component
      setCountryId(countryId)
      setCountry(newValue)

      // Filter the regions based on the selected country
      const filteredRegions = regionsListAll.filter(
        (e: any) => e.countryId == countryId
      )
      setRegionsList(filteredRegions)
    }
  }

  const handleSelectRegion = (e: any, newValue: any) => {
    if (newValue !== null) {
      const regionId = newValue.id
      // Clean the district
      setDistrictId(0)
      setDistrict(null)

      // Set the region id and the region in Autocomplete component
      setRegionId(regionId)
      setRegion(newValue)

      // Filter the districts based on the selected region
      const filteredDistricts = districtsListAll.filter(
        (e: any) => e.regionId == regionId
      )
      setDistrictsList(filteredDistricts)
    }
  }

  const handleSelectDistrict = (e: any, newValue: any) => {
    if (newValue !== null) {
      setDistrictId(newValue.id)
      setDistrict(newValue)
    }
  }

  const keyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const signUpUser = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()
    let userData = {
      firstName,
      lastName,
      countryId,
      regionId,
      districtId,
      emailAddress,
      password,
    }
    CreateUserLogic(CreateUserCallBack, userData)
  }

  const CreateUserCallBack = async (error: Boolean, err: any, data: any) => {
    try {
      setIsLoading(false)
      if (!error) {
        setUpdate(!update)
        const btnClicked = await OperationAlert(true)
        if (btnClicked) {
          window.location.href = '/'
        }
      } else {
        const result = data.response.data
        OperationAlert(false, result.message)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' textAlign={'center'}>
          Sign up to apply for the Social Program
        </Typography>
        <Box component='form' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onKeyDown={(e) => {
                  keyDownHandler(e)
                }}
                value={firstName}
                type='text'
                required
                id='firstName'
                label='First Name'
                name='firstName'
                fullWidth
                onChange={(e) => {
                  onChangeValue(e)
                }}
                inputProps={{
                  autoComplete: 'off',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onKeyDown={(e) => {
                  keyDownHandler(e)
                }}
                value={lastName}
                type='text'
                required
                id='lastName'
                label='Last Name'
                name='lastName'
                fullWidth
                onChange={(e) => {
                  onChangeValue(e)
                }}
                inputProps={{
                  autoComplete: 'off',
                }}
              />
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                options={regionsList}
                getOptionLabel={(option: any) =>
                  toUpperCamelCase(option.regionName)
                }
                noOptionsText={'There is no option available.'}
                id='cbxRegion'
                value={region}
                onChange={handleSelectRegion}
                disableClearable
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Region'
                    required
                    id='region'
                    name='region'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                options={districtsList}
                getOptionLabel={(option: any) => option.districtName}
                noOptionsText={'There is no option available.'}
                id='cbxDistrict'
                value={district}
                onChange={handleSelectDistrict}
                disableClearable
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='District'
                    required
                    id='district'
                    name='district'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onKeyDown={(e) => {
                  keyDownHandler(e)
                }}
                value={emailAddress}
                type='text'
                required
                id='emailAddress'
                label='Email Address'
                name='emailAddress'
                fullWidth
                error={errorEmailAddress}
                helperText={errorEmailAddress && 'Invalid email address.'}
                onChange={(e) => {
                  onChangeValue(e)
                }}
                inputProps={{
                  autoComplete: 'off',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onKeyDown={(e) => {
                  keyDownHandler(e)
                }}
                value={password}
                type='password'
                required
                id='password'
                label='Password'
                name='password'
                fullWidth
                error={errorPassword}
                helperText={
                  errorPassword &&
                  'Invalid password, minimum 8 characters and at least one number.'
                }
                onChange={(e) => {
                  onChangeValue(e)
                }}
                inputProps={{
                  autoComplete: 'off',
                }}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={(e: any) => {
              signUpUser(e)
            }}
            disabled={
              firstName === '' ||
              lastName === '' ||
              emailAddress === '' ||
              password === '' ||
              countryId === 0 ||
              regionId === 0 ||
              districtId === 0 ||
              errorEmailAddress ||
              errorPassword
            }
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
      <Loader open={isLoading} />
    </Container>
  )
}
