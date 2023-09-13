import React, { useState } from 'react'
import '../../../../CSS/StudentMissionCompleted.scss'
import { useTranslation } from 'react-i18next'

function StudentMissionsCompleted (): JSX.Element {
  const [nbrMission] = useState(0)
  const { t } = useTranslation()

  return (
    <div className='std-mission-completed'>
      <p className='std-mission-completed__mission-status'> { t('student.mission.completed.completed_mission', { nbrMission }) } </p>
      { nbrMission === 0
        ? <p className='std-mission-completed__no-mission'> { t('student.mission.completed.no_mission') } </p>
        : <div></div>
      }
    </div>
  )
}

export default StudentMissionsCompleted
