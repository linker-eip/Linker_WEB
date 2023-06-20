import React, { useState, type ChangeEvent } from 'react'
import HotbarStudent from './Partials/HotbarStudent'
import '../CSS/LoginPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'
import { IconButton, FormHelperText } from '@mui/material'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

function StudentRegisterPage (): JSX.Element {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [telephone, setTelephone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [firstCheckedState, setFirstCheckedState] = useState<boolean>(false)
  const [secondCheckedState, setSecondCheckedState] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setLastName(event.target.value)
  }

  const handleTelephoneChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setTelephone(event.target.value)
    checkIfButtonShouldBeEnabled(event.target.value, telephone)
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setEmail(event.target.value)
    checkIfButtonShouldBeEnabled(event.target.value, password)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setPassword(event.target.value)
    checkIfButtonShouldBeEnabled(email, event.target.value)
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setConfirmPassword(event.target.value)
  }

  const handleFirstCheckboxChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setFirstCheckedState(event.target.checked)
  }

  const handleSecondCheckboxChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setSecondCheckedState(event.target.checked)
  }

  const fromValidate = (): any => {
    const credentials = {
      email,
      password,
      firstName,
      lastName
    }

    axios.post('https://api.linker-app.fr/api/auth/student/register', credentials)
      .then((response) => {
        console.log(response)
        const jwtToken = response.data.token
        localStorage.setItem(jwtToken, jwtToken)
        if (response.status >= 200 && response.status < 204) {
          navigate(ROUTES.STUDENT_DASHBOARD)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function isTelephone (telephone: string): boolean {
    const telephoneRegex = /^\d{9}$/
    return telephoneRegex.test(telephone)
  }

  function isEmail (email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function isStrongPassword (password: string): boolean {
    const lengthRegex = /.{8,}/
    const uppercaseRegex = /[A-Z]/
    const lowercaseRegex = /[a-z]/
    const digitRegex = /\d/

    return lengthRegex.test(password) && uppercaseRegex.test(password) && lowercaseRegex.test(password) && digitRegex.test(password)
  }

  const checkIfButtonShouldBeEnabled = (value1: string, value2: string): any => {
    if (value1 !== '' && value2 !== '') {
      if (isEmail(value1) && isStrongPassword(value2) && isTelephone(telephone)) {
        setIsButtonDisabled(false)
      }
    } else {
      setIsButtonDisabled(true)
    }
  }

  const handleClickShowPassword = (): any => { setShowPassword((show) => !show) }

  const handleClickShowConfirmPassword = (): any => { setShowConfirmPassword((show) => !show) }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): any => {
    event.preventDefault()
  }
  return (
      <div className='login-page-container'>
        <HotbarStudent/>
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
                  onChange={handleFirstNameChange}
                  variant='standard'
                  id="standard-required"
                  label={t('firstName')}
                  style={{ marginRight: '20px' }}
              />
              <TextField
                  required
                  value={lastName}
                  onChange={handleLastNameChange}
                  variant='standard'
                  id="standard-required"
                  label={t('lastName')}
              />
            </div>
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
                label={t('firstStudentCheckbox')}
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
              <button disabled={isButtonDisabled} onClick={fromValidate} className='login-page-container__form-button'>{t('registerButton')}</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default StudentRegisterPage
