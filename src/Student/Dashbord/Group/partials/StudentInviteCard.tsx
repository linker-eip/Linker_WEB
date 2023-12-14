/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import '../../../../CSS/StudentInviteCard.scss'
import Avatar from '@mui/material/Avatar'
import ClassicButton from '../../../../Component/ClassicButton'
import type { InvitedMember, SearchMember } from '../../../../Typage/Type'
import GroupApi from '../../../../API/GroupApi'

interface Props {
  member: SearchMember
  invitedMember: InvitedMember[]
}

const StudentInviteCard = (props: Props): JSX.Element => {
  const [hasBeenInvited, setHasBeenInvited] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const isInvited = props.invitedMember?.some((element: InvitedMember) => element.id === props.member.id)
    setHasBeenInvited(!!isInvited)
  }, [props.invitedMember, props.member.id])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const inviteMember = async () => {
    const response = await GroupApi.inviteMember(localStorage.getItem('jwtToken') as string, props.member.id)
    if (response.response?.status === 400 || response.response?.status === 409) {
      console.log('erreur 409')
    } else {
      setHasBeenInvited(true)
    }
  }

  return (
    <div className='std-invite-card'>
      <div className='std-invite-card__section'>
        <Avatar alt='avatar' src={props.member.picture} />
        <div className='std-invite-card__name'>{ props.member.firstName } {props.member.lastName}</div>
      </div>
      {hasBeenInvited ? <ClassicButton disabled title='invité' /> : <ClassicButton title='inviter' onClick={inviteMember} /> }
    </div>
  )
}

export default StudentInviteCard
