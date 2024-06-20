import React, { useState } from 'react'
import '../../CSS/Sidebar.scss'
import { useTranslation } from 'react-i18next'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import PaidIcon from '@mui/icons-material/Paid'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'
import ArchiveIcon from '@mui/icons-material/Archive'
import { AdminDashboardState } from '../../Enum'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../Router/routes'

interface Props {
  state: AdminDashboardState
}

function SidebarDashboard ({ state }: Props): JSX.Element {
  const { t } = useTranslation()
  const [stateDashboard, setState] = useState(state)
  const navigate = useNavigate()

  const changeState = (newState: AdminDashboardState): void => {
    setState(newState)
    setState(newState)
    switch (newState) {
      case AdminDashboardState.DASHBOARD:
        navigate(ROUTES.ADMIN_DASHBOARD)
        break
      case AdminDashboardState.USERS:
        navigate(ROUTES.ADMIN_USERS_DASHBOARD)
        break
      case AdminDashboardState.MISSIONS:
        navigate(ROUTES.ADMIN_MISSIONS_DASHBOARD)
        break
      case AdminDashboardState.PAYMENTS:
        navigate(ROUTES.ADMIN_PAYMENTS)
        break
      case AdminDashboardState.DOCUMENTS:
        navigate(ROUTES.ADMIN_DOCUMENTS_DASHBOARD)
        break
      case AdminDashboardState.VERIFY_COMPANY_DOCUMENTS:
        navigate(ROUTES.ADMIN_VERIFY_COMPANY_DOCUMENTS)
        break
      case AdminDashboardState.VERIFY_STUDENT_DOCUMENTS:
        navigate(ROUTES.ADMIN_VERIFY_STUDENT_DOCUMENTS)
        break
      case AdminDashboardState.CONTACTS:
        navigate(ROUTES.ADMIN_CONTACTS)
        break
      case AdminDashboardState.ARCHIVES:
        navigate(ROUTES.ADMIN_ARCHIVES)
        break
      default:
        break
    }
    if (newState === AdminDashboardState.DOCUMENTS) {
      navigate(ROUTES.ADMIN_DOCUMENTS_DASHBOARD)
    }
  }

  return (
        <div className='sidebar'>
          <div className='sidebar__text'>
            <p className={ stateDashboard === AdminDashboardState.DASHBOARD ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.DASHBOARD) }}>
              <DashboardOutlinedIcon />
              { t('admin.dashboard.homeTitle') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.USERS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.USERS) }}>
              <AccountCircleOutlinedIcon />
              { t('admin.dashboard.utilisateur') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.MISSIONS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.MISSIONS) }}>
              <RoomOutlinedIcon />
              { t('admin.dashboard.mission') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.PAYMENTS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.PAYMENTS) }}>
              <PaidIcon />
              { t('admin.dashboard.payments') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.DOCUMENTS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.DOCUMENTS) }}>
              <TopicOutlinedIcon />
              { t('admin.dashboard.doc') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.VERIFY_COMPANY_DOCUMENTS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.VERIFY_COMPANY_DOCUMENTS) }}>
              <TopicOutlinedIcon />
              { t('admin.dashboard.verifyCompanyDoc') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.VERIFY_STUDENT_DOCUMENTS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.VERIFY_STUDENT_DOCUMENTS) }}>
              <TopicOutlinedIcon />
              { t('admin.dashboard.verifyStudentDoc') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.CONTACTS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.CONTACTS) }}>
              <MarkEmailUnreadIcon />
              { t('admin.dashboard.contacts') }
            </p>
            <p className={ stateDashboard === AdminDashboardState.ARCHIVES ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(AdminDashboardState.ARCHIVES) }}>
              <ArchiveIcon />
              { t('admin.dashboard.archives') }
            </p>
          </div>
        </div>
  )
}

export default SidebarDashboard
