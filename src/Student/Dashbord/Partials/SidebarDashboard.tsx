import React from 'react'
import '../../../CSS/Sidebar.scss'
import { useTranslation } from 'react-i18next'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MessageIcon from '@mui/icons-material/Message'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupsIcon from '@mui/icons-material/Groups'
import PaidIcon from '@mui/icons-material/Paid'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { DashboardState } from '../../../Enum'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../Router/routes'

interface Props {
  state: DashboardState
}

function SidebarDashboard ({ state }: Props): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const changeState = (newState: DashboardState): void => {
    switch (newState) {
      case DashboardState.DOCUMENTS:
        navigate(ROUTES.STUDENT_DOCUMENTS_DASHBOARD)
        break
      case DashboardState.FACTURES:
        navigate(ROUTES.STUDENT_INVOICES_DASHBOARD)
        break
      case DashboardState.PAIEMENTS:
        navigate(ROUTES.STUDENT_PAYMENTS)
        break
      case DashboardState.DASHBOARD:
        navigate(ROUTES.STUDENT_DASHBOARD)
        break
      case DashboardState.PROFIL:
        navigate(ROUTES.STUDENT_PROFILE)
        break
      case DashboardState.MISSION:
        navigate(ROUTES.STUDENT_MISSIONS)
        break
      case DashboardState.GROUP:
        navigate(ROUTES.STUDENT_GROUP)
        break
      case DashboardState.NETWORK:
        navigate(ROUTES.STUDENT_NETWORK)
        break
      case DashboardState.SETTINGS:
        navigate(ROUTES.STUDENT_SETTINGS)
        break
      case DashboardState.MAILBOX:
        navigate(ROUTES.STUDENT_MAILBOX)
        break
      default:
        break
    }
  }

  const getClassName = (currentState: DashboardState): string => {
    return state === currentState ? 'sidebar__icon sidebar__icon--selected' : 'sidebar__icon'
  }

  const SidebarItem = (props: { icon: JSX.Element, labelKey: string, dashboardState: DashboardState }): JSX.Element => {
    return (
      <div className={getClassName(props.dashboardState)} onClick={() => { changeState(props.dashboardState) }}>
        { props.icon }
        {t(props.labelKey)}
      </div>
    )
  }

  return (
    <div className='sidebar'>
      <div className='sidebar__section'>
        <div className='sidebar__text'>
          <SidebarItem icon={<DashboardOutlinedIcon />} labelKey='student.dashboard.home' dashboardState={DashboardState.DASHBOARD} />
          <SidebarItem icon={<MessageIcon />} labelKey='student.dashboard.mailbox' dashboardState={DashboardState.MAILBOX} />
          <SidebarItem icon={<RoomOutlinedIcon />} labelKey='student.dashboard.mission' dashboardState={DashboardState.MISSION} />
          <SidebarItem icon={<ConnectWithoutContactIcon />} labelKey='student.dashboard.network' dashboardState={DashboardState.NETWORK} />
          <SidebarItem icon={<RequestPageOutlinedIcon />} labelKey='student.dashboard.facture' dashboardState={DashboardState.FACTURES} />
          <SidebarItem icon={<PaidIcon />} labelKey='student.dashboard.paiements' dashboardState={DashboardState.PAIEMENTS} />
          <SidebarItem icon={<PersonOutlineOutlinedIcon />} labelKey='student.dashboard.profil' dashboardState={DashboardState.PROFIL} />
          <SidebarItem icon={<TopicOutlinedIcon />} labelKey='student.dashboard.doc' dashboardState={DashboardState.DOCUMENTS} />
          <SidebarItem icon={<GroupsIcon />} labelKey='student.dashboard.group' dashboardState={DashboardState.GROUP} />
          <SidebarItem icon={<SettingsIcon />} labelKey='student.dashboard.settings' dashboardState={DashboardState.SETTINGS} />
        </div>
      </div>
    </div>
  )
}

export default SidebarDashboard
