import React, { useEffect, useState } from 'react'
import type { Group as GroupData } from '../../../../Typage/Type'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from '../../../../Component/ClassicButton'
import ModalCreateGroup from './ModalCreateGroup'
import GroupApi from '../../../../API/GroupApi'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType } from '../../../../Enum'
import ModalInvitationGroup from './ModalInvitationGroup'
import MemberCard from './MemberCard'

interface Props {
  data: GroupData | undefined
  onReturn: () => void
}

function Group (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [hasGroup, setStatus] = useState<boolean>(false)
  const [creationGroup, setCreationGroup] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [inviteModal, setInviteModal] = useState<boolean>(false)

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

  const openDeleteModal = (): void => {
    setDeleteModal(true)
  }

  const closeDeleteModal = (): void => {
    setDeleteModal(false)
  }

  const openInviteModal = (): void => {
    setInviteModal(true)
  }

  const closeInviteModal = (): void => {
    setInviteModal(false)
  }

  return (
    <div>
      { hasGroup
        ? <div className='std-group__container'>
            <div className='std-group__button-container'>
              { props.data?.data?.isLeader ?? false
                ? <ClassicButton title='Ajouter des membres' onClick={openInviteModal} />
                : null
              }
              <ClassicButton title={props.data?.data?.isLeader ?? false ? 'Détruire le groupe' : 'Quitter le groupe'} refuse onClick={openDeleteModal} />
            </div>
            <div className='std-group__member-container'>
                <div className='std-group__member-title'> {t('student.dashboard.groups.member_title')} </div>
                <MemberCard member={props.data?.data?.members} />
            </div>
            <ModalValidation subject={props.data?.data?.name ?? ''} open={deleteModal} onClose={closeDeleteModal} type={ModalType.DELETE_GROUP} onValid={deleteGroup} />
            <ModalInvitationGroup open={inviteModal} onClose={closeInviteModal} />
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
