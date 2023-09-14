import React, { useState } from 'react'
import '../../../../CSS/StudentMissionCancelled.scss'
import { useTranslation } from 'react-i18next'
import MissionCard from './MissionCard'

function StudentMissionsCancelled (): JSX.Element {
  const [data] = useState<Array<{ logo: string, title: string, motant: number, end?: string, begin?: string, bill: string, participants: number, cancelledDate: string }>>([
    { logo: '/assets/anonymLogo.jpg', title: 'Développement d’une application mobile pour une salle de sports', motant: 880.00, cancelledDate: '24/01/2023', bill: 'KP250320231200', participants: 3 },
    { logo: '/assets/anonymLogo.jpg', title: 'Développement d’une application mobile pour une salle de sports', motant: 880.00, cancelledDate: '15/04/2023', bill: 'KP250320231200', participants: 3 },
    { logo: '/assets/anonymLogo.jpg', title: 'Développement d’une application mobile pour une salle de sports', motant: 880.00, cancelledDate: '09/07/2023', bill: 'KP250320231200', participants: 3 },
    { logo: '/assets/anonymLogo.jpg', title: 'Développement d’une application mobile pour une salle de sports', motant: 880.00, cancelledDate: '31/08/2023', bill: 'KP250320231200', participants: 3 }
  ])
  const [nbrMission] = useState(data.length)
  const { t } = useTranslation()

  return (
    <div className='std-mission-cancelled'>
      <p className='std-mission-cancelled__mission-status'> { t('student.mission.cancelled.cancelled_mission', { nbrMission }) } </p>
      { nbrMission === 0
        ? <p className='std-mission-cancelled__no-mission'> { t('student.mission.cancelled.no_mission') } </p>
        : data.map((item, index) => (
          <MissionCard data={item} key={index} cancelled />
        ))
      }
    </div>
  )
}

export default StudentMissionsCancelled
