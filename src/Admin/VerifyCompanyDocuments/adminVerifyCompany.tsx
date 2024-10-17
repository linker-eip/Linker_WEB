import React from 'react'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import '../../CSS/AdminDashboard.scss'
import { AdminDashboardState } from '../../Enum'
import AdminVerifyCompanyContent from './Partial/adminVerifyCompanyContent'
import isPrivateRoute from '../../Component/isPrivateRoute'

function AdminVerifyCompany (): JSX.Element {
  isPrivateRoute({ admin: true })
  const state = AdminDashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('admin.dashboard.verifyCompanyDoc') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.VERIFY_COMPANY_DOCUMENTS} />
        <div className="std-bord-container__content">
          <AdminVerifyCompanyContent />
        </div>
      </div>
    </div>
  )
}

export default AdminVerifyCompany
