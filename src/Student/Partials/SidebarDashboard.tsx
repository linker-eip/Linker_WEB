import React from 'react'
import '../../CSS/Sidebar.scss'
import { useTranslation } from 'react-i18next'

function SidebarDashboard (): JSX.Element {
  const { t } = useTranslation()
  return (
        <div className='sidebar'>
          <div className='sidebar__text'>
            <p> { t('student.dashboard.home') } </p>
            <p> { t('student.dashboard.mission') } </p>
            <p> { t('student.dashboard.facture') } </p>
            <p> { t('student.dashboard.profil') } </p>
            <p> { t('student.dashboard.doc') } </p>
          </div>
        </div>
  )
}

export default SidebarDashboard
