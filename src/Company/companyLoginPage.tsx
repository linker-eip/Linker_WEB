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
  Snackbar
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

// Components and Styles.
import HotbarCompany from './Partials/HotbarCompany'
import * as ROUTES from '../Router/routes'
import '../CSS/LoginPage.scss'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import { CheckLogin } from '../Component/CheckAuth'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function CompanyLoginPage (): JSX.Element {
  CheckLogin()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [snackbarValue, setSnackbarValue] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedEmail = event.target.value
    setEmail(updatedEmail)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedPassword = event.target.value
    setPassword(updatedPassword)
  }

  const fromValidate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const apiUrl = process.env.REACT_APP_API_URL ?? ''

    axios.post(`${apiUrl}/api/auth/company/login`, { email, password })
      .then((response) => {
        localStorage.setItem('jwtToken', response.data.token)
        if (response.data.error === undefined) {
          navigate(ROUTES.COMPANY_DASHBOARD)
        } else {
          setErrorMessage(response.data.error)
          openSnackbar()
        }
      })
      .catch((error) => {
        const response = JSON.parse(error.request.responseText)
        setErrorMessage(response.message.join(', '))
        openSnackbar()
      })
  }

  const openSnackbar = (): void => {
    setSnackbarValue(true)
  }

  const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarValue(false)
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
        <form onSubmit={fromValidate} className='login-page-container__form'>
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
            <button type='submit' className='login-page-container__form-button'>
              {t('validateButton')}
            </button>
          </div>
        </form>
      </div>
      <Snackbar open={snackbarValue} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          { errorMessage }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CompanyLoginPage
