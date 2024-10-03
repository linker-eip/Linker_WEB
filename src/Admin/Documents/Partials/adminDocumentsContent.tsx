import React, { useState, useEffect } from 'react'
import '../../../CSS/Hotbar.scss'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, DialogContentText, Typography } from '@mui/material'
import DropZone from '../../../Component/DropZone'

interface Row {
  id: number
  documentType: string
  userId: number
  createdAt: string
}

interface NewDocumentData {
  file: any
  documentType: string
  documentUser: string
  userId: string
}

function AdminDocumentsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [currentData, setCurrentData] = useState<Row | null>(null)
  const [newDocumentData, setNewDocumentData] = useState<NewDocumentData>({
    file: null,
    documentType: '',
    documentUser: '',
    userId: ''
  })

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/documents`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          documentType: item.documentType,
          userId: item.userId,
          createdAt: item.createdAt
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

  const handleUpdate = async (): Promise<void> => {
    if (currentData?.id === undefined) {
      alert('ID is missing')
      return
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/documents/${String(currentData?.id)}/download`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `image_${currentData?.id}.png`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        alert(`Error downloading the image: ${response.statusText}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`)
      } else {
        alert('An unknown error occurred')
      }
    }
  }

  const handleOpenDelete = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenDelete(true)
  }

  const handleCloseDelete = (): void => {
    setOpenDelete(false)
  }

  const handleDelete = (): void => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/documents/${String(currentData?.id)}`, {
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
        alert(`Erreur lors de la suppression du document: ${String(error)}`)
      })
  }

  const handleCreate = async (): Promise<void> => {
    const formData = new FormData()
    formData.append('file', newDocumentData.file)
    formData.append('documentType', newDocumentData.documentType)
    formData.append('documentUser', newDocumentData.documentUser)
    formData.append('userId', newDocumentData.userId)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/documents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
          'Content-Type': 'application/json'
        },
        body: formData
      })

      if (response.ok) {
        setOpenCreate(false)
        window.location.reload()
      } else {
        const text = await response.text()
        throw new Error(text)
      }
    } catch (error) {
      alert(`Erreur lors de la création du document: ${String(error)}`)
    }
  }

  const handleFile = (acceptedFiles: any): any => {
    setNewDocumentData({ ...newDocumentData, file: acceptedFiles[0] })
  }

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='std-document-content'>
    <div className='std-document-card'>
      <div>
        <TextField
          label="Rechercher un document"
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
            Créer un document
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
                  ID Utilisateur
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
                  Télécharger
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
                row.documentType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.userId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                      {row.documentType}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                    >
                      {row.userId}
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
                      <IconButton onClick={() => { handleOpenEdit(row) }}>
                        <DownloadIcon fontSize='large' />
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
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Télécharger un document</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Êtes-vous sûr de vouloir télécharger ce document ?
              </DialogContentText>
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
              onClick={() => { handleUpdate() }}
              color="primary"
              sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            >
              Télécharger
            </Button>
          </DialogActions>
        </Dialog>
        {/* MODALE POUR SUPPRIMER */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Supprimer un document</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
              Êtes-vous sûr de vouloir supprimer ce document ?
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
          <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Créer un nouveau document</DialogTitle>
          <DialogContent>
            <form onSubmit={() => handleCreate}>
              <DropZone onObjectChange={handleFile} />
              {
                newDocumentData.file !== null
                  ? <p
                      style={{
                        paddingTop: '10px',
                        paddingBottom: '5px',
                        fontFamily: 'Poppins',
                        fontSize: '20px'
                      }}
                    >
                      Fichier sélectionné : {newDocumentData.file.name}
                    </p>
                  : <p
                      style={{
                        paddingTop: '10px',
                        paddingBottom: '5px',
                        fontFamily: 'Poppins',
                        fontSize: '20px'
                      }}
                    >
                      Aucun fichier sélectionné
                    </p>
              }
              <TextField
                fullWidth
                margin="dense"
                label="Type du document"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                onChange={(e) => { setNewDocumentData({ ...newDocumentData, documentType: e.target.value }) }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Type d'utilisateur"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                onChange={(e) => { setNewDocumentData({ ...newDocumentData, documentUser: e.target.value }) }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="ID Utilisateur"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                onChange={(e) => { setNewDocumentData({ ...newDocumentData, userId: e.target.value }) }}
              />
            </form>
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

export default AdminDocumentsContent
