import React from 'react'
import { useTranslation } from 'react-i18next'

// Components and Styles.
import '../../../CSS/CompanyDashboard.scss'
import { DashboardState } from '../../../Enum'
import HotbarDashboard from '../../Partials/HotbarDashboard'
import SidebarDashboard from '../../Partials/SidebarDashboard'
import CompanyInvoicesContent from './Partials/companyInvoicesContent'

function CompanyInvoices (): JSX.Element {
  const state = DashboardState
  const { t } = useTranslation()

  return (
    <div className="company-bord-container">
      <HotbarDashboard> {t('company.dashboard.invoices')} </HotbarDashboard>
      <div className="company-bord-container__page">
        <SidebarDashboard state={state.FACTURES} />
        <div className="company-bord-container__content">
          <CompanyInvoicesContent />
        </div>
      </div>
    </div>
  )
}

export default CompanyInvoices
