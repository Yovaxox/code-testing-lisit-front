'use client'
import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loader(props: any) {
  return (
    <div>
      <Backdrop
        transitionDuration={0}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}
