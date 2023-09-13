import React, { useState } from 'react'
import '../../../../CSS/StudentMissionCancelled.scss'
import { useTranslation } from 'react-i18next'

function StudentMissionsCancelled (): JSX.Element {
  const [nbrMission] = useState(0)
  const { t } = useTranslation()

  return (
    <div className='std-mission-cancelled'>
      <p className='std-mission-cancelled__mission-status'> { t('student.mission.cancelled.cancelled_mission', { nbrMission }) } </p>
      { nbrMission === 0
        ? <p className='std-mission-cancelled__no-mission'> { t('student.mission.cancelled.no_mission') } </p>
        : <div></div>
      }
    </div>
  )
}

export default StudentMissionsCancelled
