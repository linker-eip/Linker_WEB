/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'
import '../../../CSS/NotificationButton.scss'
import type { Notifications } from '../../../Typage/NotificationType'
import NotificationCard from './NotificationCard'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'
import NotificationApi from '../../../API/NotificationApi'

interface Props {
  onClick: () => void
  title: string
  refuse?: boolean
  cancelled?: boolean
  disabled?: boolean
  isClicked: boolean
  data: Notifications[]
  newNotif: number
  onReload: () => void
}

function NotificationButton (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [isEmailNotification, setIsEmailNotification] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (event: any): void => {
      if (props.isClicked && !event.target.closest('.notif-button__container')) {
        props.onClick()
        document.dispatchEvent(new Event('hideContainer'))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [props.isClicked])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await NotificationApi.getStudentPreferences(localStorage.getItem('jwtToken') as string)
      if (response !== undefined) {
        if (response.mailNotifDocument || response.mailNotifGroup || response.mailNotifMessage || response.mailNotifMission) {
          setIsEmailNotification(true)
        }
      }
    }

    fetchData()
  }, [])

  const handleChangeNotification = (): void => {
    if (isEmailNotification) {
      const dto = {
        mailNotifMessage: false,
        mailNotifGroup: false,
        mailNotifMission: false,
        mailNotifDocument: false
      }
      NotificationApi.changeStudentNotificationPreferences(localStorage.getItem('jwtToken') as string, dto)
      setIsEmailNotification(!isEmailNotification)
    } else {
      const dto = {
        mailNotifMessage: true,
        mailNotifGroup: true,
        mailNotifMission: true,
        mailNotifDocument: true
      }
      NotificationApi.changeStudentNotificationPreferences(localStorage.getItem('jwtToken') as string, dto)
      setIsEmailNotification(!isEmailNotification)
    }
  }

  return (
    <div className='notif-button'>
      {props.newNotif > 0
        ? <div className='notif-button__new-notif'>
            <div className='notif-button__count'> {props.newNotif} </div>
            <img className='notif-button__bg' src='/assets/new_notif.svg' />
          </div>
        : null
      }
      <img className='notif-button__img' src='/assets/notification.svg' onClick={props.onClick} />
      {props.isClicked
        ? props.data.length > 0
          ? <div className='notif-button__container' style={{ maxHeight: '379px', overflowY: 'auto' }}>
              <div className='notif-button__email'>
                <div> { t('notifications.email') } </div>
                { isEmailNotification
                  ? <Switch defaultChecked onChange={handleChangeNotification} />
                  : <Switch onChange={handleChangeNotification} />
                }
              </div>
            {
              props.data.map((item, index) => <NotificationCard key={index} data={item} onReload={props.onReload} />)
            }
          </div>
          : <div className='notif-button__container-2' style={{ maxHeight: '379px', overflowY: 'auto' }}>
              <img src='/assets/notification.svg' className='notif-button__img2' />
            </div>
        : null
      }
    </div>
  )
}

export default NotificationButton
