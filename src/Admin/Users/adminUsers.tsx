import React from 'react'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import '../../CSS/AdminDashboard.scss'
import { AdminDashboardState } from '../../Enum'
import AdminUsersContent from './Partials/adminUsersContent'
import isPrivateRoute from '../../Component/isPrivateRoute'

function AdminUsers (): JSX.Element {
  isPrivateRoute({ admin: true })
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
