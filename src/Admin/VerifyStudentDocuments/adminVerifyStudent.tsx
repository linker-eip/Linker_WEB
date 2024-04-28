import React from 'react'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import '../../CSS/AdminDashboard.scss'
import { AdminDashboardState } from '../../Enum'
import AdminVerifyStudentContent from './Partial/adminVerifyStudentContent'

function AdminVerifyStudent (): JSX.Element {
  const state = AdminDashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('admin.dashboard.verifyStudentDoc') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.VERIFY_STUDENT_DOCUMENTS} />
        <div className="std-bord-container__content">
          <AdminVerifyStudentContent />
        </div>
      </div>
    </div>
  )
}

export default AdminVerifyStudent
