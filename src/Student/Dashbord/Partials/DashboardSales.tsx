import React, { useState } from 'react'
import '../../../CSS/StudentDashboardContent.scss'
import { useTranslation } from 'react-i18next'

function DashboardSales (): JSX.Element {
  const { t } = useTranslation()
  const [salesData] = useState<{ ca: number, nbrMission: number }>({ ca: 880, nbrMission: 2 })
  return (
    <div className='std-dashboard-ca'>
      <h2 className='std-dashboard-card__title'> { t('student.dashboard.card.sales.title') } </h2>
      <div className='std-dashboard-ca__container'>
        <div className='std-dashboard-ca__section'>
          <div className='std-dashboard-ca__content'>
            <img className='std-dashboard-ca__logo' src='/assets/wallet.svg' />
            <div className='std-dashboard-ca__sub-section'>
              <p className='std-dashboard-ca__text-1'> {t('student.dashboard.card.sales.sales')} </p>
              <p> { salesData.ca } € </p>
            </div>
          </div>
          <div className='std-dashboard-ca__content'>
            <img className='std-dashboard-ca__logo' src='/assets/validate.svg' />
            <div className='std-dashboard-ca__sub-section'>
              <p className='std-dashboard-ca__text-1'> {t('student.dashboard.card.sales.finished_missions')} </p>
              <p> { salesData.nbrMission } </p>
            </div>
          </div>
          <p className='std-dashboard-ca__link'> {t('student.dashboard.card.sales.see_all')} </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardSales
