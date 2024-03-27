import React from 'react'
import '../../CSS/AdminDashboard.scss'
import { useTranslation } from 'react-i18next'
import { AdminDashboardState } from '../../Enum'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import AdminArchivesContent from './Partial/adminArchivesContent'

function AdminArchives (): JSX.Element {
  const state = AdminDashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('admin.dashboard.archives') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.ARCHIVES} />
        <div className="std-bord-container__content">
          <AdminArchivesContent />
        </div>
      </div>
    </div>
  )
}

export default AdminArchives