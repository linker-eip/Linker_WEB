import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import '../../../CSS/Hotbar.scss'
import { TicketStateEnum, TicketTypeEnum, UserType } from '../../../Enum'

interface Row {
  id: number
  authorId: number
  authorType: UserType
  title: string
  content: string
  attachment: string
  ticketType: TicketTypeEnum
  entityId: number
  state : TicketStateEnum
  date : Date
}

function AdminTicketsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/ticket`)
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
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
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
                  Modifier
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
                  Supprimer
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
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
                        {row.authorId}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => { }}>
                          <EditIcon fontSize='large' />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => { }}>
                          <DeleteIcon fontSize='large' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
            </TableBody>
            {/* MODALE POUR SUPPRIMER */}
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default AdminTicketsContent
