import React from 'react'
import HotbarDashboard from './Partials/HotbarDashboard'
import SidebarDashboard from './Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import '../../CSS/StudentDashboard.scss'
import { DashboardState } from '../../Enum'
import DashboardContent from './DashboardContent'

function StudentDashboard (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.home') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        <div className='std-bord-container__content'>
          <DashboardContent />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
