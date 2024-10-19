/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent, useState } from 'react'
import '../../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import ContactApi from '../../../API/Contact.Api'
import { Alert, Snackbar, TextField } from '@mui/material'
import ClassicButton from '../../../Component/ClassicButton'

export function StudentContact (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()
  const [lastname, setLastname] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [messageObject, setMessageObject] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [snackbarValue, setSnackbarValue] = useState<boolean>(false)

  const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastname(event.target.value)
  }

  const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstname(event.target.value)
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handleMessageObjectChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessageObject(event.target.value)
  }

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(event.target.value)
  }

  const handleSendForm = async (): Promise<void> => {
    const data = {
      email,
      object: messageObject,
      content: message
    }
    const response = await ContactApi.sendMessage(localStorage.getItem('jwtToken') as string, data)
    if (response !== undefined) {
      openSnackbar()
      setFirstname('')
      setLastname('')
      setEmail('')
      setMessageObject('')
      setMessage('')
    }
  }

  const isButtonDisabled = (): boolean => {
    if (lastname.length > 1 && firstname.length > 1 && email.length > 1 && messageObject.length > 1 && message.length > 1) {
      if (isValidEmail(email)) {
        return false
      }
      return true
    }
    return true
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
    <div className="std-bord-container">
      <HotbarDashboard> {t('student.dashboard.contact')} </HotbarDashboard>
      <div className="std-bord-container__page">
        <SidebarDashboard state={state.CONTACT} />
        <div className="std-bord-container__content">
          <div className='contact-formv2'>
            <div className='contact-form__container'>
              <div className='contact-form__section'>
                <div className='contact-form__subtitle'> {t('contact.lastname')} </div>
                <TextField
                    className='contact-form__textfield'
                    required
                    value={lastname}
                    onChange={handleLastnameChange}
                    variant='outlined'
                    id="standard-required"
                    label={t('contact.lastname')}
                />
              </div>
              <div className='contact-form__section'>
                <div className='contact-form__subtitle'> {t('contact.firstname')} </div>
                <TextField
                    className='contact-form__textfield'
                    required
                    value={firstname}
                    onChange={handleFirstnameChange}
                    variant='outlined'
                    id="standard-required"
                    label={t('contact.firstname')}
                />
              </div>
              <div className='contact-form__section'>
                <div className='contact-form__subtitle'> {t('contact.email')} </div>
                <TextField
                    className='contact-form__textfield'
                    required
                    value={email}
                    onChange={handleEmailChange}
                    variant='outlined'
                    id="standard-required"
                    label={t('contact.email')}
                />
              </div>
              <div className='contact-form__section'>
                <div className='contact-form__subtitle'> {t('contact.object')} </div>
                <TextField
                    className='contact-form__textfield'
                    required
                    value={messageObject}
                    onChange={handleMessageObjectChange}
                    variant='outlined'
                    id="standard-required"
                    label={t('contact.object')}
                />
              </div>
              <div className='contact-form__section'>
                <div className='contact-form__subtitle'> {t('contact.message')} </div>
                  <textarea value={message} onChange={handleMessageChange} rows={10} className='contact-form__textarea' />
              </div>
              <div className='contact-form__button-section'>
                <ClassicButton title={t('contact.send')} disabled={isButtonDisabled()} onClick={handleSendForm} />
              </div>
          </div>
        </div>
        <Snackbar open={snackbarValue} autoHideDuration={6000} onClose={closeSnackbar}>
          <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
            { t('contact.message_sended') }
          </Alert>
        </Snackbar>
        </div>
      </div>
    </div>
  )
}
