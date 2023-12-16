import React, { type ChangeEvent, useState } from 'react'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import GroupApi from '../../../../API/GroupApi'

interface Props {
  open: boolean
  onClose: () => void
}

function ModalCreateGroup (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [groupName, setGroupName] = useState<string>('')
  const [groupDescription, setGroupDescription] = useState('')
  const maxLength = 500

  const handleCreateGroup = (): void => {
    const dto = new FormData()
    dto.append('name', groupName.toString())
    dto.append('description', groupDescription.toString())
    dto.append('picture', '')
    GroupApi.createGroup(localStorage.getItem('jwtToken') as string, dto)
    props.onClose()
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

  return (
    <Modal open={props.open} onClose={handleValidationClose} >
        <div className='std-group-modal'>
          <div className='std-group-modal__title-section'>
            <div className='std-group-modal__title'> { t('student.groups.title') } </div>
          </div>
          <div className='std-group-modal__content-section'>
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
        </div>
      </Modal>
  )
}

export default ModalCreateGroup
