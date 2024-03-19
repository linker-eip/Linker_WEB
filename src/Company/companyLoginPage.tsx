/* eslint-disable */
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
  FormHelperText,
  Divider
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

const GoogleButton = () => {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid'
  ]

  url.searchParams.append('scope', scopes.join(' '))
  url.searchParams.append('access_type', 'offline')
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('redirect_uri', 'http://localhost:3000/testcompany')
  url.searchParams.append('client_id', '728274663127-hnvg9kdj9jqp519c8n1ssshv6gdi4h65.apps.googleusercontent.com')

  return (
      <a href={url.href} >
          <button className='login-page-container__form-button'>
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
              </svg>
                <p> </p>
                <p>Se connecter avec Google</p>
          </button>
      </a>
  )
}

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
          <Divider sx={{ borderColor: 'grey', borderWidth: 1 }} />
          <div className='login-page-container__validate-button'>
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyLoginPage
