import React, { type ChangeEvent, useState } from 'react'
import '../CSS/ReportButton.scss'
import type { TicketType } from '../Enum'
import { Modal, Snackbar, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ClassicButton from './ClassicButton'
import ReportApi from '../API/ReportApi'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Props {
  TicketType: TicketType
  id: number | undefined
}

function ReportButton (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [snackbarValue, setSnackbarValue] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const handleTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }

  const [description, setDescription] = useState<string>('')
  const handleDescription = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
  }

  const openModal = (): void => {
    setModal(true)
  }

  const closeModal = (): void => {
    setModal(false)
  }

  const openSnackbar = (): void => {
    setSnackbarValue(true)
  }

  const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarValue(false)
  }

  const sendTicket = async (): Promise<void> => {
    const data = {
      title,
      content: description,
      entityId: props.id,
      ticketType: props.TicketType
    }
    if (title.length <= 2 || description.length <= 2) {
      openSnackbar()
      return
    }
    await ReportApi.createTicket(localStorage.getItem('jwtToken') as string, data)
    closeModal()
    setTitle('')
    setDescription('')
  }

  return (
    <div className='report-btn'>
      <img className='report-btn__img' src='/assets/Report-clicked.svg' onClick={openModal} />
      <Modal open={modal} onClose={closeModal}>
        <div className='report-btn__modal'>
          <div className='report-btn__title'> { t('report.modal_title')} </div>
          <div className='report-btn__section'>
            <div className='report-btn__subtitle'> { t('report.title') } </div>
            <TextField
                className='report-btn__input'
                value={title}
                onChange={handleTitle}
                variant='outlined'
              />
          </div>
          <div className='report-btn__section'>
            <div className='report-btn__subtitle'> { t('report.description') } </div>
            <TextField
                className='report-btn__input'
                value={description}
                onChange={handleDescription}
                multiline
                maxRows={8}
                minRows={8}
                variant='outlined'
              />
          </div>
          <div className='report-btn__button-section'>
            <ClassicButton cancelled title={ t('report.cancel') } onClick={closeModal} />
            <ClassicButton title={ t('report.send') } onClick={() => { sendTicket() }} />
          </div>
        </div>
      </Modal>
      <Snackbar open={snackbarValue} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          { t('report.snackbar') }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ReportButton
