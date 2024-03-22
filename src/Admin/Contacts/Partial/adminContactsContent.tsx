import '../../../CSS/Hotbar.scss'
import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import ArchiveIcon from '@mui/icons-material/Archive'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, DialogContentText, InputAdornment
} from '@mui/material'

interface Row {
  id: number
  email: string
  object: string
  content: string
  createdAt: Date
  isTreated: boolean
}

function AdminContactsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentData, setCurrentData] = useState<Row | null>(null)

  const [openVisualize, setOpenVisualize] = useState(false)
  const [openArchivate, setOpenArchivate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/admin/contact')
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

  const handleVisualize = (): void => {}

  const handleOpenArchivate = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenArchivate(true)
  }

  const handleCloseArchivate = (): void => {
    setOpenArchivate(false)
  }

  const handleArchivate = (): void => {
    const payload = { isTreated: true }
    fetch(`https://dev.linker-app.fr/api/admin/contact/${String(currentData?.id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(async response => await response.json())
      .then(() => {
        handleCloseArchivate()
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la modifcation de la demande de contact: ${String(error)}`)
      })
  }

  const handleOpenDelete = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenDelete(true)
  }

  const handleCloseDelete = (): void => {
    setOpenDelete(false)
  }

  const handleDelete = (): void => {
    fetch(`https://dev.linker-app.fr/api/admin/contact/${String(currentData?.id)}`, {
      method: 'DELETE'
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
                  Archiver
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
            {rows.filter(row => !row.isTreated).map((row) => {
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
                      <IconButton onClick={() => { handleOpenArchivate(row) }}>
                        <ArchiveIcon fontSize='large' />
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
          <Dialog open={openVisualize} onClose={handleCloseVisualize}>
            <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Valider un document</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Êtes-vous sûr de vouloir valider ce document ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseVisualize}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Non
              </Button>
              <Button
                onClick={() => { handleVisualize() }}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Oui
              </Button>
            </DialogActions>
          </Dialog>
          {/* MODALE POUR ARCHIVER */}
          <Dialog open={openArchivate} onClose={handleCloseArchivate}>
            <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Archiver une demande</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Êtes-vous sûr de vouloir archiver cette demande de contact ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseArchivate}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Non
              </Button>
              <Button
                onClick={() => { handleArchivate() }}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Oui
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

export default AdminContactsContent
