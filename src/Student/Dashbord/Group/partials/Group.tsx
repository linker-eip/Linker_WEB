import React, { useEffect, useState } from 'react'
import type { Group as GroupData, InvitedMember } from '../../../../Typage/Type'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from '../../../../Component/ClassicButton'
import ModalCreateGroup from './ModalCreateGroup'
import GroupApi from '../../../../API/GroupApi'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType, TicketType } from '../../../../Enum'
import ModalInvitationGroup from './ModalInvitationGroup'
import MemberCard from './MemberCard'
import MemberInvitedCard from './MemberInvitedCard'
import ModalExclusionMember from './ModalExclusionMember'
import ReportButton from '../../../../Component/ReportButton'

interface Props {
  data: GroupData | undefined
  onReturn: () => void
}

function Group (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [hasGroup, setStatus] = useState<boolean>(false)
  const [creationGroup, setCreationGroup] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [leaveModal, setLeaveModal] = useState<boolean>(false)
  const [inviteModal, setInviteModal] = useState<boolean>(false)
  const [exclusionModal, setExclusionModal] = useState<boolean>(false)
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
      if (hasGroup) {
        const response = await GroupApi.getMemberInvited(localStorage.getItem('jwtToken') as string)
        setMemberInvited(response.data)
      }
    }
    setInvitedData()
  }, [inviteModal, refetch])

  const handleCreateGroup = (): void => {
    setCreationGroup(false)
    props.onReturn()
  }

  const openModal = (): void => {
    setCreationGroup(true)
  }

  const deleteGroup = (): void => {
    setDeleteModal(false)
    GroupApi.deleteGroup(localStorage.getItem('jwtToken') as string)
    props.onReturn()
  }

  const leaveGroup = (): void => {
    setLeaveModal(false)
    GroupApi.leaveGroup(localStorage.getItem('jwtToken') as string)
    props.onReturn()
  }

  const openDeleteModal = (): void => {
    setDeleteModal(true)
  }

  const closeDeleteModal = (): void => {
    setDeleteModal(false)
  }

  const openLeaveModal = (): void => {
    setLeaveModal(true)
  }

  const closeLeaveModal = (): void => {
    setLeaveModal(false)
  }

  const openInviteModal = (): void => {
    setInviteModal(true)
  }

  const closeInviteModal = (): void => {
    setInviteModal(false)
  }

  const openExclusionModal = (): void => {
    setExclusionModal(true)
  }

  const closeExclusionModal = (): void => {
    setExclusionModal(false)
  }

  const handleRefetch = (): void => {
    setRefetch(!refetch)
  }

  return (
    <div>
      { hasGroup
        ? <div className='std-group__container'>
            <div className='std-group__details-section'>
              <div className='std-group__button-container'>
                { props.data?.data?.isLeader ?? false
                  ? <ClassicButton title={t('student.groups.invite.title')} onClick={openInviteModal} />
                  : null
                }
                { props.data?.data?.isLeader ?? false
                  ? <ClassicButton title={t('student.groups.exclude.title')} onClick={openExclusionModal} refuse />
                  : null
                }
                <ClassicButton title={props.data?.data?.isLeader ?? false ? t('student.groups.destroy') : t('student.groups.leave')} refuse onClick={props.data?.data?.isLeader ?? false ? openDeleteModal : openLeaveModal } />
              </div>
              <div className='std-group__details'>
                <ReportButton TicketType={TicketType.GROUP} id={props.data?.data?.groupId} />
                <img className='std-group__picture' src={props.data?.data?.picture} />
                <div>
                  <div className='std-group__text'> { t('student.groups.show_desc') } </div>
                  <div className='std-group__description'> { props.data?.data?.description } </div>
                </div>
              </div>
            </div>
            <div className='std-group__member-container'>
                <div className='std-group__member-title'> {t('student.dashboard.groups.member_title')} </div>
                <MemberCard member={props.data?.data?.members} />
                <div className='std-group__member-title'> {t('student.dashboard.groups.invited')} </div>
                <MemberInvitedCard member={memberInvited} onDelete={handleRefetch} />
            </div>
            <ModalValidation subject={props.data?.data?.name ?? ''} open={deleteModal} onClose={closeDeleteModal} type={ModalType.DELETE_GROUP} onValid={deleteGroup} />
            <ModalValidation subject={props.data?.data?.name ?? ''} open={leaveModal} onClose={closeLeaveModal} type={ModalType.LEAVE} onValid={leaveGroup} />
            {/* <ModalValidation subject={props.data?.data?.name ?? ''} open={leaveModal} onClose={closeLeaveModal} type={ModalType.LEAVE} onValid={leaveGroup} /> */}
            <ModalInvitationGroup open={inviteModal} onClose={closeInviteModal} />
            <ModalExclusionMember open={exclusionModal} onClose={closeExclusionModal} />
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

export default Group
