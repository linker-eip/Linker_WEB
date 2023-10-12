import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthApi, { type AuthResponse } from '../API/AuthApi'

function AuthVerifyPwd (): JSX.Element {
  const { code } = useParams()
  const [authData, setAuthData] = useState<AuthResponse>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await AuthApi.verifyStudentPassword(code !== undefined ? code : '')
        setAuthData(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Verification Page</h1>
      <h3>{authData?.status === 201 ? 'Le Compte a été vérifier avec succès' : 'Code Invalide'}</h3>
    </div>
  )
}

export default AuthVerifyPwd
