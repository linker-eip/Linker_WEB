import React, { useState, useEffect } from 'react'

import '../../../CSS/Hotbar.scss'

import { MissionStatus, PaymentStatus } from '../../../Enum'

import type { SelectChangeEvent } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import VisibilityIcon from '@mui/icons-material/Visibility'

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, InputAdornment, FormControl, InputLabel, Select,
  MenuItem
} from '@mui/material'

interface UpdatePaymentModel {
  id: number | undefined
  status: PaymentStatus
}

interface StudentRibModel {
  File: string
}

interface StudentModel {
  id: number
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
  studentId: number
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
  [PaymentStatus.WAITING]: 'Demandé par l\'étudiant',
  [PaymentStatus.PAID]: 'Payé'
}

function openUrlInNewWindow (url: string): void {
  if (url.trim() === '') return

  window.open(url, '_blank', 'noopener,noreferrer')
}

const filteredPaymentStatus = Object.entries(paymentStatusMapping)
  .filter(([key]) => key !== 'PENDING' && key !== 'WAITING')

function AdminPaymentsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentData, setCurrentData] = useState<Row | null>(null)

  const [openUpdate, setOpenUpdate] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | ''>('')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/payment`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const filteredData = data
          .filter((item: PaymentsModel) => item.mission.status === 'FINISHED')
          .filter((item: PaymentsModel) => item.status === 'WAITING')
        const formattedData = filteredData.map((item: PaymentsModel) => ({
          id: item.id,
          studentId: item.student.id,
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

  const handleVisualize = (rowData: Row): void => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/documents/studentRib/${rowData.studentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => await response.json())
      .then((data: StudentRibModel) => {
        openUrlInNewWindow(data.File)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération du RIB: ${String(error)}`)
      })
  }

  const handleStatusChange = (event: SelectChangeEvent<string>): void => {
    setSelectedStatus(event.target.value as PaymentStatus)
  }

  const handleOpenUpdate = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenUpdate(true)
  }

  const handleCloseUpdate = (): void => {
    setSelectedStatus('')
    setOpenUpdate(false)
  }

  const handleUpdate = (): void => {
    const payload: UpdatePaymentModel = {
      id: currentData?.id,
      status: selectedStatus as PaymentStatus
    }

    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/payment`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        handleCloseUpdate()
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la modification du paiement: ${String(error)}`)
      })
  }

  const [fieldValidity, setFieldValidity] = useState({
    paymentStatusValid: true
  })

  useEffect(() => {
    const isValid = {
      paymentStatusValid: selectedStatus.trim() !== ''
    }
    setFieldValidity(isValid)
  }, [selectedStatus])

  const isFormValid = (): boolean => {
    return Object.values(fieldValidity).every(value => value)
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
                  RIB
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
              {rows.map((row) => {
                if (
                  row.missionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  row.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  row.paymentStatus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  row.paymentAmount?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                      <TableCell align='center'>
                        <IconButton onClick={() => { handleVisualize(row) }}>
                          <VisibilityIcon fontSize='large' />
                        </IconButton>
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
              <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                Modifier le statut d&apos;un paiement
              </DialogTitle>
              <DialogContent>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                    Statut de paiement
                  </InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                    error={!fieldValidity.paymentStatusValid}
                  >
                    {filteredPaymentStatus.map(([key, value]) => (
                      <MenuItem key={key} value={key} sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseUpdate}
                  color="primary"
                  sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => { if (isFormValid()) handleUpdate() }}
                  color="primary"
                  sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                  disabled={!isFormValid()}
                >
                  Modifier
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
