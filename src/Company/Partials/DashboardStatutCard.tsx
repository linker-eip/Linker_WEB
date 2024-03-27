import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Routes.
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../Router/routes'

// Enum.
import { DocumentStatus } from '../../Enum'

// API.
import ProfileApi from '../../API/ProfileApi'
import type { CompanyDocumentStatusInfo } from '../../Typage/ProfileType'

// Icons.
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

// Styles.
import '../../CSS/StudentDashboardContent.scss'

interface ShowIconProps {
  status: DocumentStatus
}

function ShowIcon ({ status }: ShowIconProps): JSX.Element {
  switch (status) {
    case DocumentStatus.NOT_FILLED:
      return <HelpOutlineOutlinedIcon className='std-dashboard-card__notfilled' />
    case DocumentStatus.PENDING:
      return <PendingOutlinedIcon className='std-dashboard-card__pending' />
    case DocumentStatus.VERIFIED:
      return <CheckCircleOutlineIcon className='std-dashboard-card__validated' />
    case DocumentStatus.DENIED:
      return <CloseOutlinedIcon className='std-dashboard-card__denied' />
    default:
      return <HelpOutlineOutlinedIcon className='std-dashboard-card__notfilled' />
  }
}

function DashboardStatusCard (): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [cniStatus, setCniStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [kbisStatus, setKbisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const companyDocumentStatus: CompanyDocumentStatusInfo[] = await ProfileApi.getCompanyDocumentStatus(localStorage.getItem('jwtToken') as string)

      companyDocumentStatus.forEach((doc) => {
        switch (doc.documentType) {
          case 'CNI':
            setCniStatus(doc.status)
            break
          case 'KBIS':
            setKbisStatus(doc.status)
            break
          default:
            break
        }
      })
    }
    fetchData()
  }, [])

  const handleNavigation = (): void => {
    navigate(ROUTES.COMPANY_DOCUMENTS_DASHBOARD)
  }

  return (
    <div className='std-dashboard-card'>
      <h2 className='std-dashboard-card__title std-dashboard-card__cursor' onClick={handleNavigation}>
        {t('student.dashboard.card.status.title')}
      </h2>
      <p className='std-dashboard-card__content std-dashboard-card__cursor' onClick={handleNavigation}>
        {t('company.dashboard.card.status.content')}
      </p>
      <div className='std-dashboard-card__object'>
        <p className='std-dashboard-card__file'>
          <ShowIcon status={cniStatus} /> {t('company.dashboard.card.status.cni')}
        </p>
        <p className='std-dashboard-card__file'>
          <ShowIcon status={kbisStatus} /> {t('company.dashboard.card.status.kbis')}
        </p>
      </div>
    </div>
  )
}

export default DashboardStatusCard
