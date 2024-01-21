import React from 'react'
import '../../../CSS/StudentGroup.scss'
import Modal from '@mui/material/Modal'
import SearchBar from './SearchBar'

interface Props {
  missionId: number
  open: boolean
  onClose: () => void
}

function ModalInvitationGroup (props: Props): JSX.Element {
  const handleValidationClose = (): void => {
    props.onClose()
  }

  return (
    <Modal open={props.open} onClose={handleValidationClose} >
        <div className='std-invite-modal'>
          <div className='std-invite-modal__title-section'>
            <div className='std-invite-modal__title'> Ajouter un groupe à la mission </div>
          </div>
          <div className='std-invite-modal__content-section'>
            <SearchBar data={[]} missionId={props.missionId} />
          </div>
        </div>
      </Modal>
  )
}

export default ModalInvitationGroup
