'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Tab } from '@mui/material'
import Navbar from '@/components/navbar'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CountriesDatagrid from '@/components/countries-datagrid'

const SettingsMaintenance = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div>
      <Navbar />
      <div>
        <Box sx={{ width: '100%', typography: 'body1', marginTop: '1rem' }}>
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              display='flex'
              justifyContent='center'
              width='100%'
            >
              <TabList
                onChange={handleChange}
                aria-label='tabs'
                indicatorColor='primary'
                variant='scrollable'
                scrollButtons='auto'
              >
                <Tab label='Programs' value='1' />
                <Tab label='Countries' value='2' />
                <Tab label='Regions' value='3' />
                <Tab label='Districts' value='4' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              {/* <CountriesDatagrid /> */}
            </TabPanel>
            <TabPanel value='2'>
              <CountriesDatagrid />
            </TabPanel>
            <TabPanel value='3'>
              {/* <CountriesDatagrid /> */}
            </TabPanel>
            <TabPanel value='4'>
              {/* <CountriesDatagrid /> */}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}

export default SettingsMaintenance
