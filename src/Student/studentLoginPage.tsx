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
import Input from '@mui/material/Input'
import { IconButton, FormHelperText } from '@mui/material'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

function StudentLoginPage (): JSX.Element {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const navigate = useNavigate()

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setEmail(event.target.value)
    checkIfButtonShouldBeEnabled(event.target.value, password)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setPassword(event.target.value)
    checkIfButtonShouldBeEnabled(email, event.target.value)
  }

  const fromValidate = (): any => {
    const credentials = {
      email,
      password
    }

    axios.post('URL_BACKEND_STUDENT_LOGIN', credentials)
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
      if (isEmail(value1) && isStrongPassword(value2)) {
        setIsButtonDisabled(false)
      }
    } else {
      setIsButtonDisabled(true)
    }
  }

  const handleClickShowPassword = (): any => { setShowPassword((show) => !show) }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): any => {
    event.preventDefault()
  }
  return (
      <div className='login-page-container'>
        <HotbarStudent/>
        <div className='login-page-container__info'>
          <div className='login-page-container__title'>
            <p className='login-page-container__title--login'> {t('formTitle.part1')} </p>
            <p className='login-page-container__title--sep'>{t('formTitle.part2')}</p>
            <Link to={ROUTES.STUDENT_REGISTER_PAGE} className='login-page-container__title--register'>
              <p >{t('formTitle.part3')}</p>
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
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
              <button disabled={isButtonDisabled} onClick={fromValidate} className='login-page-container__form-button'>{t('validateButton')}</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default StudentLoginPage
