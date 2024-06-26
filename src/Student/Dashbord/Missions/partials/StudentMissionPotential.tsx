import React, { useState, useEffect } from 'react'
import '../../../../CSS/StudentMissionCompleted.scss'
import { useTranslation } from 'react-i18next'
import MissionCard from './MissionCard'
import MissionApi from '../../../../API/MissionApi'
import type { MissionInfo } from '../../../../Typage/Type'

function StudentMissionsPotential (): JSX.Element {
  const { t } = useTranslation()
  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await MissionApi.getPotentialStudentMissions(localStorage.getItem('jwtToken') as string)
      if (response !== undefined) {
        setData(response)
        setNbrMission(response.length)
      }
    }
    fetchData()
  }, [])
  const [data, setData] = useState<MissionInfo[]>()
  const [nbrMission, setNbrMission] = useState(data?.length ?? 0)

  // const getNbrMission = (): number => {
  //   return data.length
  // }

  const handleRemoveCard = (index: number): void => {
    // const newArray = [...data.slice(0, index), ...data.slice(index + 1)]
    // setData(newArray)
    setNbrMission(nbrMission)
  }

  return (
    <div className='std-mission-completed'>
      <p className='std-mission-completed__mission-status'> { t('student.mission.potential.potential_mission', { nbrMission }) } </p>
      { nbrMission === 0
        ? <p className='std-mission-completed__no-mission'> { t('student.mission.potential.no_mission') } </p>
        : data?.map((item, index) => (
          <MissionCard data={item} key={index} potential onCallback={() => {
            handleRemoveCard(index)
          }} />
        ))
      }
    </div>
  )
}

export default StudentMissionsPotential
