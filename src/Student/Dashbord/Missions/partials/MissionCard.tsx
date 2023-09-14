import React from 'react'
import '../../../../CSS/MissionCard.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../Router/routes'

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
  }
  cancelled?: boolean
}

function MissionCard (props: Props): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleNavigation = (): void => {
    navigate(ROUTES.STUDENT_DETAILED_MISSION)
  }

  return (
    <div className='mission-card'>
        <img className='mission-card__logo' src={props.data.logo} />
      <div className='mission-card__container'>
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
        <div className='mission-card__link' onClick={handleNavigation}>
          <p> {t('missionCard.see_mission')} </p>
        </div>
      </div>
    </div>
  )
}

export default MissionCard
