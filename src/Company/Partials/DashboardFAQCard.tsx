import React from 'react'
import '../../CSS/StudentDashboardContent.scss'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'

function DashboardFAQCard (): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className='std-dashboard-card'>
        <h2 className='std-dashboard-card__title'> { t('student.dashboard.card.faq.title') } </h2>
        <ReactPlayer url="https://www.youtube.com/watch?v=04OyFzr9NU0" controls={true} width="100%" height="auto"/>
        <p className='std-dashboard-card__content'> { t('student.dashboard.card.faq.content') } </p>
    </div>
  )
}

export default DashboardFAQCard
