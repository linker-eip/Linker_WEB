import React from 'react'
import '../../CSS/StudentDashboardContent.scss'
import DashboardStatutCard from './Partials/DashboardStatutCard'
import DashboardFAQCard from './Partials/DashboardFAQCard'
import DashboardFreelanceCard from './Partials/DashboardFreelanceCard'
import DashboardSales from './Partials/DashboardSales'

function DashboardContent (): JSX.Element {
  return (
    <div className='std-dashboard-content'>
      <DashboardStatutCard />
      <DashboardFAQCard />
      <DashboardFreelanceCard />
      <DashboardSales />
    </div>
  )
}

export default DashboardContent
