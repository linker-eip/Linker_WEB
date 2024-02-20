import React, { useState } from 'react'
import '../../../../CSS/StudentMissionCompleted.scss'
import { useTranslation } from 'react-i18next'
import MissionCard2 from './MissionCard2'

function StudentMissionsPotential (): JSX.Element {
  const { t } = useTranslation()
  const [data, setData] = useState<Array<{ logo: string, title: string, motant: number, end: string, bill: string, participants: number }>>([
    { logo: '/assets/anonymLogo.jpg', title: 'Mission de test.', motant: 9000, end: '23/02/2024', bill: '', participants: 2 }
  ])
  const [nbrMission, setNbrMission] = useState(data.length)

  // const getNbrMission = (): number => {
  //   return data.length
  // }

  const handleRemoveCard = (index: number): void => {
    const newArray = [...data.slice(0, index), ...data.slice(index + 1)]
    setData(newArray)
    setNbrMission(newArray.length)
  }

  return (
    <div className='std-mission-completed'>
      <p className='std-mission-completed__mission-status'> Mission potentielle (1) </p>
      { nbrMission === 0
        ? <p className='std-mission-completed__no-mission'> { t('student.mission.completed.no_mission') } </p>
        : data.map((item, index) => (
          <MissionCard2 data={item} key={index} potential onCallback={() => {
            handleRemoveCard(index)
          }} />
        ))
      }
    </div>
  )
}

export default StudentMissionsPotential
