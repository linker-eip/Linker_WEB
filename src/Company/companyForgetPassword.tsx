import React, { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

// Components and Styles.
import HotbarCompany from './Partials/HotbarCompany'
import '../CSS/LoginPage.scss'
import TextField from '@mui/material/TextField'
import * as ROUTES from '../Router/routes'

function CompanyForgetPassword (): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handleFormSubmit = (): void => {
    const credentials = { email }

    axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/company/forgot-password`, credentials)
      .then((response) => {
        const jwtToken = response.data.token
        localStorage.setItem('jwtToken', jwtToken)

        if (response.status >= 200 && response.status < 204) {
          navigate(ROUTES.COMPANY_RESET_PASSWORD)
        }
      })
      .catch((error) => {
        // TODO: Gérer l'erreur de manière appropriée.
        alert('Une erreur est survenue lors de la réinitialisation de votre mot de passe')
        console.log(error)
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
            value={email}
            onChange={handleEmailChange}
            variant='standard'
            id="standard-required"
            label={t('email')}
          />
          <div className='login-page-container__validate-button'>
            <button onClick={handleFormSubmit} className='login-page-container__form-button'>Réinitialiser</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyForgetPassword
