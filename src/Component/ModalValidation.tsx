/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import '../CSS/ModalValidation.scss'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
// import * as ROUTES from '../Router/routes'
import ClassicButton from './ClassicButton'
import Modal from '@mui/material/Modal'
import { ModalType } from '../Enum'

interface Props {
  subject: string
  open: boolean
  type: ModalType
  onClose: () => void
}

function ModalValidation (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [opened, setOpened] = useState(props.open)
  const handleValidationClose = (): void => {
    setOpened(false)
    props.onClose()
  }

  return (
    <Modal open={opened} onClose={handleValidationClose} >
      <div className='modal-validation'>
        <div className='modal-validation__title'>
          { t('modal.title') }
        </div>
        {props.type === ModalType.REFUS
          ? <div className='modal-validation__subtitle'>
              { t('modal.refus.subtitle') }
            </div>
          : null
        }
        {props.type === ModalType.ACCEPT
          ? <div className='modal-validation__subtitle'>
              { t('modal.accept.subtitle') }
            </div>
          : null
        }
        <p className='modal-validation__subject'> "{ props.subject }" ? </p>
        <div className='modal-validation__button-section'>
          { props.type === ModalType.REFUS
            ? <ClassicButton title='Refuser' refuse onClick={handleValidationClose} />
            : <div></div>
          }
          { props.type === ModalType.ACCEPT
            ? <ClassicButton title='Accepter' onClick={handleValidationClose} />
            : <div></div>
          }
          <ClassicButton title='Annuler' cancelled onClick={handleValidationClose} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalValidation
