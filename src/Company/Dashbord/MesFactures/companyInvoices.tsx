import React from 'react'
import '../../../CSS/CompanyDashboard.scss'
import HotbarDashboard from '../../Partials/HotbarDashboard'
import SidebarDashboard from '../../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import CompanyInvoicesContent from './Partials/companyInvoicesContent'

function CompanyInvoices (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()
  return (
    <div className="std-bord-container">
      <HotbarDashboard> {t('company.dashboard.invoices')} </HotbarDashboard>
      <div className="std-bord-container__page">
        <SidebarDashboard state={state.FACTURES} />
        <div className="std-bord-container__content">
          <CompanyInvoicesContent />
        </div>
      </div>
    </div>
  )
}

export default CompanyInvoices
