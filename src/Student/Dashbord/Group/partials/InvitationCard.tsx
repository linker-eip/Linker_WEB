/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import '../../../../CSS/GroupInvitationCard.scss'
import { Avatar } from '@mui/material'
import type { GroupInvitation } from '../../../../Typage/Type'
import ClassicButton from '../../../../Component/ClassicButton'
import GroupApi from '../../../../API/GroupApi'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType } from '../../../../Enum'

interface Props {
  group: GroupInvitation | undefined
  onReturn: () => void
}

const InvitationCard = (props: Props): JSX.Element => {
  const [refuseModal, setRefuseStatus] = useState<boolean>(false)
  const [acceptModal, setAcceptStatus] = useState<boolean>(false)

  const openRefuseModal = (): void => {
    setRefuseStatus(true)
  }

  const closeRefuseModal = (): void => {
    setRefuseStatus(false)
  }

  const openAcceptModal = (): void => {
    setAcceptStatus(true)
  }

  const closeAcceptModal = (): void => {
    setAcceptStatus(false)
  }

  const acceptInvite = async (groupId: number): Promise<void> => {
    await GroupApi.acceptInvitation(localStorage.getItem('jwtToken') as string, groupId)
    props.onReturn()
  }

  const refuseInvite = async (groupId: number): Promise<void> => {
    await GroupApi.refuseInvitation(localStorage.getItem('jwtToken') as string, groupId)
    props.onReturn()
  }

  return (
    <div className='grp-invite-card'>
      <div className='grp-invite-card__section'>
        <div className='grp-invite-card__container'>
          <div className='grp-invite-card__title'>
            <Avatar src={props.group?.picture} />
            { props.group?.name }
          </div>
          <div className='grp-invite-card__leader'>
            { props.group?.leaderName }
          </div>
        </div>
        <div className='grp-invite-card__content'>
          <div>
          Description tah les ouf ecrit en dur tah les zhomme SUII aller le football la j aime le foot alesxandDescription tah les ouf ecrit en dur tah les zhomme SUII aller le football la j aime le foot alesxandDescription tah les ouf ecrit en dur tah les zhomme SUII aller le football la j aime le foot alesxandDescription tah les ouf ecrit en dur tah les zhomme SUII aller le football la j aime le foot alesxandDescription tah les ouf ecrit en dur tah les zhomme SUII aller le football la j aime le foot ale
          </div>
          <div className='grp-invite-card__button-section'>
            <ClassicButton title='Accepter' onClick={openAcceptModal} />
            <ClassicButton title='Refuser' refuse onClick={openRefuseModal} />
          </div>
        </div>
      </div>
      <ModalValidation subject={props.group?.name ?? ''} type={ModalType.REFUS} open={refuseModal} onClose={closeRefuseModal} onValid={() => refuseInvite(props.group?.id ?? 0)} />
      <ModalValidation subject={props.group?.name ?? ''} type={ModalType.ACCEPT} open={acceptModal} onClose={closeAcceptModal} onValid={() => acceptInvite(props.group?.id ?? 0)} />
    </div>
  )
}

export default InvitationCard
