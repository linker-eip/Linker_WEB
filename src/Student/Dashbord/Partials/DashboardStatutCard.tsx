import React, { useState } from 'react'
import '../../../CSS/StudentDashboardContent.scss'
import { useTranslation } from 'react-i18next'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

enum state {
  NOT_FILLED,
  PENDING,
  VALIDATED,
  DENIED
}

interface Props {
  status: state
}

function ShowIcon ({ status }: Props): JSX.Element {
  if (status === state.NOT_FILLED) {
    return (
      <HelpOutlineOutlinedIcon className='std-dashboard-card__notfilled' />
    )
  } else if (status === state.PENDING) {
    return (
      <PendingOutlinedIcon className='std-dashboard-card__pending' />
    )
  } else if (status === state.VALIDATED) {
    return (
      <CheckCircleOutlineIcon className='std-dashboard-card__validated' />
    )
  } else {
    return (
      <CloseOutlinedIcon className='std-dashboard-card__denied' />
    )
  }
}

function DashboardStatutCard (): JSX.Element {
  const [statusState, setStatusState] = useState(state.NOT_FILLED)
  const [cniState, setCniState] = useState(state.NOT_FILLED)
  const [ribState, setRibState] = useState(state.NOT_FILLED)

  const changeStatusState = (): void => {
    switch (statusState) {
      case state.NOT_FILLED:
        setStatusState(state.PENDING)
        break
      case state.PENDING:
        setStatusState(state.VALIDATED)
        break
      case state.VALIDATED:
        setStatusState(state.DENIED)
        break
      case state.DENIED:
        setStatusState(state.NOT_FILLED)
        break
      default:
        break
    }
  }

  const changeCniState = (): void => {
    switch (cniState) {
      case state.NOT_FILLED:
        setCniState(state.PENDING)
        break
      case state.PENDING:
        setCniState(state.VALIDATED)
        break
      case state.VALIDATED:
        setCniState(state.DENIED)
        break
      case state.DENIED:
        setCniState(state.NOT_FILLED)
        break
      default:
        break
    }
  }

  const changeRibState = (): void => {
    switch (ribState) {
      case state.NOT_FILLED:
        setRibState(state.PENDING)
        break
      case state.PENDING:
        setRibState(state.VALIDATED)
        break
      case state.VALIDATED:
        setRibState(state.DENIED)
        break
      case state.DENIED:
        setRibState(state.NOT_FILLED)
        break
      default:
        break
    }
  }

  const { t } = useTranslation()
  return (
    <div className='std-dashboard-card'>
        <h2 className='std-dashboard-card__title'> { t('student.dashboard.card.status.title') } </h2>
        <p className='std-dashboard-card__content'> { t('student.dashboard.card.status.content') } </p>
        <div className='std-dashboard-card__object'>
          <p className='std-dashboard-card__file' onClick={changeStatusState}> <ShowIcon status={statusState} /> { t('student.dashboard.card.status.statut') } </p>
          <p className='std-dashboard-card__file' onClick={changeCniState}> <ShowIcon status={cniState} /> { t('student.dashboard.card.status.cni') } </p>
          <p className='std-dashboard-card__file' onClick={changeRibState}> <ShowIcon status={ribState} /> { t('student.dashboard.card.status.rib') } </p>
        </div>
    </div>
  )
}

export default DashboardStatutCard
