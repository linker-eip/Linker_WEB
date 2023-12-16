import React, { useState } from 'react'
import '../../CSS/Sidebar.scss'
import { useTranslation } from 'react-i18next'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined'
import { DashboardState } from '../../Enum'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../Router/routes'

interface Props {
  state: DashboardState
}

const SidebarItem = ({
  currentState,
  itemState,
  icon: Icon,
  label,
  onClick
}: {
  currentState: DashboardState
  itemState: DashboardState
  icon: any
  label: string
  onClick: (state: DashboardState) => void
}): JSX.Element => {
  const className = currentState === itemState ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'
  return (
    <p className={className} onClick={() => { onClick(itemState) }}>
      <Icon />
      {label}
    </p>
  )
}

function SidebarDashboard ({ state }: Props): JSX.Element {
  const { t } = useTranslation()
  const [stateDashboard, setStateDashboard] = useState(state)
  const navigate = useNavigate()

  const changeState = (newState: DashboardState): void => {
    setStateDashboard(newState)
    switch (newState) {
      case DashboardState.DASHBOARD:
        navigate(ROUTES.COMPANY_DASHBOARD)
        break
      case DashboardState.MISSION:
        navigate(ROUTES.COMPANY_MISSIONS)
        break
      case DashboardState.FACTURES:
        navigate(ROUTES.COMPANY_INVOICES_DASHBOARD)
        break
      case DashboardState.PROFIL:
        // TODO: Navigate to the PROFIL route.
        break
      case DashboardState.DOCUMENTS:
        navigate(ROUTES.COMPANY_DOCUMENTS_DASHBOARD)
        break
      default:
        break
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__text">
        <SidebarItem
          currentState={stateDashboard}
          itemState={DashboardState.DASHBOARD}
          icon={DashboardOutlinedIcon}
          label={t('student.dashboard.home')}
          onClick={changeState}
        />
        <SidebarItem
          currentState={stateDashboard}
          itemState={DashboardState.MISSION}
          icon={RoomOutlinedIcon}
          label={t('student.dashboard.mission')}
          onClick={changeState}
        />
        <SidebarItem
          currentState={stateDashboard}
          itemState={DashboardState.FACTURES}
          icon={RequestPageOutlinedIcon}
          label={t('student.dashboard.facture')}
          onClick={changeState}
        />
        <SidebarItem
          currentState={stateDashboard}
          itemState={DashboardState.PROFIL}
          icon={PersonOutlineOutlinedIcon}
          label={t('student.dashboard.profil')}
          onClick={changeState}
        />
        <SidebarItem
          currentState={stateDashboard}
          itemState={DashboardState.DOCUMENTS}
          icon={TopicOutlinedIcon}
          label={t('student.dashboard.doc')}
          onClick={changeState}
        />
      </div>
    </div>
  )
}

export default SidebarDashboard
