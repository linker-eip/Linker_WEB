import '../../../CSS/Hotbar.scss'
import React, { useState, useEffect } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, DialogContentText, InputAdornment
} from '@mui/material'

interface Row {
  id: string
  studentId: number
  documentType: string
  file: string
  status: string
  email: string
}

function openUrlInNewWindow (url: string): void {
  if (url.trim() === '') {
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

function AdminVerifyStudentContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentData, setCurrentData] = useState<Row | null>(null)

  const [openDeny, setOpenDeny] = useState(false)
  const [openValidate, setOpenValidate] = useState(false)

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/admin/document-verification/students')
      .then(async response => await response.json())
      .then(async (data: Record<string, Row>) => {
        const formattedData = await Promise.all(
          Object.entries(data).map(async ([key, item]) => {
            const emailResponse = await fetch(`https://dev.linker-app.fr/api/admin/users/student/${item.studentId}`)
            const emailData = await emailResponse.json()
            const email = emailData.email

            return {
              id: key,
              studentId: item.studentId,
              documentType: item.documentType,
              file: item.file,
              status: item.status,
              email
            }
          })
        )
        setRows(formattedData)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const handleVisualize = (rowData: Row): void => {
    openUrlInNewWindow(rowData.file)
  }

  const handleOpenValidate = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenValidate(true)
  }

  const handleCloseValidate = (): void => {
    setOpenValidate(false)
  }

  const handleValidate = async (): Promise<void> => {
    if (currentData != null) {
      try {
        const response = await fetch('https://dev.linker-app.fr/api/admin/document-verification/students/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            studentId: currentData.studentId,
            documentType: currentData.documentType
          })
        })
        if (response.ok) {
          handleCloseValidate()
          window.location.reload()
        } else {
          const text = await response.text()
          throw new Error(text)
        }
      } catch (error) {
        alert(`Erreur lors de la validation du document: ${String(error)}`)
      }
    }
  }

  const handleOpenDeny = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenDeny(true)
  }

  const handleCloseDeny = (): void => {
    setOpenDeny(false)
  }

  const handleDeny = async (): Promise<void> => {
    if (currentData != null) {
      try {
        const response = await fetch('https://dev.linker-app.fr/api/admin/document-verification/students/deny', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            studentId: currentData.studentId,
            documentType: currentData.documentType,
            comment: 'Document refusé.'
          })
        })
        if (response.ok) {
          handleCloseValidate()
          window.location.reload()
        } else {
          const text = await response.text()
          throw new Error(text)
        }
      } catch (error) {
        alert(`Erreur lors du refus du document: ${String(error)}`)
      }
    }
  }

  const pendingDocuments = rows.filter(row => row.status === 'PENDING')

  return (
    <div className='std-document-content'>
    <div className='std-document-card'>
      <div>
        <TextField
          fullWidth
          id="search-bar"
          type="search"
          variant="outlined"
          placeholder="Rechercher un document"
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
                  Étudiant
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
                  Valider
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
                  Refuser
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingDocuments.map((row) => {
              if (
                row.documentType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.email?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                      {row.email}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleVisualize(row) }}>
                        <VisibilityIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenValidate(row) }}>
                        <CheckIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenDeny(row) }}>
                        <CloseIcon fontSize='large' />
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

export default AdminVerifyStudentContent
