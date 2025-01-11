import CloseIcon from '@mui/icons-material/Close'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../../CSS/Hotbar.scss'
import type { TicketType } from '../../../Enum'
import { UserType, TicketState } from '../../../Enum'
import ModalTicket from '../components/modal/ModalTicket'

interface Row {
  id: number
  authorId: number
  authorType: UserType
  title: string
  content: string
  attachment: string
  ticketType: TicketType
  entityId: number
  state: TicketState
  date: Date
}

function dateFormater (date: Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function AdminTicketsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [ticketsModal, setTicketsModal] = useState<boolean>(false)
  const closeTicketsModal = (): void => {
    setTicketsModal(false)
  }
  const [selectedTicketId, setSelectedTicketId] = useState<number>(0)
  const [openClose, setOpenClose] = useState(false)
  const [ticketToClose, setTicketToClose] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCloseClose = (): void => {
    setOpenClose(false)
    setTicketToClose(null)
  }

  const handleCloseTicket = async (): Promise<void> => {
    if (ticketToClose !== null) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/ticket/${ticketToClose}/close`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la clôture du ticket.')
        }
        handleCloseClose()
        window.location.reload()
      } catch (error) {
        alert(`Erreur : ${String(error)}`)
      }
    }
  }

  const openTicketsModal = (ticketId: number): void => {
    setSelectedTicketId(ticketId)
    setTicketsModal(true)
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/ticket`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          authorId: item.authorId,
          authorType: item.authorType,
          title: item.title,
          content: item.content,
          attachment: item.attachment,
          ticketType: item.ticketType,
          entityId: item.entityId,
          state: item.state,
          date: item.date
        }))
        setRows(formattedData)
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const confirmCloseTicket = (ticketId: number): void => {
    setTicketToClose(ticketId)
    setOpenClose(true)
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <TextField
          label="Rechercher un ticket"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
          sx={{ flex: 1, width: '100vh', marginRight: '10vh' }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="Invoices table">
            <TableHead>
              <TableRow>
                <TableCell
                  align='center'
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#FFFFFF',
                    backgroundColor: '#005275',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                  }}>
                  Titre
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#FFFFFF',
                    backgroundColor: '#005275',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                  }}>
                  Auteur
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#FFFFFF',
                    backgroundColor: '#005275',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                  }}>
                  Type
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#FFFFFF',
                    backgroundColor: '#005275',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                  }}>
                  Statut
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#FFFFFF',
                    backgroundColor: '#005275',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                  }}>
                  Date
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#FFFFFF',
                    backgroundColor: '#005275',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                  }}>
                  Voir
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#FFFFFF',
                    backgroundColor: '#005275',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                  }}>
                  Clôturer
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => {
                if (searchTerm === '' || row.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return (
                    <TableRow key={row.id}>
                      <TableCell
                        align='center'
                        sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                      >
                        {row.authorType === UserType.STUDENT_USER ? 'Étudiant' : 'Entreprise'}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                      >
                        {row.ticketType}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                      >
                        {row.state === TicketState.OPEN ? 'Ouvert' : 'Fermé'}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                      >
                        {dateFormater(row.date)}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => { openTicketsModal(row.id) }}>
                          <RemoveRedEyeIcon fontSize='large' />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => { confirmCloseTicket(row.id) }}>
                          <CloseIcon fontSize='large' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                }
                return null
              })}
            </TableBody>
            {ticketsModal && selectedTicketId !== 0 &&
              <ModalTicket open={ticketsModal} onClose={closeTicketsModal} ticketId={selectedTicketId} />
            }
            <Dialog open={openClose} onClose={handleCloseClose}>
              <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Clôturer le ticket
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                  Es-tu sûr de vouloir clôturer ce ticket ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseClose} color="primary" sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                  Non
                </Button>
                <Button
                  onClick={() => { void handleCloseTicket() }}
                  color="primary"
                  sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                >
                  Oui
                </Button>
              </DialogActions>
            </Dialog>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default AdminTicketsContent
