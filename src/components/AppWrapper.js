/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const AppWrapper = ({ children }) => {
  const {
    getAuthUser,
    loading
  } = useAuth()


  useEffect(() => {
    getAuthUser()
  }, [])

  if (loading) {
    return <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress />
    </div>
  }

  return (
    <div>{children}</div>
  )
}

export default AppWrapper