import React, { useState, type ChangeEvent } from 'react'
import HotbarCompany from './Partials/HotbarCompany'
import '../CSS/LoginPage.scss'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'
import TextField from '@mui/material/TextField'
import axios from 'axios'

function CompanyResetPassword (): JSX.Element {
  const [token, setToken] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setPassword(event.target.value)
  }

  const handleTokenChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setToken(event.target.value)
  }

  const fromValidate = (): any => {
    const credentials = {
      token,
      password
    }

    axios.post('https://api.linker-app.fr/api/auth/company/reset-password', credentials)
      .then((response) => {
        console.log(response)
        const jwtToken = response.data.token
        localStorage.setItem(jwtToken, jwtToken)
        if (response.status >= 200 && response.status < 204) {
          navigate(ROUTES.COMPANY_LOGIN_PAGE)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
      <div className='login-page-container'>
        <HotbarCompany/>
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
              id="standard-required"
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

export default CompanyResetPassword
