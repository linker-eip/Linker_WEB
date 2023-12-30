import React from 'react'
import type { CompanyMissionDetails } from '../../../Typage/Type'
import { useTranslation } from 'react-i18next'

interface Props {
  missionData: CompanyMissionDetails
}

function MissionGroup (props: Props): JSX.Element {
  const { t } = useTranslation()
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
            <p className='cpn-detailed-mission__conversation'> {t('student.detailed_mission.conversation')} </p>
          </div>
        : <div className='cpn-detailed-mission__column-2'>
            <img className='cpn-detailed-mission__img' src='/assets/groups_image.svg' />
            <div className='cpn-detailed-mission__row'>
              { t('company.detailed_mission.no_participants')}
            </div>
          </div>
      }
    </div>
  )
}

export default MissionGroup
