import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Icons.
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

// Styles.
import '../../CSS/StudentDashboardContent.scss'

enum DocumentStatus {
  NOT_FILLED,
  PENDING,
  VALIDATED,
  DENIED
}

interface ShowIconProps {
  status: DocumentStatus
}

function ShowIcon ({ status }: ShowIconProps): JSX.Element {
  switch (status) {
    case DocumentStatus.NOT_FILLED:
      return <HelpOutlineOutlinedIcon className='std-dashboard-card__notfilled' />
    case DocumentStatus.PENDING:
      return <PendingOutlinedIcon className='std-dashboard-card__pending' />
    case DocumentStatus.VALIDATED:
      return <CheckCircleOutlineIcon className='std-dashboard-card__validated' />
    case DocumentStatus.DENIED:
    default:
      return <CloseOutlinedIcon className='std-dashboard-card__denied' />
  }
}

function DashboardStatusCard (): JSX.Element {
  const [cniStatus, setCniStatus] = useState(DocumentStatus.NOT_FILLED)
  const [kbisStatus, setKbisStatus] = useState(DocumentStatus.NOT_FILLED)
  const [siretStatus, setSiretStatus] = useState(DocumentStatus.NOT_FILLED)

  const cycleStatus = (currentStatus: DocumentStatus): DocumentStatus => {
    switch (currentStatus) {
      case DocumentStatus.NOT_FILLED:
        return DocumentStatus.PENDING
      case DocumentStatus.PENDING:
        return DocumentStatus.VALIDATED
      case DocumentStatus.VALIDATED:
        return DocumentStatus.DENIED
      case DocumentStatus.DENIED:
      default:
        return DocumentStatus.NOT_FILLED
    }
  }

  const { t } = useTranslation()
  return (
    <div className='std-dashboard-card'>
      <h2 className='std-dashboard-card__title'> {t('student.dashboard.card.status.title')} </h2>
      <p className='std-dashboard-card__content'> {t('company.dashboard.card.status.content')} </p>
      <div className='std-dashboard-card__object'>
        <p className='std-dashboard-card__file' onClick={() => { setCniStatus(cycleStatus(cniStatus)) }}>
          <ShowIcon status={cniStatus} /> {t('company.dashboard.card.status.cni')}
        </p>
        <p className='std-dashboard-card__file' onClick={() => { setKbisStatus(cycleStatus(kbisStatus)) }}>
          <ShowIcon status={kbisStatus} /> {t('company.dashboard.card.status.kbis')}
        </p>
        <p className='std-dashboard-card__file' onClick={() => { setSiretStatus(cycleStatus(siretStatus)) }}>
          <ShowIcon status={siretStatus} /> {t('company.dashboard.card.status.siret')}
        </p>
      </div>
    </div>
  )
}

export default DashboardStatusCard
