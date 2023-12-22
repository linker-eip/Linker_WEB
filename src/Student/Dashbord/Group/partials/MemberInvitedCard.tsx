/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import '../../../../CSS/StudentMemberGroup.scss'
import Avatar from '@mui/material/Avatar'
import type { InvitedMember } from '../../../../Typage/Type'
import GroupApi from '../../../../API/GroupApi'

interface Props {
  member: InvitedMember[] | undefined
  onDelete: () => void
}

const MemberInvitedCard = (props: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const deleteMember = async (id: number) => {
    await GroupApi.deleteInvitedMember(localStorage.getItem('jwtToken') as string, id)
    props.onDelete()
  }

  return (
    <div className='std-member-grp'>
      <div className='std-member-grp__section'>
        {props.member !== undefined
          ? props.member.map((member: InvitedMember, index: number) => {
            return (
            <div key={index} className='std-member-grp__card'>
              <Avatar alt='avatar' src={member.picture} />
              <div className='std-member-grp__name'>{member.name} </div>
              <img className='std-member-grp__logo' src='/assets/remove.svg' onClick={ async () => deleteMember(member.id)} />
            </div>
            )
          })
          : null
        }
      </div>
    </div>
  )
}

export default MemberInvitedCard
