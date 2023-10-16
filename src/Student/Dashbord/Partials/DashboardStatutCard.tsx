import React, { useState } from 'react'
import '../../../CSS/StudentDashboardContent.scss'
import { useTranslation } from 'react-i18next'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../Router/routes'

enum StatusState {
  NOT_FILLED,
  PENDING,
  VALIDATED,
  DENIED,
}

interface Props {
  status: StatusState
}

const iconMap = {
  [StatusState.NOT_FILLED]: <HelpOutlineOutlinedIcon className='std-dashboard-card__notfilled' />,
  [StatusState.PENDING]: <PendingOutlinedIcon className='std-dashboard-card__pending' />,
  [StatusState.VALIDATED]: <CheckCircleOutlineIcon className='std-dashboard-card__validated' />,
  [StatusState.DENIED]: <CloseOutlinedIcon className='std-dashboard-card__denied' />
}

const ShowIcon = ({ status }: Props): JSX.Element => {
  return iconMap[status]
}

function DashboardStatutCard (): JSX.Element {
  const [statusState, setStatusState] = useState(StatusState.NOT_FILLED)
  const [cniState, setCniState] = useState(StatusState.NOT_FILLED)
  const [ribState, setRibState] = useState(StatusState.NOT_FILLED)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const nextState = (currentState: StatusState): StatusState => {
    switch (currentState) {
      case StatusState.NOT_FILLED:
        return StatusState.PENDING
      case StatusState.PENDING:
        return StatusState.VALIDATED
      case StatusState.VALIDATED:
        return StatusState.DENIED
      case StatusState.DENIED:
        return StatusState.NOT_FILLED
      default:
        return currentState
    }
  }

  const handleNavigation = (): void => {
    navigate(ROUTES.STUDENT_DOCUMENTS_DASHBOARD)
  }

  return (
    <div className='std-dashboard-card'>
      <h2 className='std-dashboard-card__title std-dashboard-card__cursor' onClick={handleNavigation}>
        {t('student.dashboard.card.status.title')}
      </h2>
      <p className='std-dashboard-card__content std-dashboard-card__cursor' onClick={handleNavigation}>
        {t('student.dashboard.card.status.content')}
      </p>
      <div className='std-dashboard-card__object std-dashboard-card__cursor'>
        <p className='std-dashboard-card__file' onClick={() => { setStatusState(nextState(statusState)) }}>
          <ShowIcon status={statusState} /> {t('student.dashboard.card.status.statut')}
        </p>
        <p className='std-dashboard-card__file' onClick={() => { setCniState(nextState(cniState)) }}>
          <ShowIcon status={cniState} /> {t('student.dashboard.card.status.cni')}
        </p>
        <p className='std-dashboard-card__file' onClick={() => { setRibState(nextState(ribState)) }}>
          <ShowIcon status={ribState} /> {t('student.dashboard.card.status.rib')}
        </p>
      </div>
    </div>
  )
}

export default DashboardStatutCard
