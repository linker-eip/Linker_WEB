import React, { useState } from 'react'
import HotbarStudent from './Partials/HotbarStudent'
import '../CSS/LoginPage.scss'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

function StudentForgetPassword (): JSX.Element {
  const { t } = useTranslation()
  const [email, setEmail] = useState<string>('')
  const navigate = useNavigate()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handleFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    const credentials = {
      email
    }

    axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/student/forgot-password`, credentials)
      .then((response) => {
        if (response.status >= 200 && response.status < 204) {
          const jwtToken = response.data.token
          localStorage.setItem('jwtToken', jwtToken)
          navigate(ROUTES.STUDENT_RESET_PASSWORD)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
      <div className='login-page-container'>
        <HotbarStudent/>
        <div className='login-page-container__info'>
          <div className='login-page-container__title'>
            <p className='login-page-container__title--login'> Mot de passe oublié ?</p>
          </div>
          <form onSubmit={handleFormSubmit} className='login-page-container__form'>
            <TextField
              required
              value={email}
              onChange={handleEmailChange}
              variant='standard'
              id="standard-required"
              label={t('email')}
            />
            <div className='login-page-container__validate-button'>
              <button type="submit" className='login-page-container__form-button'>Réinitialiser</button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default StudentForgetPassword
