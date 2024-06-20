import React, { useState, useEffect } from 'react'
import '../../../CSS/Hotbar.scss'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import { MissionStatus, PaymentStatus } from '../../../Enum'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, DialogContentText, InputAdornment
} from '@mui/material'

interface StudentModel {
  email: string
}

interface MissionModel {
  name: string
  status: MissionStatus
}

interface PaymentsModel {
  id: number
  mission: MissionModel
  student: StudentModel
  status: PaymentStatus
  amount: number
}

interface Row {
  id: number
  missionName: string
  missionStatus: MissionStatus
  studentEmail: string
  paymentStatus: PaymentStatus
  paymentAmount: number
}

const missionStatusMapping: { [key in MissionStatus]: string } = {
  [MissionStatus.PENDING]: 'En attente',
  [MissionStatus.ACCEPTED]: 'Acceptée',
  [MissionStatus.PROVISIONED]: 'Provisionnée',
  [MissionStatus.IN_PROGRESS]: 'En cours',
  [MissionStatus.FINISHED]: 'Terminée',
  [MissionStatus.CANCELLED]: 'Annulée',
  [MissionStatus.GROUP_ACCEPTED]: 'Groupe accepté'
}

const paymentStatusMapping: { [key in PaymentStatus]: string } = {
  [PaymentStatus.PENDING]: 'En attente',
  [PaymentStatus.MISSING_RIB]: 'RIB manquant',
  [PaymentStatus.WAITING]: 'En attente',
  [PaymentStatus.PAID]: 'Payée'
}

function AdminPaymentsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentData, setCurrentData] = useState<Row | null>(null)

  const [openUpdate, setOpenUpdate] = useState(false)

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/admin/payment')
      .then(async response => await response.json())
      .then(data => {
        const filteredData = data
          .filter((item: PaymentsModel) => item.mission.status === 'FINISHED')
          .filter((item: PaymentsModel) => item.status !== 'PENDING')
        const formattedData = filteredData.map((item: PaymentsModel) => ({
          id: item.id,
          missionName: item.mission.name,
          missionStatus: missionStatusMapping[item.mission.status],
          studentEmail: item.student.email,
          paymentStatus: paymentStatusMapping[item.status],
          paymentAmount: item.amount
        }))
        setRows(formattedData)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const handleOpenUpdate = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenUpdate(true)
  }

  const handleCloseUpdate = (): void => {
    setOpenUpdate(false)
  }

  const handleUpdate = async (): Promise<void> => {
    console.log(currentData)
  }

  const pendingDocuments = rows.filter(row => row.paymentStatus === 'PENDING')

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <div>
          <TextField
            fullWidth
            id="search-bar"
            type="search"
            variant="outlined"
            placeholder="Rechercher un paiement"
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
                  }}
                >
                  Mission
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
                  }}
                >
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
                  }}
                >
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
                  }}
                >
                  Paiement
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
                  }}
                >
                  Montant
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
                  }}
                >
                  Modifier
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingDocuments.map((row) => {
              if (
                row.missionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <TableRow key={row.id}>
                    <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                      {row.missionName}
                    </TableCell>
                    <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                      {row.missionStatus}
                    </TableCell>
                    <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                      {row.studentEmail}
                    </TableCell>
                    <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                      {row.paymentStatus}
                    </TableCell>
                    <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                      {row.paymentAmount}€
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { handleOpenUpdate(row) }}>
                        <EditIcon fontSize='large' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              }
              return null
            })}
          </TableBody>
          {/* MODALE POUR MODIFIER */}
          <Dialog open={openUpdate} onClose={handleCloseUpdate}>
            <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Modifier un paiement</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Êtes-vous sûr de vouloir modifier le statut de ce paiement ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseUpdate}
                color="primary"
                sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
              >
                Non
              </Button>
              <Button
                onClick={() => { handleUpdate() }}
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

export default AdminPaymentsContent
