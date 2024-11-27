import React from 'react'
import '../../../../CSS/Hotbar.scss'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Row {
  année: string
  titre: string
  client: string
  etat: string
}

const rows: Row[] = [
  { année: '2022', titre: 'Site vitrine', client: 'Epic Voyages', etat: 'Payée' },
  { année: '2022', titre: 'App mobile', client: 'Epic Voyages', etat: 'Payée' },
  { année: '2022', titre: 'Site e-commerce', client: 'WinterTimeOff', etat: 'En attente' },
  { année: '2022', titre: 'Site vitrine', client: 'Pharmacie Derol', etat: 'Payée' },
  { année: '2022', titre: 'Site vitrine', client: 'Pharmacie Derol', etat: 'Payée' },
  { année: '2022', titre: 'App mobile', client: 'Epic Voyages', etat: 'Payée' },
  { année: '2022', titre: 'Site e-commerce', client: 'WinterTimeOff', etat: 'En attente' },
  { année: '2022', titre: 'Site vitrine', client: 'Pharmacie Derol', etat: 'Payée' },
  { année: '2022', titre: 'Site vitrine', client: 'Pharmacie Derol', etat: 'Payée' }
]

const headerCellStyle: { align: 'center', sx: object } = {
  align: 'center',
  sx: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '30px',
    color: '#FFFFFF',
    backgroundColor: '#005275',
    paddingLeft: '50px',
    paddingRight: '50px'
  }
}

function StudentInvoicesContent (): JSX.Element {
  const { t } = useTranslation()

  const handleDownload = (): void => {
    const link = document.createElement('a')
    link.href = '/assets/ipsum_1.pdf'
    link.download = 'invoice.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const tableHeaders = [t('invoices.year'), t('invoices.title'), t('invoices.client'), t('invoices.status'), t('invoices.invoice')]

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <TableContainer component={Paper}>
          <Table aria-label="Invoices table">
            <TableHead>
              <TableRow>
                {tableHeaders.map(header => (
                  <TableCell key={header} {...headerCellStyle}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.titre}>
                  <TableCell align='center' component="th" scope="row" sx={{ fontSize: '24px' }}>
                    {row.année}
                  </TableCell>
                  <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{row.titre}</TableCell>
                  <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{row.client}</TableCell>
                  <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>{row.etat}</TableCell>
                  <TableCell align='center'>
                    <img src='/assets/downloadInvoice.png' alt='Download' style={{ cursor: 'pointer', width: '40px', height: '40px' }} onClick={handleDownload} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default StudentInvoicesContent
