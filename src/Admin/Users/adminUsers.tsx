import React from 'react'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import '../../CSS/AdminDashboard.scss'
import { AdminDashboardState } from '../../Enum'
import AdminUsersContent from './Partials/adminUsersContent'

function AdminUsers (): JSX.Element {
  const state = AdminDashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('admin.dashboard.utilisateur') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.USERS} />
        <div className="std-bord-container__content">
          <AdminUsersContent />
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
