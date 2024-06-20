import React from 'react'
import '../../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import StudentNetworkContent from './Partials/studentNetworkContent'

function StudentNetwork (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()

  return (
    <div className="std-bord-container">
      <HotbarDashboard> {t('student.dashboard.network')} </HotbarDashboard>
      <div className="std-bord-container__page">
        <SidebarDashboard state={state.NETWORK} />
        <div className="std-bord-container__content">
          <StudentNetworkContent />
        </div>
      </div>
    </div>
  )
}

export default StudentNetwork
