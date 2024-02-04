/* eslint-disable react/no-unescaped-entities */
import React, { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import '../CSS/ModalValidation.scss'
import { useTranslation } from 'react-i18next'
import ClassicButton from './ClassicButton'
import Modal from '@mui/material/Modal'
import { ModalType } from '../Enum'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'

interface Props {
  subject: string
  open: boolean
  type: ModalType
  onClose: () => void
  onValid?: () => void
  id?: number
  isDetails?: boolean
}

function ModalValidation (props: Props): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [opened, setOpened] = useState(props.open)

  const handleValidationClose = (): void => {
    console.log(opened)
    setOpened(false)
    props.onClose()
  }

  const handleValidation = (): void => {
    if (props.onValid !== null && props.onValid !== undefined) {
      props.onValid()
    }
    props.onClose()
  }

  const handleDeleteClose = (): void => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/mission/${String(props?.id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setOpened(false)
        if (props?.isDetails === true) {
          navigate(ROUTES.COMPANY_MISSIONS)
        }
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la suppression de la mission: ${String(error)}`)
      })
  }

  const [inputText, setInputText] = useState('')
  const maxChars = 200

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(event.target.value)
  }

  const [starsQualityMark, setStarsQualityMark] = useState(0)
  const [starsRespectMark, setStarsRespectMark] = useState(0)
  const [starsCommunicationMark, setStarsCommunicationMark] = useState(0)
  const [starsCollabMark, setStarsCollabMark] = useState(0)

  const [starsQualityStatus, setStarsQualityStatus] = useState(['no', 'no', 'no', 'no', 'no'])
  const [starsRespectStatus, setStarsRespectStatus] = useState(['no', 'no', 'no', 'no', 'no'])
  const [starsCommunicationStatus, setStarsCommunicationStatus] = useState(['no', 'no', 'no', 'no', 'no'])
  const [starsCollabStatus, setStarsCollabStatus] = useState(['no', 'no', 'no', 'no', 'no'])

  const handleChangeStars = (
    starsMark: number,
    setStarsMark: Dispatch<SetStateAction<number>>,
    setStarsStatus: Dispatch<SetStateAction<string[]>>): void => {
    if (starsMark !== 5) {
      setStarsMark(starsMark + 1)
    } else {
      setStarsMark(0)
    }

    switch (starsMark) {
      case 0:
        setStarsStatus(['no', 'no', 'no', 'no', 'no'])
        break
      case 1:
        setStarsStatus(['selected', 'no', 'no', 'no', 'no'])
        break
      case 2:
        setStarsStatus(['selected', 'selected', 'no', 'no', 'no'])
        break
      case 3:
        setStarsStatus(['selected', 'selected', 'selected', 'no', 'no'])
        break
      case 4:
        setStarsStatus(['selected', 'selected', 'selected', 'selected', 'no'])
        break
      case 5:
        setStarsStatus(['selected', 'selected', 'selected', 'selected', 'selected'])
        break
      default:
        break
    }
  }

  return (
    <Modal open={props.open} onClose={handleValidationClose} >
      <div className='modal-validation'>
        {props.type === ModalType.DELETE
          ? <div className='modal-validation__title'>
              { t('modal.deleteTitle') }
            </div>
          : props.type === ModalType.NOTATION
            ? <div className='modal-validation__title'>
                { t('modal.notationTitle') }
              </div>
            : props.type === ModalType.COMMENT
              ? <div className='modal-validation__title'>
                  { t('modal.commentTitle') }
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
        {props.type === ModalType.EXCLUSION
          ? <div className='modal-validation__subtitle'>
              { t('modal.exclude.subtitle') }
            </div>
          : null
        }
        {props.type === ModalType.DELETE_GROUP
          ? <div className='modal-validation__subtitle'>
              { t('modal.delete.groups.subtitle') }
            </div>
          : null
        }
        {props.type === ModalType.NOTATION
          ? <div>
              <div className='modal-validation__subtitle'>
                { t('modal.notation.subtitle') }
              </div>
              <div className='modal-validation__first-stars'>
                <p>Qualité du travail </p>
                <div
                  className='std-profile-content__mark'
                  onClick={() => { handleChangeStars(starsQualityMark, setStarsQualityMark, setStarsQualityStatus) }}
                >
                  {
                    starsQualityStatus.map((item, index) => {
                      if (item === 'selected') {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars-selected' key={index} />
                      } else {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars' key={index} />
                      }
                    })
                  }
                </div>
              </div>
              <div className='modal-validation__stars'>
                <p>Respect des délais </p>
                <div
                  className='std-profile-content__mark'
                  onClick={() => { handleChangeStars(starsRespectMark, setStarsRespectMark, setStarsRespectStatus) }}
                >
                  {
                    starsRespectStatus.map((item, index) => {
                      if (item === 'selected') {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars-selected' key={index} />
                      } else {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars' key={index} />
                      }
                    })
                  }
                </div>
              </div>
              <div className='modal-validation__stars'>
                <p>Communication </p>
                <div
                  className='std-profile-content__mark'
                  onClick={() => { handleChangeStars(starsCommunicationMark, setStarsCommunicationMark, setStarsCommunicationStatus) }}
                >
                  {
                    starsCommunicationStatus.map((item, index) => {
                      if (item === 'selected') {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars-selected' key={index} />
                      } else {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars' key={index} />
                      }
                    })
                  }
                </div>
              </div>
              <div className='modal-validation__stars'>
                <p>Collaboration d'équipe </p>
                <div
                  className='std-profile-content__mark'
                  onClick={() => { handleChangeStars(starsCollabMark, setStarsCollabMark, setStarsCollabStatus) }}
                >
                  {
                    starsCollabStatus.map((item, index) => {
                      if (item === 'selected') {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars-selected' key={index} />
                      } else {
                        return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars' key={index} />
                      }
                    })
                  }
                </div>
              </div>
            </div>
          : null
        }
        {props.type === ModalType.COMMENT
          ? <div className='modal-validation__container'>
              <div className='modal-validation__subtitle'>
                { t('modal.comment.subtitle') }
              </div>
              <textarea
                className='modal-validation__textarea'
                maxLength={maxChars}
                value={inputText}
                onChange={handleTextChange}
              />
              <div className='modal-validation__char-count'>
                {maxChars - inputText.length} { t('modal.remaining_char') }
              </div>
            </div>
          : null
        }
        {props.type === ModalType.LEAVE
          ? <div className='modal-validation__subtitle'>
              { t('modal.leave.subtitle') }
            </div>
          : null
        }
        { props.type !== ModalType.NOTATION && props.type !== ModalType.COMMENT
          ? <p className='modal-validation__subject'> "{ props.subject }" ? </p>
          : null
        }
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
            ? <ClassicButton title='Supprimer' refuse onClick={handleDeleteClose} />
            : null
          }
          { props.type === ModalType.EXCLUSION
            ? <ClassicButton title='Exclure' refuse onClick={handleValidation} />
            : null
          }
          { props.type === ModalType.DELETE_GROUP
            ? <ClassicButton title='Supprimer' refuse onClick={handleValidation} />
            : null
          }
          { props.type === ModalType.NOTATION
            ? <ClassicButton title='Confirmer' onClick={handleValidation} />
            : null
          }
          { props.type === ModalType.COMMENT
            ? <ClassicButton title='Confirmer' onClick={handleValidation} />
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
