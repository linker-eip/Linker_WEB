import React, { useState } from 'react'
import type { CompanyMissionDetails } from '../../../Typage/Type'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@mui/material'
import ModalInvitationGroup from './ModalInvitationGroup'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../Router/routes'

interface Props {
  missionData: CompanyMissionDetails
}

function MissionGroup (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [inviteModal, setInviteModal] = useState<boolean>(false)

  const openInviteModal = (): void => {
    setInviteModal(true)
  }

  const closeInviteModal = (): void => {
    setInviteModal(false)
  }

  const navigate = useNavigate()

  const handleClick = (): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    navigate(`${ROUTES.COMPANY_MISSION_CHAT.replace(':missionId', props.missionData.mission.id.toString())}`)
  }

  return (
    <div className='cpn-detailed-mission__section'>
      <p className='cpn-detailed-mission__section__title-3'> { t('company.detailed_mission.participants')} </p>
      {props.missionData.mission.groupId != null
        ? <div className='cpn-detailed-mission__column-2'>
            <div className='cpn-detailed-mission__row'>
              <Avatar src={props.missionData.group.picture} />
              <div className='cpn-detailed-mission__column'>
                <p className='cpn-detailed-mission__section__subtitle'> { props.missionData.group.name } </p>
              </div>
            </div>
            <div className='cpn-detailed-mission__conversation' onClick={handleClick}>
              {t('student.detailed_mission.conversation')}
            </div>
          </div>
        : <div className='cpn-detailed-mission__column-2'>
            <img className='cpn-detailed-mission__img' src='/assets/groups_image.svg' />
            <div className='cpn-detailed-mission__row'>
              { t('company.detailed_mission.no_participants')}
            </div>
            <p className='cpn-detailed-mission__conversation' onClick={openInviteModal}> Inviter un groupe </p>
            <ModalInvitationGroup open={inviteModal} onClose={closeInviteModal} missionId={props.missionData.mission.id} />
          </div>
      }
    </div>
  )
}

export default MissionGroup
