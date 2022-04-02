import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/actions/Auth';

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [isPageLoaded, setIsPageLoaded] = useState(true)



  useEffect(() => {
    const token = localStorage.getItem("loggedIn")
    if (token) {
      setIsPageLoaded(false)
      setTimeout(() => {
        dispatch(setAuthUser({ name: 'admin', role: 'admin' }));
        setIsPageLoaded(true)
      }, 1000)
    } else {
      dispatch(setAuthUser(null))
    }

  }, [dispatch])



  if (!isPageLoaded) {
    return <div>logidng....</div>
  }

  return (
    <div>{children}</div>
  )
}

export default AppWrapper