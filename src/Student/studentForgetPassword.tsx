import React, { useState, type ChangeEvent } from 'react'
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

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setEmail(event.target.value)
  }

  const fromValidate = (): any => {
    const credentials = {
      email
    }

    axios.post('https://api.linker-app.fr/api/auth/student/forgot-password', credentials)
      .then((response) => {
        console.log(response)
        const jwtToken = response.data.token
        localStorage.setItem(jwtToken, jwtToken)
        if (response.status >= 200 && response.status < 204) {
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
              <button onClick={fromValidate} className='login-page-container__form-button'>Réinitialiser</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default StudentForgetPassword
