/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent, useState } from 'react'
import '../../../CSS/ModalTaskCreation.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import ClassicButton from '../../../Component/ClassicButton'
import MissionApi from '../../../API/MissionApi'

interface Props {
  open: boolean
  taskId: number
  name: string
  description: string
  amount: number
  onClose: () => void
  onValidation: () => void
}

function ModalTaskEdition (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [name, setName] = useState(props.name)
  const [description, setDescription] = useState(props.description)
  const [price, setPrice] = useState<number>(props.amount)
  const maxLengthDesc = 300
  const maxLengthName = 100

  const [errorName, setErrorName] = useState(false)
  const [errorDesc, setErrorDesc] = useState(false)
  const [errorPrice, setErrorPrice] = useState(false)

  const checkError = (): void => {
    if (name.length === 0) {
      setErrorName(true)
    } else {
      setErrorName(false)
    }
    if (description.length === 0) {
      setErrorDesc(true)
    } else {
      setErrorDesc(false)
    } if (price <= 0) {
      setErrorPrice(true)
    } else {
      setErrorPrice(false)
    }
  }

  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
    if (name.length === 0) {
      setErrorName(true)
    } else {
      setErrorName(false)
    }
  }

  const handleDesc = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
    if (description.length === 0) {
      setErrorDesc(true)
    } else {
      setErrorDesc(false)
    }
  }

  const handlePrice = (event: ChangeEvent<HTMLInputElement>): void => {
    const parsedNumber = parseFloat(event.target.value)
    setPrice(isNaN(parsedNumber) ? 0 : parsedNumber)
    if (price <= 0) {
      setErrorPrice(true)
    } else {
      setErrorPrice(false)
    }
  }

  const handleValidation = async (): Promise<void> => {
    checkError()

    if (name.length > 0 && description.length > 0 && price > 0) {
      const data = {
        name,
        description,
        amount: price,
        studentId: null,
        skills: ''
      }
      MissionApi.editTask(localStorage.getItem('jwtToken') as string, props.taskId, data)
      props.onValidation()
    }
  }

  return (
    <Modal open={props.open} onClose={props.onClose} >
        <div className='cpn-modal-task'>
            <div className='cpn-modal-task__title'>
                Modification de la tâche
            </div>
            <div className='cpn-modal-task__section'>
              <TextField
                defaultValue={name}
                onChange={handleName}
                variant='outlined'
                id="standard-required"
                label={t('company.detailed_mission.task.name')}
                inputProps={{ maxLength: maxLengthName }}
                error={errorName}
                helperText={errorName ? 'Veuillez rentrer un nom pour votre tâche.' : false}
              />
              <TextField
                defaultValue={description}
                onChange={handleDesc}
                variant='outlined'
                id="outlined-multiline-static fullWidth"
                label={t('company.detailed_mission.task.description')}
                inputProps={{ maxLength: maxLengthDesc }}
                maxRows={4}
                fullWidth
                multiline
                error={errorDesc}
                helperText={errorDesc ? 'Veuillez rentrer une description pour votre tâche.' : false}
              />
              <TextField
                defaultValue={price}
                onChange={handlePrice}
                variant='outlined'
                id="outlined-number"
                label={t('company.detailed_mission.task.price')}
                type='number'
                inputProps={{ maxLengthDesc }}
                InputLabelProps={{
                  shrink: true
                }}
                error={errorPrice}
                helperText={errorPrice ? 'Veuillez rentrer un prix pour votre tâche.' : false}
              />
              <div className='cpn-modal-task__button-section'>
                <ClassicButton title='Valider' onClick={handleValidation} />
                <ClassicButton title='Annuler' cancelled onClick={props.onClose}/>
              </div>
            </div>
        </div>
    </Modal>
  )
}

export default ModalTaskEdition
