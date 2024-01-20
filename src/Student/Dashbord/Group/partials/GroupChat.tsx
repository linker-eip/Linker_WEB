import React, { useEffect, useState } from 'react'
import type { Group as GroupData, InvitedMember } from '../../../../Typage/Type'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from '../../../../Component/ClassicButton'
import ModalCreateGroup from './ModalCreateGroup'
import GroupApi from '../../../../API/GroupApi'
import MemberCard from './MemberCard'
import MemberInvitedCard from './MemberInvitedCard'

interface Props {
  data: GroupData | undefined
  onReturn: () => void
}

function GroupChat (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [hasGroup, setStatus] = useState<boolean>(false)
  const [creationGroup, setCreationGroup] = useState<boolean>(false)
  const [memberInvited, setMemberInvited] = useState<InvitedMember[] | undefined>()
  const [refetch, setRefetch] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function setGroupStatusOnMounted () {
      if (props.data?.data?.name === undefined) {
        setStatus(false)
      } else {
        setStatus(true)
      }
    }
    setGroupStatusOnMounted()
  }, [props.data])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function setInvitedData () {
      const response = await GroupApi.getMemberInvited(localStorage.getItem('jwtToken') as string)
      setMemberInvited(response.data)
    }
    setInvitedData()
  }, [refetch])

  const handleCreateGroup = (): void => {
    setCreationGroup(false)
    props.onReturn()
  }

  const openModal = (): void => {
    setCreationGroup(true)
  }

  const handleRefetch = (): void => {
    setRefetch(!refetch)
  }

  return (
    <div>
      { hasGroup
        ? <div className='std-group__container'>
            <div className='std-group__details-section'></div>
            <div className='std-group__member-container'>
                <div className='std-group__member-title'> {t('student.dashboard.groups.member_title')} </div>
                <MemberCard member={props.data?.data?.members} />
                <div className='std-group__member-title'> {t('student.dashboard.groups.invited')} </div>
                <MemberInvitedCard member={memberInvited} onDelete={handleRefetch} />
            </div>
          </div>
        : <div className='std-group'>
          <div className='std-group__section'>
            <div className='std-group__text'> { t('student.dashboard.groups.no_group') } </div>
            <ClassicButton title={t('student.dashboard.groups.create_group_button')} onClick={openModal}/>
          </div>
          <div className='std-group__image' >
            <img src='/assets/groups_image.svg' />
          </div>
          <ModalCreateGroup open={creationGroup} onClose={handleCreateGroup}/>
        </div>
      }
    </div>
  )
}

export default GroupChat
