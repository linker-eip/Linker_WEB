import React, { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import {
  TextField, FormControl, InputLabel, InputAdornment,
  Input, IconButton, FormHelperText
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import HotbarStudent from './Partials/HotbarStudent'
import '../CSS/LoginPage.scss'
import * as ROUTES from '../Router/routes'
import AuthApi from '../API/AuthApi'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isEmailValid = (email: string): boolean => emailRegex.test(email)

const isStrongPassword = (password: string): boolean => {
  const lengthRegex = /.{8,}/
  const uppercaseRegex = /[A-Z]/
  const lowercaseRegex = /[a-z]/
  const digitRegex = /\d/
  return lengthRegex.test(password) && uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) && digitRegex.test(password)
}

const StudentLoginPage = (): JSX.Element => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = event.target.value
    setEmail(newEmail)
    setIsButtonDisabled(!(isEmailValid(newEmail) && isStrongPassword(password)))
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = event.target.value
    setPassword(newPassword)
    setIsButtonDisabled(!(isEmailValid(email) && isStrongPassword(newPassword)))
  }

  const validateForm = (): void => {
    const credentials = { email, password }
    axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/student/login`, credentials)
      .then((response) => {
        localStorage.setItem('jwtToken', response.data.token)
        if (response.data.error === undefined) checkVerifiedAccount(response.data.token)
      })
      .catch((error) => { console.error(error) })
  }

  const togglePasswordVisibility = (): void => {
    setShowPassword(prevState => !prevState)
  }

  const checkVerifiedAccount = async (token: string): Promise<void> => {
    const returnValue = await AuthApi.VerifyStudentAccount(token)
    if (returnValue !== undefined && returnValue) {
      navigate(ROUTES.STUDENT_DASHBOARD)
    } else {
      navigate(ROUTES.WAIT_VERIFIED_STUDENT_ACCOUNT)
    }
  }

  return (
    <div className='login-page-container'>
      <HotbarStudent />
      <div className='login-page-container__info'>
        <div className='login-page-container__title'>
          <p className='login-page-container__title--login'> {t('formTitle.part1')} </p>
          <p className='login-page-container__title--sep'>{t('formTitle.part2')}</p>
          <Link to={ROUTES.STUDENT_REGISTER_PAGE} className='login-page-container__title--register'>
            <p>{t('formTitle.part3')}</p>
          </Link>
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
          <FormControl required variant="standard">
            <InputLabel variant="standard" htmlFor="standard-adornment-password">{t('password')}</InputLabel>
            <Input
              id="standard-adornment-password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText> {t('passwordHelper')} </FormHelperText>
            <Link to={ROUTES.STUDENT_FORGOT_PASSWORD} className="login-page-container__forgotten-password">
              <p>{t('forgottenPassword')}</p>
            </Link>
          </FormControl>
          <div className='login-page-container__validate-button'>
            <button disabled={isButtonDisabled} onClick={validateForm} className='login-page-container__form-button'>{t('validateButton')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentLoginPage
