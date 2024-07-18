/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-self-compare */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { type ChangeEvent, useEffect, useState } from 'react'
import '../../../../CSS/StudentSecurity.scss'
import { useTranslation } from 'react-i18next'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, type SelectChangeEvent, Snackbar, Switch } from '@mui/material'
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

function StudentPreferences (): JSX.Element {
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
  const [language, setLanguage] = useState('')
  const [messageNotif, setMessageNotif] = useState(false)
  const [groupNotif, setGroupNotif] = useState(false)
  const [documentNotif, setDocumentNotif] = useState(false)
  const [missionNotif, setMissionNotif] = useState(false)

  const handleChangeMessageNotif = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageNotif(event.target.checked)
  }

  const handleChangeGroupNotif = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupNotif(event.target.checked)
  }

  const handleChangeDocumentNotif = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentNotif(event.target.checked)
  }

  const handleChangeMissionNotif = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissionNotif(event.target.checked)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value)
  }

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

  const closeSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBarValue(false)
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

  return (
    <div className='std-security'>
      <div className='std-security__section'>
        <div>
          <div className='std-security__title'>
            { t('student.settings.preference.language') }
          </div>
          <div className='std-security__subtitle'>
            { t('student.settings.preference.choose_language') }
          </div>
        </div>
        <div className='std-security__container'>
        <FormControl fullWidth sx={{ minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label"> {t('student.settings.preference.select_language')} </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label={t('student.settings.preference.select_language')}
            onChange={handleChange}
          >
            <MenuItem value={t('student.settings.preference.french')}> {t('student.settings.preference.french')} </MenuItem>
            <MenuItem value={t('student.settings.preference.english')}> {t('student.settings.preference.english')} </MenuItem>
          </Select>
        </FormControl>
        <ClassicButton title={t('student.settings.preference.save')} onClick={buttonValidation} />
        </div>
      </div>
      <div className='std-security__section'>
        <div>
          <div className='std-security__title'>
            { t('student.settings.preference.notifications') }
          </div>
          <div className='std-security__subtitle'>
            { t('student.settings.preference.choose_notif') }
          </div>
        </div>
        <div className='std-security__container2'>
          <div className='std-security__content'>
            <div className='std-security__help-text'> {t('student.settings.preference.new_message')} </div>
            <Switch
              checked={messageNotif}
              onChange={handleChangeMessageNotif}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <div className='std-security__content'>
            <div className='std-security__help-text'> {t('student.settings.preference.group_notif')} </div>
            <Switch
              checked={groupNotif}
              onChange={handleChangeGroupNotif}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <div className='std-security__content'>
            <div className='std-security__help-text'> {t('student.settings.preference.doc_notif')} </div>
            <Switch
              checked={documentNotif}
              onChange={handleChangeDocumentNotif}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <div className='std-security__content'>
            <div className='std-security__help-text'> {t('student.settings.preference.mission_notif')} </div>
            <Switch
              checked={missionNotif}
              onChange={handleChangeMissionNotif}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
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

export default StudentPreferences
