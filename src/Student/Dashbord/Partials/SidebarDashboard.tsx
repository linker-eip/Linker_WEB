import React from 'react'
import '../../../CSS/Sidebar.scss'
import { useTranslation } from 'react-i18next'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined'
import GroupsIcon from '@mui/icons-material/Groups'
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
      <div className='sidebar__text'>
        <SidebarItem icon={<DashboardOutlinedIcon />} labelKey='student.dashboard.home' dashboardState={DashboardState.DASHBOARD} />
        <SidebarItem icon={<RoomOutlinedIcon />} labelKey='student.dashboard.mission' dashboardState={DashboardState.MISSION} />
        <SidebarItem icon={<RequestPageOutlinedIcon />} labelKey='student.dashboard.facture' dashboardState={DashboardState.FACTURES} />
        <SidebarItem icon={<PersonOutlineOutlinedIcon />} labelKey='student.dashboard.profil' dashboardState={DashboardState.PROFIL} />
        <SidebarItem icon={<TopicOutlinedIcon />} labelKey='student.dashboard.doc' dashboardState={DashboardState.DOCUMENTS} />
        <SidebarItem icon={<GroupsIcon />} labelKey='student.dashboard.group' dashboardState={DashboardState.GROUP} />
      </div>
    </div>
  )
}

export default SidebarDashboard
