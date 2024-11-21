import React, { useState } from 'react'
import '../../../../CSS/Hotbar.scss'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, type SelectChangeEvent
} from '@mui/material'
import { useTranslation } from 'react-i18next'

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

function CompanyInvoicesContent (): JSX.Element {
  const { t } = useTranslation()
  const tableHeaders = [t('invoices.year'), t('invoices.title'), t('invoices.student'), t('invoices.status'), t('invoices.invoice')]

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

  const FILTER_OPTIONS = [
    { label: t('invoices.filter.date'), value: 'Filtrer par date' },
    { label: t('invoices.filter.student'), value: 'Filtrer par étudiant' },
    { label: t('invoices.filter.title'), value: 'Filtrer par titre' },
    { label: t('invoices.filter.status'), value: 'Filtrer par statut' }
  ]

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <FilterSelect filterLabel={t('invoices.filter.label')} filters={FILTER_OPTIONS} filterOption={filterOption} setFilterOption={setFilterOption} />
        <InvoiceTable tableHeaders={tableHeaders} rows={rows} invoiceStates={invoiceStates} setInvoiceStates={setInvoiceStates} handleDownload={handleDownload} />
      </div>
    </div>
  )
}

const FilterSelect: React.FC<{ filterLabel: string, filterOption: string, setFilterOption: React.Dispatch<React.SetStateAction<string>>, filters: Array<{ label: string, value: string }> }> = ({ filterOption, setFilterOption, filters, filterLabel }) => (
  <FormControl variant="outlined" sx={{ width: '150vh' }}>
    <InputLabel sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>{filterLabel}</InputLabel>
    <Select
      label={filterLabel}
      value={filterOption}
      onChange={(event: SelectChangeEvent) => { setFilterOption(event.target.value) }}
      sx={{ fontFamily: 'Poppins', fontSize: '16px' }}
    >
      {filters.map(option => (
        <MenuItem key={option.value} value={option.value} sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const InvoiceTable: React.FC<{ tableHeaders: string[], rows: Row[], invoiceStates: string[], setInvoiceStates: React.Dispatch<React.SetStateAction<string[]>>, handleDownload: () => void }> = ({ rows, invoiceStates, setInvoiceStates, handleDownload, tableHeaders }) => (
  <TableContainer component={Paper}>
    <Table aria-label="Invoices table">
      <TableHead>
        <TableRow>
          {tableHeaders.map(header => (
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
  const { t } = useTranslation()
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
          <MenuItem value={'En attente'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}> {t('invoices.waiting')} </MenuItem>
          <MenuItem value={'Payée'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{t('invoices.paid')}</MenuItem>
          <MenuItem value={'Annulée'} sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{t('invoices.cancelled')}</MenuItem>
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

export default CompanyInvoicesContent
