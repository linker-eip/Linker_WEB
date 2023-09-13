import React, { useState } from 'react'
import '../../../CSS/Sidebar.scss'
import { useTranslation } from 'react-i18next'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined'
import { DashboardState } from '../../../Enum'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../Router/routes'

interface Props {
  state: DashboardState
}

function SidebarDashboard ({ state }: Props): JSX.Element {
  const { t } = useTranslation()
  const [stateDashboard, setState] = useState(state)
  const navigate = useNavigate()

  const changeState = (newState: DashboardState): void => {
    setState(newState)
    switch (newState) {
      case DashboardState.DOCUMENTS:
        navigate(ROUTES.STUDENT_DOCUMENTS_DASHBOARD)
        break
      case DashboardState.DASHBOARD:
        navigate(ROUTES.STUDENT_DASHBOARD)
        break
      case DashboardState.PROFIL:
        navigate(ROUTES.STUDENT_PROFILE)
        break
      default:
        break
    }
    if (newState === DashboardState.DOCUMENTS) {
      navigate(ROUTES.STUDENT_DOCUMENTS_DASHBOARD)
    }
  }

  return (
        <div className='sidebar'>
          <div className='sidebar__text'>
            <p className={ stateDashboard === DashboardState.DASHBOARD ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(DashboardState.DASHBOARD) }}>
              <DashboardOutlinedIcon />
              { t('student.dashboard.home') }
            </p>
            <p className={ stateDashboard === DashboardState.MISSION ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(DashboardState.MISSION) }}>
              <RoomOutlinedIcon />
              { t('student.dashboard.mission') }
            </p>
            <p className={ stateDashboard === DashboardState.FACTURES ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(DashboardState.FACTURES) }}>
              <RequestPageOutlinedIcon />
              { t('student.dashboard.facture') }
            </p>
            <p className={ stateDashboard === DashboardState.PROFIL ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(DashboardState.PROFIL) }}>
              <PersonOutlineOutlinedIcon />
              { t('student.dashboard.profil') }
            </p>
            <p className={ stateDashboard === DashboardState.DOCUMENTS ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'} onClick={() => { changeState(DashboardState.DOCUMENTS) }}>
              <TopicOutlinedIcon />
              { t('student.dashboard.doc') }
            </p>
          </div>
        </div>
  )
}

export default SidebarDashboard
