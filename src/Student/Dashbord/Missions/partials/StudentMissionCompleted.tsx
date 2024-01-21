import React, { useState, useEffect } from 'react'
import '../../../../CSS/StudentMissionCompleted.scss'
import { useTranslation } from 'react-i18next'
import MissionCard from './MissionCard'
import MissionApi from '../../../../API/MissionApi'
import { MissionStatus } from '../../../../Enum'
import type { MissionInfo } from '../../../../Typage/Type'

function StudentMissionsCompleted (): JSX.Element {
  const { t } = useTranslation()
  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await MissionApi.getStudentMissions(localStorage.getItem('jwtToken') as string, MissionStatus.FINISHED)
      if (response !== undefined) {
        setData(response)
        setNbrMission(response.length)
      }
    }
    fetchData()
  }, [])
  const [data, setData] = useState<MissionInfo[]>()
  const [nbrMission, setNbrMission] = useState(data?.length ?? 0)

  return (
    <div className='std-mission-completed'>
      <p className='std-mission-completed__mission-status'> { t('student.mission.completed.completed_mission', { nbrMission }) } </p>
      { nbrMission === 0
        ? <p className='std-mission-completed__no-mission'> { t('student.mission.completed.no_mission') } </p>
        : data?.map((item, index) => (
          <MissionCard data={item} key={index} onCallback={() => {}}/>
        ))
      }
    </div>
  )
}

export default StudentMissionsCompleted
