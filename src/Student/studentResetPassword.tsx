import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField'

import HotbarStudent from './Partials/HotbarStudent'
import * as ROUTES from '../Router/routes'
import '../CSS/LoginPage.scss'

function StudentResetPassword (): JSX.Element {
  const [token, setToken] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setToken(event.target.value)
  }

  const fromValidate = (): void => {
    const apiUrl = process.env.REACT_APP_API_URL ?? ''

    axios.post(`${apiUrl}/api/auth/student/reset-password`, { token, password })
      .then((response) => {
        localStorage.setItem('jwtToken', response.data.token)
        if (response.status >= 200 && response.status < 204) {
          navigate(ROUTES.STUDENT_LOGIN_PAGE)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='login-page-container'>
      <HotbarStudent />
      <div className='login-page-container__info'>
        <div className='login-page-container__title'>
          <p className='login-page-container__title--login'> Mot de passe oublié ?</p>
        </div>
        <div className='login-page-container__form'>
          <TextField
            required
            value={token}
            onChange={handleTokenChange}
            variant='standard'
            id="standard-required"
            label='Token'
          />
          <TextField
            required
            value={password}
            onChange={handlePasswordChange}
            variant='standard'
            id="password-input"
            label='Entrez votre nouveau mot de passe'
          />
          <div className='login-page-container__validate-button'>
            <button onClick={fromValidate} className='login-page-container__form-button'>Réinitialiser</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentResetPassword
