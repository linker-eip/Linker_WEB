import React, { useState, useEffect } from 'react'
import '../../../CSS/Hotbar.scss'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, DialogContentText, Typography } from '@mui/material'

interface Row {
  id: number
  companyId: number
  name: string
  companyName: string
  studentsIds: string[]
  status: string
}

interface NewMissionData {
  name: string
  description: string
  amount: number
  companyId: number
  studentsIds: number[]
}

function AdminMissionsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [currentData, setCurrentData] = useState<Row | null>(null)
  const [newMissionData, setNewMissionData] = useState<NewMissionData>({
    name: '',
    description: '',
    amount: 0,
    companyId: 0,
    studentsIds: []
  })

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/admin/mission')
      .then(async response => await response.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          companyId: item.companyId,
          name: item.name,
          companyName: item.company.companyName,
          studentsIds: item.studentsIds,
          status: item.status
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
      name: currentData?.name,
      status: currentData?.status
    }

    fetch(`https://dev.linker-app.fr/api/admin/mission/${String(currentData?.id)}`, {
      method: 'PUT',
      headers: {
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
        alert(`Erreur lors de la modifcation de la mission: ${String(error)}`)
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
    fetch(`https://dev.linker-app.fr/api/admin/mission/${String(currentData?.id)}`, {
      method: 'DELETE'
    })
      .then(() => {
        setOpenDelete(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la suppression de la mission: ${String(error)}`)
      })
  }

  const handleCreate = (): void => {
    const payload = {
      name: newMissionData.name,
      description: newMissionData.description,
      startOfMission: new Date().toISOString(),
      endOfMission: new Date().toISOString(),
      amount: newMissionData.amount,
      companyId: newMissionData.companyId,
      studentsIds: newMissionData.studentsIds
    }

    fetch('https://dev.linker-app.fr/api/admin/mission/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setOpenCreate(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la création de la mission: ${String(error)}`)
      })
  }

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='std-document-content'>
    <div className='std-document-card'>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          label="Rechercher une mission"
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
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
          >
            Créer une mission
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
                  Entreprise
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
                  Étudiant(s)
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
                row.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <TableRow key={row.id}>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.companyName}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.studentsIds?.length > 0 ? row.studentsIds.join(', ') : ''}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenEdit(row) }}>
                        <EditIcon fontSize='large' />
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
        {/* MODALE POUR MODIFIER */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Modifier la mission</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Titre"
              fullWidth
              value={currentData?.name}
              onChange={(e) => {
                if (currentData !== null && currentData !== undefined) {
                  setCurrentData({ ...currentData, name: e.target.value })
                }
              }}
            />
            <TextField
              margin="dense"
              label="État"
              fullWidth
              value={currentData?.status}
              onChange={(e) => {
                if (currentData !== null && currentData !== undefined) {
                  setCurrentData({ ...currentData, status: e.target.value })
                }
              }}
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
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
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Supprimer la mission</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
              Êtes-vous sûr de vouloir supprimer cette mission ?
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
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Créer une nouvelle mission</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Titre"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewMissionData({ ...newMissionData, name: e.target.value }) }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewMissionData({ ...newMissionData, description: e.target.value }) }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Prix"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewMissionData({ ...newMissionData, amount: parseInt(e.target.value) }) }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="ID Étudiant(s)"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => {
                const ids = e.target.value.split(',').map(id => parseInt(id.trim(), 10))
                setNewMissionData({ ...newMissionData, studentsIds: ids })
              }}
            />
            <TextField
              fullWidth
              margin="dense"
              label="ID Entreprise"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              onChange={(e) => { setNewMissionData({ ...newMissionData, companyId: parseInt(e.target.value) }) }}
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

export default AdminMissionsContent
