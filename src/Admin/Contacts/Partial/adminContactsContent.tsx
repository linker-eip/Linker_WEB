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

  const [openDeny, setOpenDeny] = useState(false)
  const [openValidate, setOpenValidate] = useState(false)

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

  const handleVisualize = (rowData: Row): void => {
    console.log('handleVisualize')
  }

  const handleOpenValidate = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenValidate(true)
  }

  const handleCloseValidate = (): void => {
    setOpenValidate(false)
  }

  const handleValidate = (): void => {
    console.log('handleValidate')
  }

  const handleOpenDeny = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenDeny(true)
  }

  const handleCloseDeny = (): void => {
    setOpenDeny(false)
  }

  const handleDeny = (): void => {
    console.log('handleDeny', currentData)
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
            {rows.map((row) => {
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
                      <IconButton onClick={() => { handleVisualize(row) }}>
                        <VisibilityIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenValidate(row) }}>
                        <ArchiveIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenDeny(row) }}>
                        <DeleteIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              }
              return null
            })}
          </TableBody>
          {/* MODALE POUR VALIDER */}
          <Dialog open={openValidate} onClose={handleCloseValidate}>
            <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Valider un document</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Êtes-vous sûr de vouloir valider ce document ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseValidate}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Non
              </Button>
              <Button
                onClick={() => { handleValidate() }}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Oui
              </Button>
            </DialogActions>
          </Dialog>
          {/* MODALE POUR REFUSER */}
          <Dialog open={openDeny} onClose={handleCloseDeny}>
            <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Refuser un document</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Êtes-vous sûr de vouloir refuser ce document ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDeny}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Non
              </Button>
              <Button
                onClick={() => { handleDeny() }}
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
