import React, { useState, useEffect } from 'react'
import '../../../../CSS/StudentMissionPending.scss'
import { useTranslation } from 'react-i18next'
import MissionCard from './MissionCard'
import MissionApi from '../../../../API/MissionApi'
import { MissionStatus } from '../../../../Enum'
import type { MissionInfo } from '../../../../Typage/Type'

function StudentMissionsPending (): JSX.Element {
  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await MissionApi.getStudentMissions(localStorage.getItem('jwtToken') as string, MissionStatus.IN_PROGRESS)
      if (response !== undefined) {
        setData(response)
      }
    }
    fetchData()
  }, [])
  const [data, setData] = useState<MissionInfo[]>()
  const [nbrMission] = useState(data?.length ?? 0)
  const { t } = useTranslation()

  return (
    <div className='std-mission-pending'>
      <p className='std-mission-pending__mission-status'> { t('student.mission.pending.pending_mission', { nbrMission }) } </p>
      { nbrMission === 0
        ? <p className='std-mission-pending__no-mission'> { t('student.mission.pending.no_mission') } </p>
        : data?.map((item, index) => (
          <MissionCard data={item} key={index} onCallback={() => {}} />
        ))
      }
    </div>
  )
}

export default StudentMissionsPending
