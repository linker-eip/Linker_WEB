import React from 'react'
import '../../../CSS/CompanyDashboard.scss'
import HotbarDashboard from '../../Partials/HotbarDashboard'
import SidebarDashboard from '../../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import CompanyMailboxContent from './Partials/companyMailboxContent'

function CompanyMailbox (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()

  return (
    <div className="std-bord-container">
      <HotbarDashboard> {t('student.dashboard.mailbox')} </HotbarDashboard>
      <div className="std-bord-container__page">
        <SidebarDashboard state={state.MAILBOX} />
        <div className="std-bord-container__content">
          <CompanyMailboxContent />
        </div>
      </div>
    </div>
  )
}

export default CompanyMailbox
