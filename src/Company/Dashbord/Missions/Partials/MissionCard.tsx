/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import '../../../../CSS/MissionCard.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../Router/routes'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType, TicketType } from '../../../../Enum'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { IconButton } from '@mui/material'
import ReportButton from '../../../../Component/ReportButton'

interface Props {
  data: {
    logo: string
    title: string
    motant: number
    begin?: string
    end?: string
    bill: string
    participants: number
    cancelledDate?: string
    id: number
  }
  cancelled?: boolean
  potential?: boolean
}

function MissionCard (props: Props): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [acceptModal, setAcceptModal] = useState(false)
  const handleRefuseOpen = (): void => {
    setOpen(true)
  }

  const handleRefuseClose = (): void => {
    setOpen(false)
  }

  const handleAcceptClose = (): void => {
    setAcceptModal(false)
  }

  const handleNavigation = (): void => {
    navigate(ROUTES.STUDENT_DETAILED_MISSION)
  }

  return (
    <div className='mission-card'>
        {/* <img className='mission-card__logo' src={props.data.logo} /> */}
      <div className='mission-card__container'>
        <ReportButton TicketType={TicketType.MISSION} id={props.data.id} />
        <div>
          <p className='mission-card__title'> { props.data.title } </p>
        </div>
        <div className='mission-card__content'>
          <div className='mission-card__section'>
            <p className='mission-card__text'> {t('missionCard.price')} </p>
            <p className='mission-card__text-important'> { props.data.motant } € HT </p>
          </div>
          {
            props.data.begin !== undefined &&
            <div className='mission-card__section'>
              <p className='mission-card__text'> {t('missionCard.begin')} </p>
              <p className='mission-card__value'> { props.data.begin } </p>
            </div>
          }
          <div className='mission-card__section'>
            { props.cancelled !== null && props.cancelled === true
              ? <p className='mission-card__text'> {t('missionCard.cancelled')} </p>
              : <p className='mission-card__text'> {t('missionCard.end')} </p>
            }
            <p className='mission-card__value'> { props.cancelled !== null && props.cancelled === true ? props.data.cancelledDate : props.data.end } </p>
          </div>
          <div className='mission-card__section'>
            <p className='mission-card__text'> {t('missionCard.participants')} </p>
            <p className='mission-card__value'> { props.data.participants } personnes </p>
          </div>
          <div className='mission-card__section'>
            <p className='mission-card__text'> {t('missionCard.bill')} </p>
            <p className='mission-card__text-important'> { props.data.bill } </p>
          </div>
        </div>
        { props.potential ??
          <div className='mission-card__link' onClick={handleNavigation}>
            <p> {t('missionCard.see_mission')} </p>
          </div>
        }
        { props.potential === true
          ? <div className='mission-card__potential-section'>
              <div className='mission-card__link' onClick={handleNavigation}>
                <p> {t('missionCard.see_mission')} </p>
              </div>
              <div/>
              <IconButton onClick={handleRefuseOpen}>
                <DeleteOutlineIcon sx={{ color: 'red' }} />
              </IconButton>
            </div>
          : null
        }
        </div>
        {
          open ? <ModalValidation subject={props.data.title} open={open} type={ModalType.DELETE} onClose={handleRefuseClose} /> : null
        }
        {
          acceptModal ? <ModalValidation subject={props.data.title} open={acceptModal} type={ModalType.ACCEPT} onClose={handleAcceptClose} /> : null
        }
      </div>
  )
}

export default MissionCard
