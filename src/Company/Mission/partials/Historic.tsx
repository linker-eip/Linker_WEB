import React, { useState, useEffect } from 'react'
import '../../../CSS/CompanyDetailedMission.scss'
import { MissionStatus } from '../../../Enum'
import { Avatar } from '@mui/material'

interface History {
  logo: string
  name: string
  action: string
}

interface Props {
  missionStatus: string
  companyName: string
  groupName: string
  companyLogo: string
  groupLogo: string
}

function Historic (props: Props): JSX.Element {
  const [historic, setHistoric] = useState<History[]>()

  useEffect(() => {
    if (MissionStatus.PENDING === props.missionStatus) {
      setHistoric([{
        logo: props.companyLogo,
        name: props.companyName,
        action: 'a créé la mission'
      }])
    }

    if (MissionStatus.ACCEPTED === props.missionStatus) {
      setHistoric(
        [
          {
            logo: props.companyLogo,
            name: props.companyName,
            action: 'a créé la mission'
          },
          {
            logo: props.groupLogo,
            name: props.groupName,
            action: 'a accepté la mission'
          }
        ]
      )
    }

    if (MissionStatus.IN_PROGRESS === props.missionStatus) {
      setHistoric(
        [
          {
            logo: props.companyLogo,
            name: props.companyName,
            action: 'a créé la mission'
          },
          {
            logo: props.groupLogo,
            name: props.groupName,
            action: 'a accepté la mission'
          },
          {
            logo: props.groupLogo,
            name: props.groupName,
            action: 'a commencé la mission'
          }
        ]
      )
    }

    if (MissionStatus.FINISHED === props.missionStatus) {
      setHistoric(
        [
          {
            logo: props.companyLogo,
            name: props.companyName,
            action: 'a créé la mission'
          },
          {
            logo: props.groupLogo,
            name: props.groupName,
            action: 'a accepté la mission'
          },
          {
            logo: props.groupLogo,
            name: props.groupName,
            action: 'a commencé la mission'
          },
          {
            logo: props.groupLogo,
            name: props.groupName,
            action: 'a terminé la mission'
          }
        ]
      )
    }
  }, [])

  return (
    <div>
      {historic?.map((element, index) => (
        <div className='cpn-detailed-mission__sub-section' key={index}>
        <div className='cpn-detailed-mission__row-2'>
          <Avatar className='cpn-detailed-mission__historic-logo' src={element.logo} />
          <div className='cpn-detailed-mission__text-important'> {element.name} </div>
          <div className='cpn-detailed-mission__text '> {element.action} </div>
        </div>
      </div>
      )) }
    </div>
  )
}

export default Historic
