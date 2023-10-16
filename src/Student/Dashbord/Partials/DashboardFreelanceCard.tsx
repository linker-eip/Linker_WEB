import React from 'react'
import '../../../CSS/StudentDashboardContent.scss'
import { useTranslation } from 'react-i18next'
import BaseButton from '../../../Component/BaseButton'

const FREELANCE_GUIDE_URL = 'https://www.legalplace.fr/guides/devenir-freelance/'

function DashboardFreelanceCard (): JSX.Element {
  const { t } = useTranslation()

  const redirectToFreelanceGuide = (): void => {
    window.location.href = FREELANCE_GUIDE_URL
  }

  return (
    <div className='std-dashboard-card'>
      <h2 className='std-dashboard-card__title'>
        {t('student.dashboard.card.freelance.title')}
      </h2>
      <p className='std-dashboard-card__content'>
        🤝 {t('student.dashboard.card.freelance.content')}
      </p>
      <div className='std-dashboard-card__button'>
        <BaseButton onClick={redirectToFreelanceGuide} title={t('student.dashboard.card.freelance.button')} />
      </div>
    </div>
  )
}

export default DashboardFreelanceCard
