/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-self-compare */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { type ChangeEvent, useEffect, useState } from 'react'
import '../../../../CSS/StudentSecurity.scss'
import { useTranslation } from 'react-i18next'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ClassicButton from '../../../../Component/ClassicButton'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import ProfileApi from '../../../../API/ProfileApi'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../Router/routes'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType } from '../../../../Enum'
import { type StudentProfileInfo } from '../../../../Typage/ProfileType'
import AuthApi from '../../../../API/AuthApi'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

enum ErrorList {
  OLD,
  NEW,
  CONFIRM,
  ALL,
  NONE
}

function StudentSecurity (): JSX.Element {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show)
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)
  const [snackBarValue, setSnackBarValue] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [errorInfo, setErrorInfo] = useState<ErrorList>()
  const [snackError, setSnackError] = useState<boolean>(true)
  const [deactivateModal, setDeactivateModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [profile, setProfile] = useState<StudentProfileInfo>()

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      const profileData = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
      setProfile(profileData)
      return profileData
    }
    fetchData()
  }, [])

  const hasSpecialCharacter = (text: string): boolean => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/
    return specialCharacterRegex.test(text)
  }

  const hasDigit = (text: string): boolean => {
    const digitRegex = /\d/
    return digitRegex.test(text)
  }

  const hasUppercase = (text: string): boolean => {
    const uppercaseRegex = /[A-Z]/
    return uppercaseRegex.test(text)
  }

  const isValidPassword = (text: string): boolean => {
    return hasSpecialCharacter(text) && hasDigit(text) && hasUppercase(text)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const closeSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBarValue(false)
  }

  const handleChangeOldPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value)
  }

  const handleChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
  }

  const handleChangeConfirmNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value)
  }

  const openDeactivateModal = (): void => {
    setDeactivateModal(true)
  }

  const openDeleteModal = (): void => {
    setDeleteModal(true)
  }

  const closeDeactivateModal = (): void => {
    setDeactivateModal(false)
  }

  const closeDeleteModal = (): void => {
    setDeleteModal(false)
  }

  const deactivateAccount = (): void => {
    setDeactivateModal(false)
    ProfileApi.deactivateStudentAccount(localStorage.getItem('jwtToken') as string)
      .then(() => {
        navigate(ROUTES.STUDENT_LOGIN_PAGE)
      })
      .catch((error) => {
        console.error('[ERROR] - Unable to deactivate account:', error)
      })
  }

  const deleteAccount = (): void => {
    setDeleteModal(false)
    ProfileApi.deleteStudentAccount(localStorage.getItem('jwtToken') as string)
      .then(() => {
        navigate(ROUTES.STUDENT_REGISTER_PAGE)
      })
      .catch((error) => {
        console.error('[ERROR] - Unable to delete account:', error)
      })
  }

  const buttonValidation = async (): Promise<void> => {
    if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
      setAlertMessage(t('student.settings.error.empty_field').toString())
      setSnackBarValue(true)
      setErrorInfo(ErrorList.ALL)
      setSnackError(true)
      return
    }
    if (newPassword !== confirmNewPassword) {
      setAlertMessage(t('student.settings.error.new_confirm').toString())
      setSnackBarValue(true)
      setErrorInfo(ErrorList.CONFIRM)
      setSnackError(true)
      return
    }
    if (!isValidPassword(newPassword)) {
      setAlertMessage(t('student.settings.error.composition').toString())
      setSnackBarValue(true)
      setErrorInfo(ErrorList.ALL)
      setSnackError(true)
      return
    }

    const dto = {
      oldPassword,
      newPassword
    }
    const response = await AuthApi.changeStudentPassword(localStorage.getItem('jwtToken') as string, dto)
    if (response === '') {
      setAlertMessage(t('student.settings.error.success').toString())
      setSnackBarValue(true)
      setSnackError(false)
      setErrorInfo(ErrorList.NONE)
      setTimeout(() => handleDisconnect(), 1000)
    } else {
      setAlertMessage(response)
      setSnackBarValue(true)
      setErrorInfo(ErrorList.ALL)
      setSnackError(true)
    }
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  const handleDisconnect = (): void => {
    localStorage.removeItem('jwtToken')
    navigate(ROUTES.STUDENT_LOGIN_PAGE)
  }

  return (
    <div className='std-security'>
      <div className='std-security__section'>
        <div className='std-security__title'>
          { t('student.settings.security.password') }
        </div>
        <div className='std-security__container'>
          <FormControl sx={{ m: 0, width: '32ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" > { t('student.settings.security.password_old') } </InputLabel>
            <OutlinedInput
              error={errorInfo === ErrorList.OLD || errorInfo === ErrorList.ALL}
              value={oldPassword}
              onChange={handleChangeOldPassword}
              id="outlined-adornment-password"
              type={showOldPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={ t('student.settings.security.password_old') }
            />
          </FormControl>
          <FormControl sx={{ m: 0, width: '32ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password"> { t('student.settings.security.password_new') } </InputLabel>
            <OutlinedInput
              error={errorInfo === ErrorList.NEW || errorInfo === ErrorList.ALL}
              value={newPassword}
              onChange={handleChangeNewPassword}
              id="outlined-adornment-password"
              type={showNewPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={ t('student.settings.security.password_new') }
            />
          </FormControl>
          <FormControl sx={{ m: 0, width: '32ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password"> { t('student.settings.security.password_confirm') } </InputLabel>
            <OutlinedInput
              error={errorInfo === ErrorList.CONFIRM || errorInfo === ErrorList.ALL}
              value={confirmNewPassword}
              onChange={handleChangeConfirmNewPassword}
              id="outlined-adornment-password"
              type={showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={ t('student.settings.security.password_confirm') }
            />
          </FormControl>
          <div className='std-security__helper'>
            <div className='std-security__help-text'> <div className='std-security__black-dote' /> { t('student.settings.security.param1') } </div>
            <div className='std-security__help-text'> <div className='std-security__black-dote' /> { t('student.settings.security.param2') } </div>
            <div className='std-security__help-text'> <div className='std-security__black-dote' /> { t('student.settings.security.param3') } </div>
          </div>
        <ClassicButton title={t('student.settings.security.modif')} onClick={buttonValidation} />
        </div>
      </div>
      <div className='std-security__section'>
        <div className='std-security__title'>
          { t('student.settings.security.delete') }
        </div>
        <div className='std-security__container'>
          <ClassicButton title={t('student.settings.security.desactivation')} onClick={openDeactivateModal} refuse />
          <ClassicButton title={t('student.settings.security.delete')} onClick={openDeleteModal} refuse />
        </div>
      </div>
      <Snackbar open={snackBarValue} autoHideDuration={6000} onClose={closeSnackBar}>
        <Alert onClose={closeSnackBar} severity={snackError ? 'error' : 'success'} sx={{ width: '100%' }}>
          { alertMessage }
        </Alert>
      </Snackbar>
      <ModalValidation
        subject={profile?.lastName + ' ' + profile?.firstName}
        open={deactivateModal}
        onClose={closeDeactivateModal}
        type={ModalType.DEACTIVATE_ACCOUNT}
        onValid={deactivateAccount}
      />
      <ModalValidation
        subject={profile?.lastName + ' ' + profile?.firstName}
        open={deleteModal}
        onClose={closeDeleteModal}
        type={ModalType.DELETE_ACCOUNT}
        onValid={deleteAccount}
      />
    </div>
  )
}

export default StudentSecurity
