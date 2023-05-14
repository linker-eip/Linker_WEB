import React from 'react'
import '../../CSS/StudentDashboardContent.scss'
import DashboardStatutCard from './Partials/DashboardStatutCard'
import DashboardFAQCard from './Partials/DashboardFAQCard'
import DashboardFreelanceCard from './Partials/DashboardFreelanceCard'

function DashboardContent (): JSX.Element {
  return (
    <div className='std-dashboard-content'>
        <DashboardStatutCard />
        <DashboardFAQCard />
        <DashboardFreelanceCard />
    </div>
  )
}

export default DashboardContent
