import React, { useState } from 'react'
import type { CompanyMissionDetails } from '../../../Typage/Type'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@mui/material'
import ModalInvitationGroup from './ModalInvitationGroup'

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
            <p className='cpn-detailed-mission__conversation' onClick={openInviteModal}> Inviter un groupe </p>
            <ModalInvitationGroup open={inviteModal} onClose={closeInviteModal} missionId={props.missionData.mission.id} />
          </div>
      }
    </div>
  )
}

export default MissionGroup
