import React, { useState, useEffect } from 'react'
import '../../../../CSS/StudentMissionCancelled.scss'
import { useTranslation } from 'react-i18next'
import MissionCard from './MissionCard'
import MissionApi from '../../../../API/MissionApi'
import { MissionStatus } from '../../../../Enum'
import type { MissionInfo } from '../../../../Typage/Type'

function StudentMissionsCancelled (): JSX.Element {
  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await MissionApi.getStudentMissions(localStorage.getItem('jwtToken') as string, MissionStatus.CANCELLED)
      if (response !== undefined) {
        setData(response)
        setNbrMission(response.length)
      }
    }
    fetchData()
  }, [])
  const [data, setData] = useState<MissionInfo[]>()
  const [nbrMission, setNbrMission] = useState(data?.length ?? 0)
  const { t } = useTranslation()

  return (
    <div className='std-mission-cancelled'>
      <p className='std-mission-cancelled__mission-status'> { t('student.mission.cancelled.cancelled_mission', { nbrMission }) } </p>
      { nbrMission === 0
        ? <p className='std-mission-cancelled__no-mission'> { t('student.mission.cancelled.no_mission') } </p>
        : data?.map((item, index) => (
          <MissionCard data={item} key={index} cancelled onCallback={() => {}}/>
        ))
      }
    </div>
  )
}

export default StudentMissionsCancelled
