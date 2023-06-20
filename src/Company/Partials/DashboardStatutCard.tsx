import React, { useState } from 'react'
import '../../CSS/StudentDashboardContent.scss'
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
  const [cniState, setCniState] = useState(state.NOT_FILLED)
  const [kbisState, setKbisState] = useState(state.NOT_FILLED)
  const [siretState, setSiretState] = useState(state.NOT_FILLED)

  const changeStatusState = (): void => {
    switch (kbisState) {
      case state.NOT_FILLED:
        setKbisState(state.PENDING)
        break
      case state.PENDING:
        setKbisState(state.VALIDATED)
        break
      case state.VALIDATED:
        setKbisState(state.DENIED)
        break
      case state.DENIED:
        setKbisState(state.NOT_FILLED)
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
    switch (siretState) {
      case state.NOT_FILLED:
        setSiretState(state.PENDING)
        break
      case state.PENDING:
        setSiretState(state.VALIDATED)
        break
      case state.VALIDATED:
        setSiretState(state.DENIED)
        break
      case state.DENIED:
        setSiretState(state.NOT_FILLED)
        break
      default:
        break
    }
  }

  const { t } = useTranslation()
  return (
    <div className='std-dashboard-card'>
        <h2 className='std-dashboard-card__title'> { t('student.dashboard.card.status.title') } </h2>
        <p className='std-dashboard-card__content'> { t('company.dashboard.card.status.content') } </p>
        <div className='std-dashboard-card__object'>
          <p className='std-dashboard-card__file' onClick={changeCniState}> <ShowIcon status={cniState} /> { t('company.dashboard.card.status.cni') } </p>
          <p className='std-dashboard-card__file' onClick={changeStatusState}> <ShowIcon status={kbisState} /> { t('company.dashboard.card.status.kbis') } </p>
          <p className='std-dashboard-card__file' onClick={changeRibState}> <ShowIcon status={siretState} /> { t('company.dashboard.card.status.siret') } </p>
        </div>
    </div>
  )
}

export default DashboardStatutCard
