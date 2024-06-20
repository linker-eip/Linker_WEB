import React from 'react'
import '../../CSS/AdminDashboard.scss'
import { useTranslation } from 'react-i18next'
import { AdminDashboardState } from '../../Enum'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import AdminPaymentsContent from './Partial/adminPaymentsContent'

function AdminPayments (): JSX.Element {
  const state = AdminDashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('admin.dashboard.payments') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.PAYMENTS} />
        <div className="std-bord-container__content">
          <AdminPaymentsContent />
        </div>
      </div>
    </div>
  )
}

export default AdminPayments
