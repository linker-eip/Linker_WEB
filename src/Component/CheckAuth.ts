/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'

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

export default function CheckAuth (): boolean {
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

export function CheckLogin (): boolean {
  const [token, setToken] = useState<string | null>('')
  const [jwtSecret, setJwtSecret] = useState<string | undefined>('')
  const navigate = useNavigate()

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
      switch (decodedToken.userType) {
        case UserTypeJWT.USER_STUDENT:
          navigate(ROUTES.STUDENT_DASHBOARD)
          break
        case UserTypeJWT.USER_COMPANY:
          navigate(ROUTES.COMPANY_DASHBOARD)
          break
        case UserTypeJWT.USER_ADMIN:
          navigate(ROUTES.ADMIN_DASHBOARD)
          break
        default:
          break
      }
    } catch (error) {
      localStorage.removeItem('jwtToken')
      return false
    }
  } else {
    return false
  }
  return true
}
