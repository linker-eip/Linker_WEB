import React from 'react'
import '../../CSS/AdminDashboard.scss'
import { useTranslation } from 'react-i18next'
import { AdminDashboardState } from '../../Enum'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import AdminContactsContent from './Partial/adminContactsContent'

function AdminContacts (): JSX.Element {
  const state = AdminDashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('admin.dashboard.contacts') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.CONTACTS} />
        <div className="std-bord-container__content">
          <AdminContactsContent />
        </div>
      </div>
    </div>
  )
}

export default AdminContacts