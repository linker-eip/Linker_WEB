/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Dashbord/Partials/HotbarDashboard'
import SidebarDashboard from '../Dashbord/Partials/SidebarDashboard'
import { DashboardState } from '../../Enum'
import { useTranslation } from 'react-i18next'

function StudentDetailedMission (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.mission') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        <div className='std-bord-container__content'>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailedMission
