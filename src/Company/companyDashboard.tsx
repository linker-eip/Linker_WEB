import React from 'react'
import { useTranslation } from 'react-i18next'

// Components and Styles.
import HotbarDashboard from './Partials/HotbarDashboard'
import SidebarDashboard from './Partials/SidebarDashboard'
import DashboardContent from './DashboardContent'
import '../CSS/StudentDashboard.scss'
import { DashboardState } from '../Enum'
import isPrivateRoute from '../Component/isPrivateRoute'

function CompanyDashboard (): JSX.Element {
  isPrivateRoute()
  const { t } = useTranslation()

  return (
    <div className='company-bord-container'>
      <HotbarDashboard> { t('student.dashboard.home') } </HotbarDashboard>
      <div className='company-bord-container__page'>
        <SidebarDashboard state={DashboardState.DASHBOARD} />
        <div className='company-bord-container__content'>
          <DashboardContent />
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
