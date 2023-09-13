import React from 'react'
import '../../../../CSS/MissionCard.scss'
import { useTranslation } from 'react-i18next'

interface Props {
  data: {
    logo: string
    title: string
    motant: number
    begin: string
    end: string
    bill: string
    participants: number
  }
}

function MissionCard (props: Props): JSX.Element {
  const { t } = useTranslation()
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
          <div className='mission-card__section'>
            <p className='mission-card__text'> {t('missionCard.begin')} </p>
            <p className='mission-card__value'> { props.data.begin } </p>
          </div>
          <div className='mission-card__section'>
            <p className='mission-card__text'> {t('missionCard.end')} </p>
            <p className='mission-card__value'> { props.data.end } </p>
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
        <div className='mission-card__link'>
          <p> {t('missionCard.see_mission')} </p>
        </div>
      </div>
    </div>
  )
}

export default MissionCard
