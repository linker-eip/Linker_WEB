import React from 'react'
import '../../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import StudentInvoicesContent from './Partials/studentInvoicesContent'

function StudentInvoices (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()
  return (
    <div className="std-bord-container">
      <HotbarDashboard> {t('student.dashboard.invoices')} </HotbarDashboard>
      <div className="std-bord-container__page">
        <SidebarDashboard state={state.FACTURES} />
        <div className="std-bord-container__content">
          <StudentInvoicesContent />
        </div>
      </div>
    </div>
  )
}

export default StudentInvoices
