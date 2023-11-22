import React, { useState } from 'react'
import '../../../../CSS/MissionCard.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../Router/routes'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType } from '../../../../Enum'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { IconButton } from '@mui/material'

interface MissionPotentialItems {
  id: number
  name: string
  status: string
  description: string
  companyId: number
  startOfMission: Date
  endOfMission: Date
  amount: number
  skills: string
}

interface Props {
  data: MissionPotentialItems
  cancelled?: boolean
  potential?: boolean
}

function MissionCardPotential (props: Props): JSX.Element {
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

  function formatDate (missionDate: string): string {
    const [date] = missionDate.split('T')
    const [year, month, day] = date.split('-')
    return `${day}-${month}-${year}`
  }

  return (
    <div className='mission-card'>
        <img className='mission-card__logo' src='/assets/anonymLogo.jpg' />
      <div className='mission-card__container'>
        <div>
          <p className='mission-card__pending-title'>
            { props.data.name }
          </p>
        </div>
        <div className='mission-card__pending-content'>
          <div className='mission-card__section'>
            <p className='mission-card__text'>
                {t('missionCard.price')}
            </p>
            <p className='mission-card__text-important'>
                { props.data.amount } € HT
            </p>
          </div>
          {
            props.data.startOfMission !== undefined &&
            <div className='mission-card__section'>
              <p className='mission-card__text'>
                {t('missionCard.begin')}
              </p>
              <p className='mission-card__value'>
                { formatDate(props.data.startOfMission.toString()) }
              </p>
            </div>
          }
          {
            props.data.endOfMission !== undefined &&
            <div className='mission-card__section'>
              <p className='mission-card__text'>
                {t('missionCard.end')}
              </p>
              <p className='mission-card__value'>
                { formatDate(props.data.endOfMission.toString()) }
              </p>
            </div>
          }
          {
            props.data.skills !== undefined &&
            <div className='mission-card__section'>
              <p className='mission-card__text'>
                {t('missionCard.skill')}
              </p>
              <p className='mission-card__value'>
                { props.data.skills }
              </p>
            </div>
          }
        </div>
        { props.potential ??
          <div className='mission-card__link' onClick={handleNavigation}>
            <p> {t('missionCard.see_mission')} </p>
          </div>
        }
        { props.potential === true
          ? <div className='mission-card__potential-section-pending'>
              <div className='mission-card__link' onClick={handleNavigation}>
                <p> {t('missionCard.see_mission')} </p>
              </div>
              <div/>
              <IconButton
                onClick={handleRefuseOpen}
                sx={{ marginRight: '8px' }}
              >
                <DeleteOutlineIcon sx={{ color: 'red' }} />
              </IconButton>
            </div>
          : null
        }
        </div>
        {open && (
          <ModalValidation
            subject={props.data.name}
            open={open}
            type={ModalType.DELETE}
            onClose={handleRefuseClose}
            id={props.data.id}
          />
        )}
        {acceptModal && (
          <ModalValidation
            subject={props.data.name}
            open={acceptModal}
            type={ModalType.ACCEPT}
            onClose={handleAcceptClose}
          />
        )}
      </div>
  )
}

export default MissionCardPotential
