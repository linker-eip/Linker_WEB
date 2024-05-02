/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent, useState } from 'react'
import '../../../../CSS/ModalLinkedIn.scss'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ClassicButton from '../../../../Component/ClassicButton'
import LinkedInApi from '../../../../API/LinkedInApi'

interface Props {
  open: boolean
  onClose: () => void
}

function ModalLinkedIn (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [urlLinkedIn, setUrl] = useState<string>('')

  const handleValidationClose = (): void => {
    props.onClose()
  }
  const handleUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value)
  }

  const updateProfile = async (): Promise<void> => {
    const dto = {
      url: urlLinkedIn
    }
    const response = await LinkedInApi.updateProfile(localStorage.getItem('jwtToken') as string, dto)
    if (response !== undefined) {
      window.location.reload()
      props.onClose()
    }
  }

  return (
    <Modal open={props.open} onClose={handleValidationClose} >
      <div className='modal-linkedIn'>
        <div className='modal-linkedIn__title'> { t('modal.linkedIn.title') } </div>
          <TextField
            style={{ width: '100%' }}
            className='std-group-modal__textfield'
            value={urlLinkedIn}
            onChange={handleUrl}
            variant='standard'
            id="standard-required"
            label={ t('modal.linkedIn.textarea') }
            />
        <div className='modal-linkedIn__button-section'>
          <ClassicButton title={t('button')} cancelled onClick={props.onClose} />
          <ClassicButton title={t('validate')} onClick={updateProfile} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalLinkedIn
