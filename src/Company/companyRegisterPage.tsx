import React, { useState, type ChangeEvent, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
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

// Components and Styles.
import HotbarCompany from './Partials/HotbarCompany'
import * as ROUTES from '../Router/routes'
import '../CSS/LoginPage.scss'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function CompanyRegisterPage (): JSX.Element {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [companyName, setCompanyName] = useState<string>('')
  const [telephone, setTelephone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [firstCheckedState, setFirstCheckedState] = useState<boolean>(false)
  const [secondCheckedState, setSecondCheckedState] = useState<boolean>(false)
  const [snackbarValue, setSnackbarValue] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>('')
  const navigate = useNavigate()

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const credentials = {
      email,
      password,
      name: companyName,
      phoneNumber: telephone
    }

    axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/company/register`, credentials)
      .then((response) => {
        const jwtToken = response.data.token
        localStorage.setItem('jwtToken', jwtToken)
        if (response.status >= 200 && response.status < 204) {
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

  const handleClickShowPassword = (): void => {
    setShowPassword((prev) => !prev)
  }

  const handleClickShowConfirmPassword = (): void => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  // Fonctions de gestion des changements pour chaque champ.
  const handleCompanyNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCompanyName(event.target.value)
  }

  const handleTelephoneChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTelephone(event.target.value)
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(event.target.value)
  }

  const handleFirstCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstCheckedState(event.target.checked)
  }

  const handleSecondCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSecondCheckedState(event.target.checked)
  }

  return (
    <div className='login-page-container'>
        <HotbarCompany />
        <div className='login-page-container__info'>
            <div className='login-page-container__title'>
                <Link to={ROUTES.COMPANY_LOGIN_PAGE} className='login-page-container__title--register'>
                    <p>{t('formTitle.part1')}</p>
                </Link>
                <p className='login-page-container__title--sep'>{t('formTitle.part2')}</p>
                <p className='login-page-container__title--login'>{t('formTitle.part3')}</p>
            </div>
            <form onSubmit={handleRegistration} className='login-page-container__form'>
                <TextField
                    required
                    value={companyName}
                    onChange={handleCompanyNameChange}
                    variant='standard'
                    id="standard-required"
                    label={t('companyName')}
                />
                <TextField
                    required
                    value={telephone}
                    onChange={handleTelephoneChange}
                    variant='standard'
                    id="standard-required"
                    label={t('telephone')}
                />
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
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText> {t('passwordHelper')} </FormHelperText>
                </FormControl>
                <FormControl required variant="standard">
                    <InputLabel variant="standard" htmlFor="standard-adornment-password">{t('confirmPassword')}</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={firstCheckedState}
                                onChange={handleFirstCheckboxChange}
                                name="checkAgreement"
                                color="primary"
                            />
                        }
                        label={t('firstCompanyCheckbox')}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={secondCheckedState}
                                onChange={handleSecondCheckboxChange}
                                name="checkAgreement"
                                color="primary"
                            />
                        }
                        label={t('secondGlobalCheckbox')}
                    />
                </div>
                <div className='login-page-container__validate-button'>
                    <button type='submit' className='login-page-container__form-button'>{t('registerButton')}</button>
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

export default CompanyRegisterPage
