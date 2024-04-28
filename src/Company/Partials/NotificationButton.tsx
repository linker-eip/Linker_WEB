/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react'
import '../../CSS/NotificationButton.scss'
import type { Notifications } from '../../Typage/NotificationType'
import NotificationCard from './NotificationCard'

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
