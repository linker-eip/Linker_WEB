import React, { useState } from 'react'
import '../../../CSS/StudentDashboardContent.scss'
import '../../../CSS/StatisticsSales.scss'
import { useTranslation } from 'react-i18next'
import Graphics from '../../Dashbord/Partials/Graphics'

function StatisticsSales (): JSX.Element {
  const { t } = useTranslation()
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

  return (
    <div className='stats-sales'>
      <h2 className='stats-sales__title'> { t('student.dashboard.card.sales.title') } </h2>
      <div className='stats-sales__container'>
        <div className='stats-sales__section'>
          <div className='stats-sales__content'>
            <img className='stats-sales__logo' src='/assets/wallet.svg' />
            <div className='stats-sales__sub-section'>
              <p className='stats-sales__text-1'> {t('student.dashboard.card.sales.sales')} </p>
              <p> { salesData.ca } € </p>
            </div>
          </div>
          <div className='stats-sales__content'>
            <img className='stats-sales__logo' src='/assets/validate.svg' />
            <div className='stats-sales__sub-section'>
              <p className='stats-sales__text-1'> {t('student.dashboard.card.sales.finished_missions')} </p>
              <p> { salesData.nbrMission } </p>
            </div>
          </div>
        </div>
        <Graphics revenueData={revenueData} />
      </div>
    </div>
  )
}

export default StatisticsSales
