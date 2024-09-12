import React from 'react'
import '../../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import StudentMailboxContent from './Partials/studentMailboxContent'

function StudentMailbox (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()

  return (
    <div className="std-bord-container">
      <HotbarDashboard> {t('student.dashboard.mailbox')} </HotbarDashboard>
      <div className="std-bord-container__page">
        <SidebarDashboard state={state.MAILBOX} />
        <div className="std-bord-container__content">
          <StudentMailboxContent />
        </div>
      </div>
    </div>
  )
}

export default StudentMailbox
