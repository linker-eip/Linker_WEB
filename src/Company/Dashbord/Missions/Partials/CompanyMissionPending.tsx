import React, { useState, useEffect } from 'react'
import '../../../../CSS/StudentMissionPending.scss'
import { useTranslation } from 'react-i18next'
import MissionCardPotential from './MissionCardPotential'

interface MissionPendingItems {
  id: number
  name: string
  status: string
  description: string
  companyId: number
  startOfMission: Date
  endOfMission: Date
  amount: number
  skills: string
}

function CompanyMissionsPending (): JSX.Element {
  const { t } = useTranslation()

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/mission', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const pendingMissions = data.filter((item: any) => item.status === 'IN_PROGRESS').map((item: any) => ({
          id: item.id,
          name: item.name,
          status: item.status,
          description: item.description,
          companyId: item.companyId,
          startOfMission: item.startOfMission,
          endOfMission: item.endOfMission,
          amount: item.amount,
          skills: item.skills
        }))
        setData(pendingMissions)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const [data, setData] = useState<MissionPendingItems[]>([])

  return (
    <div className='std-mission-pending'>
      <p className='std-mission-pending__mission-status'>
        { t('company.mission.pending.pending_mission', { nbrMission: data.length }) }
      </p>
      { data.length === 0
        ? <p className='std-mission-pending__no-mission'>
            { t('company.mission.pending.no_mission') }
          </p>
        : data.map((item, index) => (
          <MissionCardPotential data={item} key={index} />
        ))
      }
    </div>
  )
}

export default CompanyMissionsPending
