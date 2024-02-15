import React from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/StudentStatistics.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Dashbord/Partials/HotbarDashboard'
import SidebarDashboard from '../Dashbord/Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../Enum'
import StudentProfileContent from '../Dashbord/Profile/partials/StudentProfileContent'
import StatisticsSales from './partials/StatisticsSales'
import MissionStatistics from './partials/MissionStatistics'

function StudentStatistics (): JSX.Element {
  isPrivateRoute()
  const { t } = useTranslation()
  const state = DashboardState

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.stat') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.STATISTICS} />
        <div className='std-bord-container__content'>
          <StudentProfileContent editable={false} />
          <MissionStatistics />
          <div className='std-statistics__container'>
          <StatisticsSales />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentStatistics
