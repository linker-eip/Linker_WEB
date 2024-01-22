import React, { useEffect, useState } from 'react'
import type { GroupInvitation } from '../../../../Typage/Type'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import InvitationCard from './InvitationCard'

interface Props {
  data: GroupInvitation[] | undefined
  onReturn: () => void
}

function Invitations (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [hasInvite, setInviteStatus] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function setGroupStatusOnMounted () {
      if (props.data !== undefined && props.data?.length > 0) {
        setInviteStatus(true)
      } else {
        setInviteStatus(false)
      }
    }
    setGroupStatusOnMounted()
  }, [props.data])

  return (
    <div>
      { hasInvite
        ? <div>
          {
            props.data?.map((group: GroupInvitation, index: number) => <InvitationCard group={group} key={index} onReturn={props.onReturn} />)
          }
          </div>
        : <div className='std-group'>
            <div className='std-group__text'> { t('student.dashboard.groups.no_invite') } </div>
            <div className='std-group__image' >
              <img src='/assets/groups_image.svg' />
            </div>
          </div>
      }
    </div>
  )
}

export default Invitations
