'use client'
import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Berkshire_Swash } from 'next/font/google'
import toUpperCamelCase from '@/utils/toUpperCamelCase'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import {
  GetCountriesLogic,
  GetRegionsLogic,
  GetDistrictsLogic,
} from '@/presentation/view-model/Home.logic'
import { OperationAlert } from './alert'

function ProgramsForm(props: any) {
  const [countriesList, setCountriesList] = useState([])
  const [country, setCountry] = useState(props.country)
  const [countryId, setCountryId] = useState(props.countryId)

  const [regionsListAll, setRegionsListAll] = useState([])
  const [regionsList, setRegionsList] = useState([])
  const [region, setRegion] = useState(props.region)
  const [regionId, setRegionId] = useState(props.regionId)

  const [districtsListAll, setDistrictsListAll] = useState([])
  const [districtsList, setDistrictsList] = useState([])
  const [district, setDistrict] = useState(props.district)
  const [districtId, setDistrictId] = useState(props.districtId)

  const handleSelectCountry = (e: any, newValue: any) => {
    if (newValue !== null) {
      const countryId = newValue.id
      // Clean the region and district
      setRegionsList([])
      setRegionId(0)
      setRegion(null)
      setDistrictsList([])
      setDistrictId(0)
      setDistrict(null)

      // Set the country id and the country in Autocomplete component
      setCountryId(countryId)
      setCountry(newValue)
      props.callBackCountry(countryId)

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
      setDistrictsList([])
      setDistrictId(0)
      setDistrict(null)

      // Set the region id and the region in Autocomplete component
      setRegionId(regionId)
      setRegion(newValue)
      props.callBackRegion(regionId)

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
      props.callBackDistrict(newValue.id)
    }
  }

  React.useEffect(() => {
    GetCountriesLogic(GetCountriesCallBack)
    GetRegionsLogic(GetRegionsCallBack)
    GetDistrictsLogic(GetDistrictsCallBack)
  }, [])

  const GetCountriesCallBack = (error: Boolean, err: string, data: any) => {
    let newData = data
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
    try {
      if (error === false && data.length > 0) {
        setRegionsListAll(newData)
        const filteredRegions = newData.filter(
          (e: any) => e.countryId == countryId
        )
        setRegionsList(filteredRegions)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }

  const GetDistrictsCallBack = (error: Boolean, err: string, data: any) => {
    let newData = data
    try {
      if (error === false && data.length > 0) {
        setDistrictsListAll(newData)
        const filteredDistricts = newData.filter(
          (e: any) => e.regionId == regionId
        )
        setDistrictsList(filteredDistricts)
      }
    } catch (er) {
      OperationAlert(false)
    }
  }
  switch (props.type) {
    case 'Country':
      return (
        <>
          <Typography>Add a new program in all the country.</Typography>

          <Autocomplete
            sx={{ marginTop: '16px' }}
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
        </>
      )
      break
    case 'Region':
      return (
        <>
          <Typography>Add a new program in all the region.</Typography>

          <Autocomplete
            sx={{ marginTop: '16px' }}
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

          <Autocomplete
            sx={{ marginTop: '16px' }}
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
        </>
      )
      break
    case 'District':
      return (
        <>
          <Typography>
            Add or update a new program in all the district.
          </Typography>

          <Autocomplete
            sx={{ marginTop: '16px' }}
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

          <Autocomplete
            sx={{ marginTop: '16px' }}
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

          <Autocomplete
            sx={{ marginTop: '16px' }}
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
        </>
      )
      break
  }
}

export default ProgramsForm
