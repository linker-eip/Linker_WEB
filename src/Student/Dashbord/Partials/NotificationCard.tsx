/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React from 'react'
import '../../../CSS/NotificationCard.scss'
import type { Notifications } from '../../../Typage/NotificationType'
import moment from 'moment'
import 'moment/locale/fr'
import NotificationApi from '../../../API/NotificationApi'
import { NotificationType } from '../../../Enum'
import * as ROUTES from '../../../Router/routes'

import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

interface Props {
  onClick?: () => void
  data: Notifications
  onReload: () => void
}

function NotificationCard (props: Props): JSX.Element {
  const navigate = useNavigate()
  moment.locale('fr')
  const date = moment(props.data.date).format('DD MMMM YYYY')

  const handleRemoveNotif = (): void => {
    NotificationApi.removeNotification(localStorage.getItem('jwtToken') as string, props.data.id)
    props.onReload()
  }

  const redirectNotification = (): void => {
    if (props.data.type === NotificationType.GROUP) {
      navigate(ROUTES.STUDENT_GROUP)
    }
    if (props.data.type === NotificationType.MISSION) {
      navigate(ROUTES.STUDENT_MISSIONS)
    }
    if (props.data.type === NotificationType.DOCUMENT) {
      navigate(ROUTES.STUDENT_DOCUMENTS_DASHBOARD)
    }
    if (props.data.type === NotificationType.MESSAGE) {
      navigate(ROUTES.STUDENT_GROUP)
    }
  }

  return (
    <div className='notif-card' onClick={redirectNotification}>
      <div className='notif-card__section'>
        <div className='notif-card__close' onClick={handleRemoveNotif}>
          <CloseIcon />
        </div>
        {props.data.alreadySeen
          ? null
          : <div className='notif-card__new'>
            <img src='/assets/new_notif.svg' />
          </div>
        }
        <div className='notif-card__title'>
          {props.data.title}
        </div>
        <div className='notif-card__text'>
          {props.data.text}
        </div>
        <div className='notif-card__date'>
          le {date}
        </div>
      </div>
      <div className='notif-card__section-2'>
        <img className='notif-card__img' src='/assets/notif_arrow.svg' />
      </div>
    </div>
  )
}

export default NotificationCard
