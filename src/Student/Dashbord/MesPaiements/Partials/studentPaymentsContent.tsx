import '../../../../CSS/Hotbar.scss'
import React, { useState, useEffect } from 'react'
import { PaymentStatus } from '../../../../Enum'
import SearchIcon from '@mui/icons-material/Search'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  Button, TextField, DialogContentText, InputAdornment
} from '@mui/material'

interface UpdatePaymentModel {
  studentPaymentId: number | undefined
}

interface Row {
  id: number
  missionName: string
  status: PaymentStatus
  amount: number
}

const paymentStatusMapping: { [key in PaymentStatus]: string } = {
  [PaymentStatus.PENDING]: 'En attente',
  [PaymentStatus.MISSING_RIB]: 'RIB manquant',
  [PaymentStatus.WAITING]: 'En cours',
  [PaymentStatus.PAID]: 'Payé'
}

function StudentPaymentsContent (): JSX.Element {
  const [rows, setRows] = useState<Row[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentData, setCurrentData] = useState<Row | null>(null)

  const [openCashOut, setOpenCashOut] = useState(false)

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/payment/student', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const formattedData = data.map((item: Row) => ({
          id: item.id,
          missionName: item.missionName,
          status: paymentStatusMapping[item.status],
          amount: item.amount
        }))
        setRows(formattedData)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const handleOpenCashOut = (rowData: Row): void => {
    setCurrentData(rowData)
    setOpenCashOut(true)
  }

  const handleCloseCashOut = (): void => {
    setOpenCashOut(false)
  }

  const handleCashOut = (): void => {
    const payload: UpdatePaymentModel = {
      studentPaymentId: currentData?.id
    }

    fetch(`https://dev.linker-app.fr/api/payment/student/receive/${String(currentData?.id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        handleCloseCashOut()
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la demande de cash-out: ${String(error)}`)
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
                  Nom de la mission
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
                  Statut du paiement
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
                  Cash-out
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                if (
                  row.missionName?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                  row.status?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                  row.amount?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return (
                    <TableRow key={row.id}>
                      <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                        {row.missionName}
                      </TableCell>
                      <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                        {row.status}
                      </TableCell>
                      <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                        {row.amount}€
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => { handleOpenCashOut(row) }}>
                          <ArrowOutwardIcon fontSize='large' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                }
                return null
              })}
            </TableBody>
            {/* MODALE POUR CASH-OUT */}
            <Dialog open={openCashOut} onClose={handleCloseCashOut}>
              <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Cash-Out</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                  Êtes-vous sûr de vouloir retirer le montant de {currentData?.amount}€ de la mission &apos;{currentData?.missionName}&apos; ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseCashOut}
                  color="primary"
                  sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                >
                  Non
                </Button>
                <Button
                  onClick={() => { handleCashOut() }}
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

export default StudentPaymentsContent
