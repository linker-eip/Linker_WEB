/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import '../../../CSS/StudentInviteCard.scss'
import Avatar from '@mui/material/Avatar'
import ClassicButton from '../../../Component/ClassicButton'
import type { SearchGroupData } from '../../../Typage/Type'
import GroupApi from '../../../API/GroupApi'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import { useTranslation } from 'react-i18next'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Props {
  group: SearchGroupData
  missionId: number
}

const StudentInviteCard = (props: Props): JSX.Element => {
  const [hasBeenInvited, setHasBeenInvited] = useState<boolean>(false)
  const [snackbarValue, setSnackbarValue] = useState<boolean>(false)
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const inviteMember = async () => {
    const response = await GroupApi.inviteGroup(localStorage.getItem('jwtToken') as string, props.missionId, props.group.id)
    if (response.response?.status === 400 || response.response?.status === 409) {
      console.log('erreur 409')
      openSnackbar()
    } else {
      setHasBeenInvited(true)
    }
  }

  const openSnackbar = (): void => {
    setSnackbarValue(true)
  }

  const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarValue(false)
  }

  return (
    <div className='std-invite-card'>
      <div className='std-invite-card__section'>
        <Avatar alt='avatar' src={props.group.name} />
        <div className='std-invite-card__name'>{ props.group.name }</div>
      </div>
      {hasBeenInvited ? <ClassicButton disabled title='invité' /> : <ClassicButton title='inviter' onClick={inviteMember} /> }
      <Snackbar open={snackbarValue} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          { t('snackbar.invitation_error') }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default StudentInviteCard
