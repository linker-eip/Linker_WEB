import React from 'react'
import { useTranslation } from 'react-i18next'

// Components and Styles.
import '../../CSS/StudentDashboard.scss'
import { DashboardState } from '../../Enum'
import HotbarDashboard from '../Partials/HotbarDashboard'
import isPrivateRoute from '../../Component/isPrivateRoute'
import SidebarDashboard from '../Partials/SidebarDashboard'
import CompanyDocumentContentV2 from './Partials/companyDocumentContentV2'

function CompanyDocuments (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()

  return (
    <div className='company-bord-container'>
      <HotbarDashboard> { t('student.dashboard.doc') } </HotbarDashboard>
      <div className='company-bord-container__page'>
        <SidebarDashboard state={state.DOCUMENTS} />
        <div className='company-bord-container__content'>
          <CompanyDocumentContentV2 />
        </div>
      </div>
    </div>
  )
}

export default CompanyDocuments
