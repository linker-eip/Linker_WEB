import React from 'react'
import '../../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import StudentPaymentsContent from './Partials/studentPaymentsContent'

function StudentPayments (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()

  return (
    <div className="std-bord-container">
      <HotbarDashboard> {t('student.dashboard.paiements')} </HotbarDashboard>
      <div className="std-bord-container__page">
        <SidebarDashboard state={state.PAIEMENTS} />
        <div className="std-bord-container__content">
          <StudentPaymentsContent />
        </div>
      </div>
    </div>
  )
}

export default StudentPayments
