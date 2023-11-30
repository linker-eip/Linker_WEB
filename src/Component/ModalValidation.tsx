/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import '../CSS/ModalValidation.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from './ClassicButton'
import Modal from '@mui/material/Modal'
import { ModalType } from '../Enum'

interface Props {
  subject: string
  open: boolean
  type: ModalType
  onClose: () => void
  onValid?: () => void
  id?: number
}

function ModalValidation (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [opened, setOpened] = useState(props.open)

  const handleValidationClose = (): void => {
    setOpened(false)
    if (props.onValid !== null && props.onValid !== undefined) {
      props.onValid()
    }
    props.onClose()
  }

  const handleDeleteClose = (): void => {
    fetch(`https://dev.linker-app.fr/api/mission/${String(props?.id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setOpened(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la suppression de la mission: ${String(error)}`)
      })
  }

  return (
    <Modal open={opened} onClose={handleValidationClose} >
      <div className='modal-validation'>
        {props.type === ModalType.DELETE
          ? <div className='modal-validation__title'>
              { t('modal.deleteTitle') }
            </div>
          : <div className='modal-validation__title'>
              { t('modal.title') }
            </div>
        }
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
        <p className='modal-validation__subject'> "{ props.subject }" ? </p>
        <div className='modal-validation__button-section'>
          { props.type === ModalType.REFUS
            ? <ClassicButton title='Refuser' refuse onClick={handleValidationClose} />
            : null
          }
          { props.type === ModalType.ACCEPT
            ? <ClassicButton title='Accepter' onClick={handleValidationClose} />
            : null
          }
          { props.type === ModalType.DELETE
            ? <ClassicButton title='Supprimer' refuse onClick={handleDeleteClose} />
            : null
          }
          <ClassicButton title='Annuler' cancelled onClick={handleValidationClose} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalValidation
