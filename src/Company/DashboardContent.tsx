import React from 'react'
import '../CSS/StudentDashboardContent.scss'
import DashboardStatutCard from './Partials/DashboardStatutCard'
import DashboardFAQCard from './Partials/DashboardFAQCard'

function DashboardContent (): JSX.Element {
  return (
    <div className='std-dashboard-content'>
        <DashboardStatutCard />
        <DashboardFAQCard />
    </div>
  )
}

export default DashboardContent
