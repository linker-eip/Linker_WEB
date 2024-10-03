import React, { useState, useEffect } from 'react'
import '../../../CSS/Hotbar.scss'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, DialogContentText, Typography } from '@mui/material'

interface Row {
  id: number
  email: string
  FirstName: string
  LastName: string
  isActive: boolean
}

interface NewUserData {
  email: string
  password: string
  firstName: string
  lastName: string
}

function AdminUsersContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [currentData, setCurrentData] = useState<Row | null>(null)
  const [newUserData, setNewUserData] = useState<NewUserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/users/students`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          email: item.email,
          FirstName: item.FirstName,
          LastName: item.LastName,
          isActive: item.isActive
        }))
        setRows(formattedData)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const handleOpenEdit = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenEdit(true)
  }

  const handleCloseEdit = (): void => {
    setOpenEdit(false)
  }

  const handleUpdate = (): void => {
    const payload = {
      firstName: currentData?.FirstName,
      lastName: currentData?.LastName
    }

    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/users/student/${String(currentData?.id)}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(async response => await response.json())
      .then(() => {
        setOpenEdit(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la modifcation de l'utilisateur: ${String(error)}`)
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
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/users/student/${String(currentData?.id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setOpenDelete(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la suppression de l'utilisateur: ${String(error)}`)
      })
  }

  const handleCreate = (): void => {
    const payload = {
      email: newUserData.email,
      password: newUserData.password,
      firstName: newUserData.firstName,
      lastName: newUserData.lastName
    }

    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/users/student`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setOpenCreate(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la création de l'utilisateur: ${String(error)}`)
      })
  }

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='std-document-content'>
    <div className='std-document-card'>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          label="Rechercher un utilisateur"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
          sx={{ flex: 1, width: '100vh', marginRight: '10vh' }}
        />
        <Button
          onClick={() => { setOpenCreate(true) }}
          endIcon={<CreateIcon fontSize='large' />}
          >
          <Typography
            sx={{ flex: 1, fontFamily: 'Poppins', fontSize: '20px' }}
          >
            Créer un utilisateur
          </Typography>
        </Button>
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
                  Nom
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
                  État
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
              if (
                row.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.email?.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <TableRow key={row.id}>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {`${row.FirstName} ${row.LastName}`}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {String(row.isActive).toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => { handleOpenEdit(row) }}>
                        <EditIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => { handleOpenDelete(row) }}>
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              }
              return null
            })}
        </TableBody>
        {/* MODALE POUR MODIFIER */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Modifier un utilisateur</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Prénom"
              fullWidth
              value={currentData?.FirstName}
              onChange={(e) => {
                if (currentData !== null && currentData !== undefined) {
                  setCurrentData({ ...currentData, FirstName: e.target.value })
                }
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Nom"
              fullWidth
              value={currentData?.LastName}
              onChange={(e) => {
                if (currentData !== null && currentData !== undefined) {
                  setCurrentData({ ...currentData, LastName: e.target.value })
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseEdit}
              color="primary"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleUpdate}
              color="primary"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            >
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
        {/* MODALE POUR SUPPRIMER */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Supprimer un utilisateur</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ?
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
              onClick={handleDelete}
              color="primary"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            >
              Oui
            </Button>
          </DialogActions>
        </Dialog>
        {/* MODALE POUR CREER */}
        <Dialog open={openCreate} onClose={() => { setOpenCreate(false) }}>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Créer un nouvel utilisateur</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewUserData({ ...newUserData, email: e.target.value }) }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Mot de passe"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewUserData({ ...newUserData, password: e.target.value }) }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Prénom"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewUserData({ ...newUserData, firstName: e.target.value }) }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Nom"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewUserData({ ...newUserData, lastName: e.target.value }) }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => { setOpenCreate(false) }}
              color="primary"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            >
              Annuler
            </Button>
            <Button
              onClick={() => {
                handleCreate()
                setOpenCreate(false)
              }}
              color="primary"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            >
              Créer
            </Button>
          </DialogActions>
        </Dialog>
        </Table>
      </TableContainer>
    </div>
  </div>
  )
}

export default AdminUsersContent
