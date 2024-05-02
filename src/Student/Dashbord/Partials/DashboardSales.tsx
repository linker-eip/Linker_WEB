/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Graphics from './Graphics'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProfileApi from '../../../API/ProfileApi'
import * as ROUTES from '../../../Router/routes'
import '../../../CSS/StudentDashboardContent.scss'
import type { StudentStatisticsResponse, Income } from '../../../Typage/ProfileType'

function DashboardSales (): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleNavigation = (): void => {
    navigate(ROUTES.STUDENT_STATISTICS)
  }

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
    <div className='std-dashboard-ca'>
      <h2 className='std-dashboard-card__title'> { t('student.dashboard.card.sales.title') } </h2>
      <div className='std-dashboard-ca__container'>
        <div className='std-dashboard-ca__section'>
          <div className='std-dashboard-ca__content'>
            <img className='std-dashboard-ca__logo' src='/assets/wallet.svg' />
            <div className='std-dashboard-ca__sub-section'>
              <p className='std-dashboard-ca__text-1'> {t('student.dashboard.card.sales.sales')} </p>
              <p> { statistics?.incomes?.reduce((acc, income) => acc + income.amount, 0) } € </p>
            </div>
          </div>
          <div className='std-dashboard-ca__content'>
            <img className='std-dashboard-ca__logo' src='/assets/validate.svg' />
            <div className='std-dashboard-ca__sub-section'>
              <p className='std-dashboard-ca__text-1'> {t('student.dashboard.card.sales.finished_missions')} </p>
              <p> { statistics?.incomes?.length } </p>
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
