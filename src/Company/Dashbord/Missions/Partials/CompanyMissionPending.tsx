import React, { useState, useEffect } from 'react'
import '../../../../CSS/StudentMissionPending.scss'
import { useTranslation } from 'react-i18next'
import MissionCardPotential from './MissionCardPotential'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

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

  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = data.filter(mission =>
    mission.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='std-mission-pending'>
      <p className='std-mission-pending__mission-status'>
        { t('company.mission.pending.pending_mission', { nbrMission: data.length }) }
      </p>
      { data.length !== 0 &&
        <TextField
          fullWidth
          id="search-bar"
          type="search"
          variant="outlined"
          placeholder="Recherche par titre de la mission"
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{
            width: '50%',
            margin: '20px 0',
            marginTop: 1,
            marginBottom: 1,
            borderRadius: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px'
            }
          }}
        />
      }
      { data.length === 0 && filteredData.length === 0
        ? <p className='std-mission-pending__no-mission'>
            { t('company.mission.pending.no_mission') }
          </p>
        : filteredData.map((item, index) => (
          <MissionCardPotential data={item} key={index} />
        ))
      }
    </div>
  )
}

export default CompanyMissionsPending
