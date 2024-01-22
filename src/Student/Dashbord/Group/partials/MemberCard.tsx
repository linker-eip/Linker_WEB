/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import '../../../../CSS/StudentMemberGroup.scss'
import Avatar from '@mui/material/Avatar'
import type { Members } from '../../../../Typage/Type'

interface Props {
  member: Members[] | undefined
}

const MemberCard = (props: Props): JSX.Element => {
  return (
    <div className='std-member-grp'>
      <div className='std-member-grp__section'>
        {props.member !== undefined
          ? props.member.map((member: Members, index: number) => {
            return (
            <div key={index} className='std-member-grp__card'>
              <Avatar alt='avatar' src={member.picture} />
              <div className='std-member-grp__name'>{member.firstName} {member.lastName}</div>
              { member.isLeader
                ? <img src='/assets/group_leader_icon.svg' />
                : null
              }
            </div>
            )
          })
          : null
        }
      </div>
    </div>
  )
}

export default MemberCard
