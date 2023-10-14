import React from 'react'
import '../../../../CSS/Hotbar.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, type SelectChangeEvent } from '@mui/material'

interface Row {
  année: string
  titre: string
  student: string
  etat: string
}

const rows: Row[] = [
  { année: '2023', titre: 'Site vitrine', student: 'Jeremy Calvo', etat: 'Payée' },
  { année: '2023', titre: 'App mobile', student: 'Pierre Nana', etat: 'Payée' },
  { année: '2023', titre: 'Site e-commerce', student: 'Rayane Eloudjedi', etat: 'En attente' },
  { année: '2023', titre: 'Site vitrine', student: 'Jeremy Calvo', etat: 'Payée' },
  { année: '2022', titre: 'Site vitrine', student: 'Jeremy Calvo', etat: 'Payée' },
  { année: '2022', titre: 'App mobile', student: 'Pierre Nana', etat: 'Payée' },
  { année: '2022', titre: 'Site e-commerce', student: 'Rayane Eloudjedi', etat: 'En attente' }
]

function CompanyInvoicesContent (): JSX.Element {
  const handleDownload = (): void => {
    const link = document.createElement('a')
    link.href = '/assets/ipsum_1.pdf'
    link.download = 'invoice.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const [invoiceStates, setInvoiceStates] = React.useState(rows.map(row => row.etat))
  const [filterOption, setFilterOption] = React.useState<string>('')

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
      <FormControl variant="outlined" sx={{ width: '150vh' }}>
        <InputLabel sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Filtrer</InputLabel>
          <Select
            label="Filtrer"
            value={filterOption}
            onChange={(event: SelectChangeEvent) => {
              setFilterOption(event.target.value)
            }}
            sx={{ fontFamily: 'Poppins', fontSize: '16px' }}
          >
            <MenuItem value={'Filtrer par date'} sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Date 🗓️</MenuItem>
            <MenuItem value={'Filtrer par étudiant'} sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Étudiant 🧑‍🎓</MenuItem>
            <MenuItem value={'Filtrer par titre'} sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Titre 📝</MenuItem>
            <MenuItem value={'Filtrer par statut'} sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Statut ❓</MenuItem>
          </Select>
        </FormControl>
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
                    Année
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
                    Titre de la mission
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
                    Facture
                </TableCell>
              </TableRow>
            </TableHead>
        <TableBody>
        {rows.map((row, index) => (
            <TableRow key={row.titre}>
            <TableCell align='center' component="th" scope="row" sx={{ fontSize: '24px' }}>
                {row.année}
            </TableCell>
            <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{row.titre}</TableCell>
            <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{row.student}</TableCell>
            <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                <Select
                  value={invoiceStates[index]}
                  onChange={(event: SelectChangeEvent) => {
                    const newInvoiceStates = [...invoiceStates]
                    newInvoiceStates[index] = event.target.value
                    setInvoiceStates(newInvoiceStates)
                  }}
                  sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                >
                <MenuItem value={'En attente'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>En attente</MenuItem>
                <MenuItem value={'Payée'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>Payée</MenuItem>
                </Select>
            </TableCell>
            <TableCell align='center'>
                <img src='/assets/downloadInvoice.png' alt='Download' style={{ cursor: 'pointer', width: '40px', height: '40px' }} onClick={handleDownload}/>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
          </Table>
        </TableContainer>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mt='30px'>
          <IconButton
           style={{ padding: 0, marginLeft: '500px' }}
           onClick={() => { console.log('Chevron gauche cliqué!') }}>
            <ChevronLeftIcon style={{ fontSize: 40 }}/>
          </IconButton>
          <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 'bold' }}>
            Page 1 sur 2
          </Typography>
          <IconButton
           style={{ padding: 0, marginRight: '500px' }}
           onClick={() => { console.log('Chevron droite cliqué!') }}>
            <ChevronRightIcon style={{ fontSize: 40 }}/>
          </IconButton>
        </Stack>
      </div>
    </div>
  )
}

export default CompanyInvoicesContent
