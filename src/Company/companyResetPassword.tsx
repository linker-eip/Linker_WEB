import React, { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField'

// Components and Styles.
import HotbarCompany from './Partials/HotbarCompany'
import * as ROUTES from '../Router/routes'
import '../CSS/LoginPage.scss'

function CompanyResetPassword (): JSX.Element {
  const [token, setToken] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleTokenChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setToken(event.target.value)
  }

  const handlePasswordReset = (): void => {
    const credentials = {
      token,
      password
    }

    axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/company/reset-password`, credentials)
      .then((response) => {
        if (response.status >= 200 && response.status < 204) {
          const jwtToken = response.data.token
          localStorage.setItem('jwtToken', jwtToken)
          navigate(ROUTES.COMPANY_LOGIN_PAGE)
        } else {
          // TODO: Gérer possiblement les autres codes de réponse HTTP.
        }
      })
      .catch((error) => {
        console.error('Error during password reset:', error)
        // TODO: Notifier l'utilisateur de l'erreur de réinitialisation.
      })
  }

  return (
    <div className='login-page-container'>
      <HotbarCompany />
      <div className='login-page-container__info'>
        <div className='login-page-container__title'>
          <p className='login-page-container__title--login'>Mot de passe oublié ?</p>
        </div>
        <div className='login-page-container__form'>
          <TextField
            required
            value={token}
            onChange={handleTokenChange}
            variant='standard'
            id="token-input"
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
            <button onClick={handlePasswordReset} className='login-page-container__form-button'>Réinitialiser</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyResetPassword
