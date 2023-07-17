import React from 'react'
import '../../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import isPrivateRoute from '../../../Component/isPrivateRoute'
import StudentProfileContent from './partials/StudentProfileContent'

function StudentProfile (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.profil') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.PROFIL} />
        <div className='std-bord-container__content'>
          <StudentProfileContent />
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
