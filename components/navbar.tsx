'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import { useEffect, useState } from 'react'
import { CheckSecurityLogic } from '@/presentation/view-model/Security.logic'
import Loader from './loader'

const settings = ['Sign out']

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [userData, setUserData] = useState({
    id: 0,
    firstName: '',
    lastName: '',
  })
  const [pages, setPages] = useState([{}])
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    const token = localStorage.getItem('token')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
    setIsLoading(true)
    CheckSecurityLogic(CheckSecurityCallBack, token)
  }, [])

  const CheckSecurityCallBack = async (error: Boolean, err: any, data: any) => {
    setIsLoading(false)
    try {
      if (!error) {
        const userRole = data.result.data.data.userRole
        if (userRole === 'Admin') {
          setPages([
            { name: 'Program Assignment', url: '/program-assignment' },
            { name: 'User activity', url: '/user-activity' },
            { name: 'Settings & Maintenance', url: '/settings-maintenance' },
          ])
        } else {
          setPages([{ name: 'My Programs', url: '/program-assignment' }])
        }
      } else {
        window.location.href = '/'
      }
    } catch (er) {
      window.location.href = '/'
    }
  }

  const signOut = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <AppBar position='static'>
      <Loader open={isLoading} />
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <VolunteerActivismIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/program-assignment'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            THE LAST BUG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              key={'navMenu'}
            >
              {pages.map((page: any, index) => (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  divider
                  component={'a'}
                  href={page.url}
                  key={index}
                >
                  <Typography textAlign='center'>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <VolunteerActivismIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/program-assignment'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            THE LAST BUG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} key={'nav'}>
            {pages.map((page: any, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  margin: '0 5px',
                }}
                variant='contained'
                href={page.url}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Typography marginRight={'15px'}>
            Welcome, {`${userData.firstName} ${userData.lastName}`}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src='/broken-image.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={signOut}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
