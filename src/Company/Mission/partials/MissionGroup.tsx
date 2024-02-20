import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../Router/routes'
import '../../../CSS/StudentDetailedMission.scss'
import type { CompanyMissionDetails } from '../../../Typage/Type'

interface Props {
  missionData: CompanyMissionDetails
}

function MissionGroup (props: Props): JSX.Element {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const handleClick = (): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    navigate(`${ROUTES.COMPANY_MISSION_CHAT.replace(':missionId', props.missionData.mission.id.toString())}`)
  }

  const handlePreClick = (): void => {
    navigate(`${ROUTES.COMPANY_PRE_MISSION_CHAT.replace(':missionId', props.missionData.mission.id.toString())}`)
  }

  return (
    <div className='cpn-detailed-mission__section'>
      <p className='cpn-detailed-mission__section__title-4'> { t('company.detailed_mission.participants')} </p>
      {props.missionData.mission.groupId != null
        ? <div className='cpn-detailed-mission__column-2'>
            <div className='cpn-detailed-mission__row'>
              <img className='cpn-detailed-mission__logo' src={'missionData.group.picture ?? '} />
              <div className='cpn-detailed-mission__column'>
                <p className='cpn-detailed-mission__section__subtitle'> { props.missionData.group.name } </p>
              </div>
            </div>
            <div className='std-detailed-mission__conversation' onClick={handleClick}>
              {t('student.detailed_mission.conversation')}
            </div>
          </div>
        : <div className='cpn-detailed-mission__column-2'>
            <img className='cpn-detailed-mission__img' src='/assets/groups_image.svg' />
            <div className='cpn-detailed-mission__row'>
              { t('company.detailed_mission.no_participants')}
            </div>
            <div className='std-detailed-mission__conversation' onClick={handlePreClick}>
              {t('student.detailed_mission.pre_conversation')}
            </div>
          </div>
      }
    </div>
  )
}

export default MissionGroup
