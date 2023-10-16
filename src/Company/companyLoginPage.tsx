import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  IconButton,
  FormHelperText
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

// Components and Styles.
import HotbarCompany from './Partials/HotbarCompany'
import * as ROUTES from '../Router/routes'
import '../CSS/LoginPage.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_LENGTH_REGEX = /.{8,}/
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/
const PASSWORD_LOWERCASE_REGEX = /[a-z]/
const PASSWORD_DIGIT_REGEX = /\d/

function CompanyLoginPage (): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email)
  const isStrongPassword = (password: string): boolean =>
    PASSWORD_LENGTH_REGEX.test(password) &&
    PASSWORD_UPPERCASE_REGEX.test(password) &&
    PASSWORD_LOWERCASE_REGEX.test(password) &&
    PASSWORD_DIGIT_REGEX.test(password)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedEmail = event.target.value
    setEmail(updatedEmail)
    checkIfButtonShouldBeEnabled(updatedEmail, password)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedPassword = event.target.value
    setPassword(updatedPassword)
    checkIfButtonShouldBeEnabled(email, updatedPassword)
  }

  const checkIfButtonShouldBeEnabled = (email: string, password: string): void => {
    if (isValidEmail(email) && isStrongPassword(password)) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }

  const fromValidate = (): void => {
    const apiUrl = process.env.REACT_APP_API_URL ?? ''

    axios
      .post(`${apiUrl}/api/auth/company/login`, { email, password })
      .then((response) => {
        localStorage.setItem('jwtToken', response.data.token)
        if (response.data.error === undefined) {
          navigate(ROUTES.COMPANY_DASHBOARD)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const PasswordField = (): JSX.Element => (
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
              onClick={() => { setShowPassword(prev => !prev) }}
              onMouseDown={(event) => { event.preventDefault() }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{t('passwordHelper')}</FormHelperText>
      <Link to={ROUTES.COMPANY_FORGOT_PASSWORD} className="login-page-container__forgotten-password">
        <p>{t('forgottenPassword')}</p>
      </Link>
    </FormControl>
  )

  return (
    <div className='login-page-container'>
      <HotbarCompany />
      <div className='login-page-container__info'>
        <div className='login-page-container__title'>
          <p className='login-page-container__title--login'> {t('formTitle.part1')} </p>
          <p className='login-page-container__title--sep'>{t('formTitle.part2')}</p>
          <Link to={ROUTES.COMPANY_REGISTER_PAGE} className='login-page-container__title--register'>
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
          {PasswordField()}
          <div className='login-page-container__validate-button'>
            <button disabled={isButtonDisabled} onClick={fromValidate} className='login-page-container__form-button'>
              {t('validateButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyLoginPage
