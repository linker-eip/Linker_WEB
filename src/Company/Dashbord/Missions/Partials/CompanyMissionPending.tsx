import React, { useState } from 'react'
import '../../../../CSS/StudentMissionPending.scss'
import { useTranslation } from 'react-i18next'
import MissionCard from './MissionCard'
// import EditIcon from '@mui/icons-material/Edit'
// import CloseIcon from '@mui/icons-material/Close'
// import Modal from '@mui/material/Modal'
// import { TextField } from '@mui/material'
// import BaseButton from '../../../../Component/BaseButton'
// import ProfileApi from '../../../../API/ProfileApi'
// import type { Profile } from '../../../../Typage/ProfileType'

function CompanyMissionsPending (): JSX.Element {
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  //   async function fetchData () {
  //     try {
  //       const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
  //       setProfileData(data)
  //     } catch (error) {
  //       console.error('Error fetching profile data:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  const [data] = useState<Array<{ logo: string, title: string, motant: number, begin?: string, end: string, bill: string, participants: number }>>([
    {
      logo: '/assets/anonymLogo.jpg',
      title: 'Développement d’une application mobile pour une salle de sports',
      motant: 880.00,
      begin: '25/03/2023',
      end: '15/04/2023',
      bill: 'KP250320231200',
      participants: 3
    },
    {
      logo: '/assets/anonymLogo.jpg',
      title: 'Développement d’une application mobile pour une salle de sports',
      motant: 880.00,
      begin: '25/03/2023',
      end: '15/04/2023',
      bill: 'KP250320231200',
      participants: 3
    }
  ])
  const [nbrMission] = useState(data.length)
  const { t } = useTranslation()

  return (
    <div className='std-mission-pending'>
      <p className='std-mission-pending__mission-status'>
        { t('company.mission.pending.pending_mission', { nbrMission }) }
      </p>
      { nbrMission === 0
        ? <p className='std-mission-pending__no-mission'>
            { t('company.mission.pending.no_mission') }
          </p>
        : data.map((item, index) => (
          <MissionCard data={item} key={index} />
        ))
      }
    </div>
  )
}

export default CompanyMissionsPending
