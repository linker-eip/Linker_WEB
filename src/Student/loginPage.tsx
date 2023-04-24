import React, { useState, type ChangeEvent } from 'react'
import HotbarStudent from './Partials/HotbarStudent'
import '../CSS/LoginPage.scss'
import { Link } from 'react-router-dom'
import * as ROUTES from '../Router/routes'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Input from '@mui/material/Input'
import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'

function LoginPage (): JSX.Element {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setEmail(event.target.value)
    checkIfButtonShouldBeEnabled(event.target.value, password)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): any => {
    setPassword(event.target.value)
    checkIfButtonShouldBeEnabled(email, event.target.value)
  }

  const fromValidate = (): any => {
    console.log(email, password)
  }

  const checkIfButtonShouldBeEnabled = (value1: string, value2: string): any => {
    if (value1 !== '' && value2 !== '') {
      setIsButtonDisabled(false)
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
            <Link to={ROUTES.REGISTER_PAGE} className='login-page-container__title--register'>
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
            </FormControl>
            <Link to={ROUTES.STUDENT_DASHBOARD} className='login-page-container__validate-button'>
              <button disabled={isButtonDisabled} onClick={fromValidate} className='login-page-container__form-button'>{t('validateButton')}</button>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default LoginPage
