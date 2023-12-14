/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

function CheckAuth (): boolean {
  const [token, setToken] = useState<string | null>('')
  const [jwtSecret, setJwtSecret] = useState<string | undefined>('')
  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      setToken(localStorage.getItem('jwtToken'))
      setJwtSecret(process.env.REACT_APP_JWT_SECRET)
      return jwtSecret
    }
    fetchData()
  }, [])

  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      // const currentTime = Date.now() / 1000

      if (!decodedToken) {
        localStorage.removeItem('jwtToken')
        return false
      } else {
        return true
      }
    } catch (error) {
      localStorage.removeItem('jwtToken')
      return false
    }
  } else {
    return false
  }
}

export default CheckAuth
