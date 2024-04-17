/* eslint-disable */
import React, { useState, useEffect } from 'react'
import '../../../CSS/StatisticsSales.scss'
import { useTranslation } from 'react-i18next'
import ProfileApi from '../../../API/ProfileApi'
import '../../../CSS/StudentDashboardContent.scss'
import Graphics from '../../Dashbord/Partials/Graphics'
import type { StudentStatisticsResponse, Income } from '../../../Typage/ProfileType'

function StatisticsSales (): JSX.Element {
  const { t } = useTranslation()

  const [statistics, setStatistics] = useState<StudentStatisticsResponse | null>(null)
  
  useEffect(() => {
    const fetchData = async (): Promise<StudentStatisticsResponse> => {
      const studentStatistics = await ProfileApi.getStudentStatistics(localStorage.getItem('jwtToken') as string)
      setStatistics(studentStatistics)
      if (Array.isArray(studentStatistics.incomes) && studentStatistics.incomes.length > 0) {
        updateRevenueData(studentStatistics.incomes)
      }
      return studentStatistics
    }
    fetchData()
  }, [])

  const [revenueData, setRevenueData] = useState({
    labels: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    datasets: [
      {
        label: 'Chiffre d\'affaires',
        data: Array(12).fill(0),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }
    ]
  })

  const updateRevenueData = (incomes: Income[]): void => {
    const newRevenueData = revenueData.datasets[0].data.slice()
    incomes.forEach((income: Income) => {
      const month = new Date(income.paymentDate).getMonth()
      newRevenueData[month] += income.amount
    })
    setRevenueData(prevState => ({
      ...prevState,
      datasets: [{ ...prevState.datasets[0], data: newRevenueData }]
    }))
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
              <p> { statistics?.incomes?.reduce((acc, income) => acc + income.amount, 0) } € </p>
            </div>
          </div>
          <div className='stats-sales__content'>
            <img className='stats-sales__logo' src='/assets/validate.svg' />
            <div className='stats-sales__sub-section'>
              <p className='stats-sales__text-1'> {t('student.dashboard.card.sales.finished_missions')} </p>
              <p> { statistics?.incomes?.length } </p>
            </div>
          </div>
        </div>
        <Graphics revenueData={revenueData} />
      </div>
    </div>
  )
}

export default StatisticsSales
