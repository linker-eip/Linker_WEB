import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import CardTicketAnswerAdmin from '../card/CardTicketAnswerAdmin'
import { Card, CardContent, Stack, Typography, TextField, Button } from '@mui/material'

interface Props {
  ticketId: number
  open: boolean
  onClose: () => void
}

function ModalTicket (props: Props): JSX.Element {
  const { ticketId, open, onClose } = props
  const [ticket, setTicket] = useState<any>()
  const [responseContent, setResponseContent] = useState<string>('')

  const fetchTicketData = async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/ticket/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      const formattedData = {
        id: data.id,
        authorId: data.authorId,
        authorType: data.authorType,
        title: data.title,
        content: data.content,
        attachment: data.attachment,
        ticketType: data.ticketType,
        entityId: data.entityId,
        state: data.state,
        date: data.date,
        answer: data.answer.map((item: any) => ({
          id: item.id,
          author: item.author,
          content: item.content,
          attachment: item.attachment,
          date: item.date
        }))
      }
      setTicket(formattedData)
    } catch (error) {
      console.log(`Erreur lors de la récupération des données: ${String(error)}`)
    }
  }

  useEffect(() => {
    void fetchTicketData()
  }, [ticketId])

  const handleValidationClose = (): void => {
    onClose()
  }

  const handleResponseSubmit = async (): Promise<void> => {
    const formData = new FormData()
    formData.append('content', responseContent)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/ticket/${ticketId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`
        },
        body: formData
      })
      const data = await response.json()
      console.log('Response submitted successfully:', data)
      setResponseContent('')
      await fetchTicketData() // Refresh the ticket data after submitting the response
    } catch (error) {
      console.log('Error submitting response:', error)
    }
  }

  return (
    <Modal open={open} onClose={handleValidationClose}>
      <div className='std-invite-modal'>
        <div className='std-invite-modal__title-section'>
          <div className='std-invite-modal__title'> Ticket : {ticket?.title} </div>
        </div>
        <Stack spacing={2} px={2} py={2}>
          <Card sx={{ width: 380 }}>
            <CardContent>
              <Typography variant='h6' component='div'>
                {ticket?.authorType === 'STUDENT_USER' ? 'Étudiant' : 'Entreprise'}
              </Typography>
              <Typography variant='body2'>
                {ticket?.content}
              </Typography>
            </CardContent>
          </Card>
          {ticket?.answer.length > 0
            ? ticket.answer.map((item: any) => (
              <Stack
                key={item.id}
                alignSelf={item.author === 'ADMIN' ? 'flex-end' : 'flex-start'}
              >
                <CardTicketAnswerAdmin ticketAnswer={item} />
              </Stack>
            ))
            : ''}
          {ticket?.state !== 'CLOSED' && (
            <>
              <TextField
                label="Réponse"
                multiline
                rows={4}
                value={responseContent}
                onChange={(e) => { setResponseContent(e.target.value) }}
                variant="outlined"
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={() => { void handleResponseSubmit() }}>
                Envoyer la réponse
              </Button>
            </>
          )}
        </Stack>
      </div>
    </Modal>
  )
}

export default ModalTicket
