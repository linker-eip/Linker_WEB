import React, { useState } from 'react'
import '../../../CSS/StudentDashboardContent.scss'
import { useTranslation } from 'react-i18next'
import Graphics from './Graphics'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../Router/routes'

function DashboardSales (): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [salesData] = useState<{ ca: number, nbrMission: number }>({ ca: 880, nbrMission: 2 })
  const revenueData = {
    labels: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    datasets: [
      {
        label: 'Chiffre d\'affaires',
        data: [0, 0, 0, 0, 0, 0, 440, 440, 440, 440, 880, 880],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }
    ]
  }

  const handleNavigation = (): void => {
    navigate(ROUTES.STUDENT_STATISTICS)
  }

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
          <p onClick={handleNavigation} className='std-dashboard-ca__link'> {t('student.dashboard.card.sales.see_all')} </p>
        </div>
        <Graphics revenueData={revenueData} />
      </div>
    </div>
  )
}

export default DashboardSales
