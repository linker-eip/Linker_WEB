import React, { useState } from 'react'
import '../../../../CSS/Hotbar.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography,
  IconButton, Select, MenuItem, FormControl, InputLabel, type SelectChangeEvent
} from '@mui/material'

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

const TABLE_HEADER_STYLES = {
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '30px',
  color: '#FFFFFF',
  backgroundColor: '#005275',
  paddingLeft: '50px',
  paddingRight: '50px',
  align: 'center'
}

const FILTER_OPTIONS = [
  { label: 'Date 🗓️', value: 'Filtrer par date' },
  { label: 'Étudiant 🧑‍🎓', value: 'Filtrer par étudiant' },
  { label: 'Titre 📝', value: 'Filtrer par titre' },
  { label: 'Statut ❓', value: 'Filtrer par statut' }
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

  const [invoiceStates, setInvoiceStates] = useState(rows.map(row => row.etat))
  const [filterOption, setFilterOption] = useState<string>('')

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <FilterSelect filterOption={filterOption} setFilterOption={setFilterOption} />
        <InvoiceTable rows={rows} invoiceStates={invoiceStates} setInvoiceStates={setInvoiceStates} handleDownload={handleDownload} />
        <Pagination />
      </div>
    </div>
  )
}

const FilterSelect: React.FC<{ filterOption: string, setFilterOption: React.Dispatch<React.SetStateAction<string>> }> = ({ filterOption, setFilterOption }) => (
  <FormControl variant="outlined" sx={{ width: '150vh' }}>
    <InputLabel sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Filtrer</InputLabel>
    <Select
      label="Filtrer"
      value={filterOption}
      onChange={(event: SelectChangeEvent) => { setFilterOption(event.target.value) }}
      sx={{ fontFamily: 'Poppins', fontSize: '16px' }}
    >
      {FILTER_OPTIONS.map(option => (
        <MenuItem key={option.value} value={option.value} sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const InvoiceTable: React.FC<{ rows: Row[], invoiceStates: string[], setInvoiceStates: React.Dispatch<React.SetStateAction<string[]>>, handleDownload: () => void }> = ({ rows, invoiceStates, setInvoiceStates, handleDownload }) => (
  <TableContainer component={Paper}>
    <Table aria-label="Invoices table">
      <TableHead>
        <TableRow>
          {['Année', 'Titre de la mission', 'Étudiant', 'État', 'Facture'].map(header => (
            <TableCell key={header} style={TABLE_HEADER_STYLES}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <InvoiceRow
            key={index}
            data={row}
            invoiceState={invoiceStates[index]}
            setInvoiceStates={setInvoiceStates}
            invoiceStates={invoiceStates}
            index={index}
            handleDownload={handleDownload}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const InvoiceRow: React.FC<{
  data: Row
  invoiceState: string
  setInvoiceStates: React.Dispatch<React.SetStateAction<string[]>>
  invoiceStates: string[]
  index: number
  handleDownload: () => void
}> = ({ data, invoiceState, setInvoiceStates, invoiceStates, index, handleDownload }) => {
  return (
    <TableRow>
      <TableCell align='center' component="th" scope="row" sx={{ fontSize: '24px' }}>{data.année}</TableCell>
      <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{data.titre}</TableCell>
      <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{data.student}</TableCell>
      <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
        <Select
          value={invoiceState}
          onChange={(event: SelectChangeEvent) => {
            const newInvoiceStates = [...invoiceStates]
            newInvoiceStates[index] = event.target.value
            setInvoiceStates(newInvoiceStates)
          }}
          sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
        >
          <MenuItem value={'En attente'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>En attente</MenuItem>
          <MenuItem value={'Payée'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>Payée</MenuItem>
          <MenuItem value={'Annulée'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>Annulée</MenuItem>
        </Select>
      </TableCell>
      <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
        <img
          src='/assets/downloadInvoice.png'
          alt='Download'
          style={{ cursor: 'pointer', width: '40px', height: '40px' }}
          onClick={handleDownload}
        />
      </TableCell>
    </TableRow>
  )
}

const Pagination: React.FC = () => (
  <Stack direction='row' alignItems='center' justifyContent='space-between' mt='30px'>
    <IconButton style={{ padding: 0, marginLeft: '500px' }} onClick={() => { console.log('Chevron gauche cliqué!') }}>
      <ChevronLeftIcon style={{ fontSize: 40 }}/>
    </IconButton>
    <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 'bold' }}>
      Page 1 sur 2
    </Typography>
    <IconButton style={{ padding: 0, marginRight: '500px' }} onClick={() => { console.log('Chevron droite cliqué!') }}>
      <ChevronRightIcon style={{ fontSize: 40 }}/>
    </IconButton>
  </Stack>
)

export default CompanyInvoicesContent
