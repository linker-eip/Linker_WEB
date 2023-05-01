import React from 'react'
import HotbarDashboard from './Partials/HotbarDashboard'
import SidebarDashboard from './Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import '../CSS/StudentDashboard.scss'

function StudentDashboard (): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.home') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard></SidebarDashboard>
        <div className='std-bord-container__content'>
          <p> test</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
