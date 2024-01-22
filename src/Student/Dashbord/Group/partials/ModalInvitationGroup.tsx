import React from 'react'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import SearchBar from './SearchBar'

interface Props {
  open: boolean
  onClose: () => void
}

function ModalInvitationGroup (props: Props): JSX.Element {
  const { t } = useTranslation()

  const handleValidationClose = (): void => {
    props.onClose()
  }

  const studentName = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'rayane', 'rayquaza', 'raylib']

  return (
    <Modal open={props.open} onClose={handleValidationClose} >
        <div className='std-invite-modal'>
          <div className='std-invite-modal__title-section'>
            <div className='std-invite-modal__title'> { t('student.groups.invite.title') } </div>
          </div>
          <div className='std-invite-modal__content-section'>
            <SearchBar data={studentName} />
          </div>
        </div>
      </Modal>
  )
}

export default ModalInvitationGroup
