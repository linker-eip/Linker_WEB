import React from 'react'
import '../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../Enum'
import CompanyDocumentContent from './Partials/companyDocumentContent'
import isPrivateRoute from '../../Component/isPrivateRoute'

function CompanyDocuments (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.doc') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.DOCUMENTS} />
        <div className='std-bord-container__content'>
          <CompanyDocumentContent />
        </div>
      </div>
    </div>
  )
}

export default CompanyDocuments
