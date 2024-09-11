import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

interface CardTicketAnswerAdminProps {
  ticketAnswer: any
}

function CardTicketAnswerAdmin (props: CardTicketAnswerAdminProps): JSX.Element {
  const { ticketAnswer } = props

  return (
    <Card sx={{ width: 380 }}>
      <CardContent>
        <Typography
          variant='h6'
          component='div'
          sx={{ textAlign: ticketAnswer.author === 'ADMIN' ? 'right' : 'left' }}
        >
          {ticketAnswer.author}
        </Typography>
        <Typography variant='body2'>
          {ticketAnswer.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardTicketAnswerAdmin
