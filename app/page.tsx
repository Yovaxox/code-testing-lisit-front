'use client'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '@/components/copyright'
import { OperationAlert } from '@/components/alert'
import { useState } from 'react'
import Loader from '@/components/loader'
import { SignInUserLogic } from '@/presentation/view-model/Home.logic'

export default function SignIn() {
  const [emailAddress, setEmailAddress] = useState('')
  const [errorEmailAddress, setErrorEmailAddress] = useState(false)
  const [password, setPassword] = useState('')

  const [update, setUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const keyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const onChangeValue = (e: any) => {
    let id = e.target.id
    let value = e.target.value
    const emailAddressValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    switch (id) {
      case 'emailAddress':
        if (value.length <= 100) {
          setEmailAddress(value)
          setErrorEmailAddress(!emailAddressValidator.test(value))
        }
        break
      case 'password':
        if (value.length <= 100) {
          setPassword(value)
        }
        break
    }
  }

  const signInUser = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()
    let userData = {
      emailAddress,
      password,
    }
    SignInUserLogic(SignInCallBack, userData)
  }

  const SignInCallBack = async (error: Boolean, err: any, data: any) => {
    try {
      setIsLoading(false)
      if (!error) {
        setUpdate(!update)
        const userData = data.result.data
        localStorage.setItem('userData', JSON.stringify(userData.data))
        localStorage.setItem('token', userData.token)
        window.location.href = '/program-assignment'
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
          Welcome to Social Program from The Last Bug SPA
        </Typography>

        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            onKeyDown={(e) => {
              keyDownHandler(e)
            }}
            margin='normal'
            autoFocus
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
          <TextField
            onKeyDown={(e) => {
              keyDownHandler(e)
            }}
            margin='normal'
            value={password}
            type='password'
            required
            id='password'
            label='Password'
            name='password'
            fullWidth
            onChange={(e) => {
              onChangeValue(e)
            }}
            inputProps={{
              autoComplete: 'off',
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value='remember' color='primary' />} //TODO: Implement remember me
            label='Remember me'
          /> */}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={(e: any) => {
              signInUser(e)
            }}
            disabled={errorEmailAddress || password.length === 0}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href='#' variant='body2'> // TODO: Implement forgot password
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Loader open={isLoading} />
    </Container>
  )
}
