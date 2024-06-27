/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent, useState } from 'react'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import GroupApi from '../../../../API/GroupApi'
import DropZoneV2 from '../../../../Component/DropZoneV2'
import ProfileApi from '../../../../API/ProfileApi'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Props {
  open: boolean
  onClose: () => void
}

function ModalCreateGroup (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [groupName, setGroupName] = useState<string>('')
  const [groupDescription, setGroupDescription] = useState('')
  const maxLength = 500
  const [logo, setLogo] = useState<any>()
  const [alertError, setAlertError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleLogo = (event: ChangeEvent<HTMLInputElement>): void => {
    setLogo(event)
  }

  const handleCreateGroup = async (): Promise<void> => {
    if (logo != null && groupName.length > 1 && groupDescription.length > 1) {
      const file = new FormData()
      file.append('file', logo[0])
      const returnValue = await ProfileApi.uploadFile(localStorage.getItem('jwtToken') as string, file)
      const dto = new FormData()
      dto.append('name', groupName.toString())
      dto.append('description', groupDescription.toString())
      dto.append('picture', String(returnValue))
      const response = await GroupApi.createGroup(localStorage.getItem('jwtToken') as string, dto)
      if (response.response?.status === 400 || response.response?.status === 409) {
        setErrorText(response.response?.data.message)
        openAlertSnackbar()
      } else {
        props.onClose()
      }
    } else {
      setErrorText('Veuillez remplir les champs correctement.')
      openAlertSnackbar()
    }
  }

  const handleValidationClose = (): void => {
    props.onClose()
  }

  const handleGroupName = (event: ChangeEvent<HTMLInputElement>): void => {
    setGroupName(event.target.value)
  }

  const handleGroupDescription = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = event.target.value

    if (inputValue.length <= maxLength) {
      setGroupDescription(inputValue)
    }
  }

  const openAlertSnackbar = (): void => {
    setAlertError(true)
  }

  const closeAlertSnackbar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setAlertError(false)
  }

  return (
    <Modal open={props.open} onClose={handleValidationClose} >
        <div className='std-group-modal'>
          <div className='std-group-modal__title-section'>
            <div className='std-group-modal__title'> { t('student.groups.title') } </div>
          </div>
          <div className='std-group-modal__content-section'>
            <DropZoneV2 onClose={() => {}} onObjectChange={handleLogo} />
              { logo !== undefined
                ? <div>
                    <p> {logo[0].path } </p>
                  </div>
                : null
              }
            <TextField
              className='std-group-modal__textfield'
              value={groupName}
              onChange={handleGroupName}
              variant='standard'
              id="standard-required"
              label={t('student.groups.name')}
            />
            <textarea
              placeholder={t('student.groups.description') ?? ''}
              className='std-group-modal__textfield'
              value={groupDescription}
              onChange={handleGroupDescription}
              rows={4}
              cols={80}
            />
            <div className='std-group-modal__char-count'>
              {groupDescription.length}/{maxLength} caractères
            </div>
            <div className='std-group-modal__button'>
              <BaseButton title={t('student.groups.button')} onClick={handleCreateGroup} />
            </div>
          </div>
          <Snackbar open={alertError} autoHideDuration={6000} onClose={closeAlertSnackbar}>
            <Alert onClose={closeAlertSnackbar} severity="error" sx={{ width: '100%' }}>
              { errorText }
            </Alert>
          </Snackbar>
        </div>
      </Modal>
  )
}

export default ModalCreateGroup
