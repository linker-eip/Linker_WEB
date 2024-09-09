import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Input,
  IconButton,
  FormHelperText,
  Snackbar
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import HotbarStudent from './Partials/HotbarStudent'
import * as ROUTES from '../Router/routes'
import '../CSS/LoginPage.scss'
import AuthApi from '../API/AuthApi'

import MuiAlert, { type AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function StudentRegisterPage (): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // States for form fields
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [telephone, setTelephone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [firstCheckedState, setFirstCheckedState] = useState<boolean>(false)
  const [secondCheckedState, setSecondCheckedState] = useState<boolean>(false)
  const [snackbarValue, setSnackbarValue] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value)
    }

  const handleCheckboxChange = (setState: React.Dispatch<React.SetStateAction<boolean>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.checked)
    }

  const handleTogglePassword = (): void => { setShowPassword((prev) => !prev) }
  const handleToggleConfirmPassword = (): void => { setShowConfirmPassword((prev) => !prev) }

  const handleAsyncOperation = async (): Promise<void> => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL ?? ''
      const credentials = { email, password, firstName, lastName }
      const response = await axios.post(`${apiUrl}/api/auth/student/register`, credentials)
      localStorage.setItem('jwtToken', response.data.token)
      if (response.status >= 200 && response.status < 204) {
        checkVerifiedAccount(response.data.token)
      }
    } catch (error: any) {
      const response = JSON.parse(error.request.responseText)
      setErrorMessage(response.message.join(', '))
      openSnackbar()
    }
  }

  const checkVerifiedAccount = async (token: string): Promise<void> => {
    const returnValue = await AuthApi.VerifyStudentAccount(token)
    if (returnValue !== undefined && returnValue) {
      navigate(ROUTES.STUDENT_DASHBOARD)
    } else {
      navigate(ROUTES.WAIT_VERIFIED_STUDENT_ACCOUNT)
    }
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    handleAsyncOperation()
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

  return (
    <div className='login-page-container'>
      <HotbarStudent />
      <div className='login-page-container__info'>
        <div className='login-page-container__title'>
          <Link to={ROUTES.STUDENT_LOGIN_PAGE} className='login-page-container__title--register'>
            <p>{t('formTitle.part1')}</p>
          </Link>
          <p className='login-page-container__title--sep'>{t('formTitle.part2')}</p>
          <p className='login-page-container__title--login'>{t('formTitle.part3')}</p>
        </div>
        <div className='login-page-container__form'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              required
              value={firstName}
              onChange={handleChange(setFirstName)}
              variant='standard'
              label={t('firstName')}
              style={{ marginRight: '20px' }}
            />
            <TextField
              required
              value={lastName}
              onChange={handleChange(setLastName)}
              variant='standard'
              label={t('lastName')}
            />
          </div>
          <TextField
            required
            value={telephone}
            onChange={handleChange(setTelephone)}
            variant='standard'
            label={t('telephone')}
          />
          <TextField
            required
            value={email}
            onChange={handleChange(setEmail)}
            variant='standard'
            label={t('email')}
          />
          <PasswordInput
            showPassword={showPassword}
            handleTogglePassword={handleTogglePassword}
            handleChange={handleChange(setPassword)}
            password={password}
            label={t('password')}
          />
          <PasswordInput
            showPassword={showConfirmPassword}
            handleTogglePassword={handleToggleConfirmPassword}
            handleChange={handleChange(setConfirmPassword)}
            password={confirmPassword}
            label={t('confirmPassword')}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CheckboxInput
              checked={firstCheckedState}
              handleChange={handleCheckboxChange(setFirstCheckedState)}
              label={t('firstStudentCheckbox')}
            />
            <CheckboxInput
              checked={secondCheckedState}
              handleChange={handleCheckboxChange(setSecondCheckedState)}
              label={t('secondGlobalCheckbox')}
            />
          </div>
          <div className='login-page-container__validate-button'>
            <button onClick={handleSubmit} className='login-page-container__form-button'>
              {t('registerButton')}
            </button>
          </div>
        </div>
      </div>
      <Snackbar open={snackbarValue} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          { errorMessage }
        </Alert>
      </Snackbar>
    </div>
  )
}

const PasswordInput = ({ showPassword, handleTogglePassword, handleChange, password, label }: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormControl required variant="standard">
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      <Input
        value={password}
        onChange={handleChange}
        type={showPassword === true ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword}>
              {showPassword === true ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{t('passwordHelper')}</FormHelperText>
    </FormControl>
  )
}

const CheckboxInput = ({ checked, handleChange, label }: any): JSX.Element => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checked}
        onChange={handleChange}
        color="primary"
      />
    }
    label={label}
  />
)

export default StudentRegisterPage
