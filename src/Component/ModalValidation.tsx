/* eslint-disable react/no-unescaped-entities */
import React from 'react'
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
  onValid: () => void
}

function ModalValidation (props: Props): JSX.Element {
  const { t } = useTranslation()
  const handleValidationClose = (): void => {
    props.onClose()
  }

  const handleValidation = (): void => {
    props.onValid()
    props.onClose()
  }

  return (
    <Modal open={props.open} onClose={handleValidationClose} >
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
        {props.type === ModalType.DELETE
          ? <div className='modal-validation__subtitle'>
              { t('modal.delete.subtitle') }
            </div>
          : null
        }
        {props.type === ModalType.LEAVE
          ? <div className='modal-validation__subtitle'>
              { t('modal.leave.subtitle') }
            </div>
          : null
        }
        <p className='modal-validation__subject'> "{ props.subject }" ? </p>
        <div className='modal-validation__button-section'>
          { props.type === ModalType.REFUS
            ? <ClassicButton title='Refuser' refuse onClick={handleValidation} />
            : null
          }
          { props.type === ModalType.ACCEPT
            ? <ClassicButton title='Accepter' onClick={handleValidation} />
            : null
          }
          { props.type === ModalType.DELETE
            ? <ClassicButton title='Détruire' refuse onClick={handleValidation} />
            : null
          }
          { props.type === ModalType.LEAVE
            ? <ClassicButton title='Quitter' refuse onClick={handleValidation} />
            : null
          }
          <ClassicButton title='Annuler' cancelled onClick={handleValidationClose} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalValidation
