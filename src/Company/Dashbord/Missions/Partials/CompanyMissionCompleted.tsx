import React, { useState } from 'react'
import '../../../../CSS/StudentMissionCompleted.scss'
import { useTranslation } from 'react-i18next'
import MissionCard from './MissionCard'

function CompanyMissionsCompleted (): JSX.Element {
  const { t } = useTranslation()
  const [data] = useState<Array<{ logo: string, title: string, motant: number, end: string, bill: string, participants: number }>>([
    {
      logo: '/assets/anonymLogo.jpg',
      title: 'Développement d’une application mobile pour une salle de sports',
      motant: 880.00,
      end: '15/04/2023',
      bill: 'KP250320231200',
      participants: 3
    },
    {
      logo: '/assets/anonymLogo.jpg',
      title: 'Développement d’une application mobile pour une salle de sports',
      motant: 880.00,
      end: '15/04/2023',
      bill: 'KP250320231200',
      participants: 3
    },
    {
      logo: '/assets/anonymLogo.jpg',
      title: 'Développement d’une application mobile pour une salle de sports',
      motant: 880.00,
      end: '15/04/2023',
      bill: 'KP250320231200',
      participants: 3
    },
    {
      logo: '/assets/anonymLogo.jpg',
      title: 'Développement d’une application mobile pour une salle de sports',
      motant: 880.00,
      end: '15/04/2023',
      bill: 'KP250320231200',
      participants: 3
    }
  ])
  const [nbrMission] = useState(data.length)

  return (
    <div className='std-mission-completed'>
      <p className='std-mission-completed__mission-status'>
        { t('company.mission.completed.completed_mission', { nbrMission }) }
      </p>
      { nbrMission === 0
        ? <p className='std-mission-completed__no-mission'>
            { t('company.mission.completed.no_mission') }
          </p>
        : data.map((item, index) => (
          <MissionCard data={item} key={index} />
        ))
      }
    </div>
  )
}

export default CompanyMissionsCompleted
