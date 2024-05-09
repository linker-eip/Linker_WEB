import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'
import CheckAuth from './CheckAuth'
import { useEffect, useState } from 'react'
import AuthApi from '../API/AuthApi'

function isPrivateRoute (): void {
  const [isVerified, setIsVerified] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      const response = await AuthApi.VerifyStudentAccount(localStorage.getItem('jwtToken') as string)
      if (response !== undefined) {
        setIsVerified(response)
      }
    }
    fetchData()
  }, [])

  const navigate = useNavigate()
  if (!CheckAuth() && !isVerified) {
    navigate(ROUTES.LANDING_PAGE)
  }
}

export default isPrivateRoute
