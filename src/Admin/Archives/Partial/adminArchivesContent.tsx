import '../../../CSS/Hotbar.scss'
import React, { useState, useEffect } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import SubjectIcon from '@mui/icons-material/Subject'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, DialogContentText, InputAdornment, Stack
} from '@mui/material'

interface Row {
  id: number
  email: string
  object: string
  content: string
  createdAt: Date
  isTreated: boolean
}

function AdminArchivesContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentData, setCurrentData] = useState<Row | null>(null)

  const [openVisualize, setOpenVisualize] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/contact`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const formattedData = data.map((item: Row) => ({
          id: item.id,
          email: item.email,
          object: item.object,
          content: item.content,
          createdAt: item.createdAt,
          isTreated: item.isTreated
        }))
        setRows(formattedData)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const handleOpenVisualize = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenVisualize(true)
  }

  const handleCloseVisualize = (): void => {
    setOpenVisualize(false)
  }

  const handleOpenDelete = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenDelete(true)
  }

  const handleCloseDelete = (): void => {
    setOpenDelete(false)
  }

  const handleDelete = (): void => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/contact/${String(currentData?.id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        handleCloseDelete()
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la suppression de la demande de contact: ${String(error)}`)
      })
  }

  return (
    <div className='std-document-content'>
    <div className='std-document-card'>
      <div>
        <TextField
          fullWidth
          id="search-bar"
          type="search"
          variant="outlined"
          placeholder="Rechercher une demande"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{
            width: '100%',
            margin: '20px 0',
            marginTop: 1,
            marginBottom: 1,
            borderRadius: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px'
            }
          }}
        />
      </div>
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
                  ID
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
                  Email
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
                  Objet
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
                  Visualiser
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
            {rows.filter(row => row.isTreated).map((row) => {
              if (
                row.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.email?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.object?.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <TableRow key={row.id}>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.object}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {new Date(row.createdAt).toLocaleDateString('fr-FR', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenVisualize(row) }}>
                        <VisibilityIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenDelete(row) }}>
                        <DeleteIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              }
              return null
            })}
          </TableBody>
          {/* MODALE POUR VISUALISER */}
          <Dialog
            open={openVisualize}
            onClose={handleCloseVisualize}
            maxWidth={false}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& .MuiDialog-paper': {
                width: '900px',
                height: '400px'
              }
            }}
          >
            <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
              Détails de la demande
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <DialogContentText
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                    fontSize: '20px',
                    color: 'black'
                  }}
                >
                  <EmailIcon sx={{ color: '#3DA1CC', marginRight: '10px' }} /> Email - {currentData?.email}
                </DialogContentText>
                <DialogContentText
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                    fontSize: '20px',
                    color: 'black'
                  }}
                >
                  <SubjectIcon sx={{ color: '#3DA1CC', marginRight: '10px' }} /> Objet de la demande - {currentData?.object}
                </DialogContentText>
                <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px', color: 'black' }}>
                  <TextField
                    multiline
                    rows={4}
                    value={currentData?.content}
                    variant="outlined"
                    sx={{ width: '100%', fontFamily: 'Poppins', fontSize: '20px', color: 'black' }}
                    InputProps={{
                      readOnly: true,
                      style: {
                        fontFamily: 'Poppins',
                        fontSize: '20px',
                        color: 'black'
                      }
                    }}
                  />
                </DialogContentText>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseVisualize}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
          {/* MODALE POUR SUPPRIMER */}
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Supprimer une demande</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Êtes-vous sûr de vouloir supprimer cette demande de contact ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDelete}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Non
              </Button>
              <Button
                onClick={() => { handleDelete() }}
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

export default AdminArchivesContent
