/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

type JWT = {
  email: string
  iat: number
  userType: UserTypeJWT
}

enum UserTypeJWT {
  USER_COMPANY = 'USER_COMPANY',
  USER_STUDENT = 'USER_STUDENT',
  USER_ADMIN = 'USER_ADMIN'
}

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
      const decodedToken: JWT = jwtDecode(token)
      // const currentTime = Date.now() / 1000

      console.log(decodedToken.userType)

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

export function CheckAdmin (): boolean {
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
      const decodedToken: JWT = jwtDecode(token)
      // const currentTime = Date.now() / 1000
      console.log(decodedToken.userType)

      if (decodedToken.userType === UserTypeJWT.USER_ADMIN) {
        return true
      } else {
        return false
      }
    } catch (error) {
      localStorage.removeItem('jwtToken')
      return false
    }
  } else {
    return false
  }
}
