import React, { useEffect } from 'react'
import '../../../../CSS/Hotbar.scss'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import InvoiceApi from '../../../../API/InvoiceApi'

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

interface Invoice {
  id: number
  documentPath: string
  documentType: string
  documentUser: string
  userId: number
  createdAt: string
}

function StudentInvoicesContent (): JSX.Element {
  const { t } = useTranslation()
  const [invoiceData, setInvoiceData] = React.useState<Invoice[]>([])

  const handleDownload = (documentPath: string): void => {
    const link = document.createElement('a')
    link.href = `https://${documentPath}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data = await InvoiceApi.getInvoicesForStudent(localStorage.getItem('jwtToken') as string)
        setInvoiceData(data.data)
      } catch (error) {
        console.error('Error fetching invoices:', error)
        setInvoiceData([])
      }
    }

    fetchData()
  }, [])

  const tableHeaders = [t('invoices.year'), t('invoices.status'), t('invoices.invoice')]

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
              {invoiceData.length > 0
                ? (
                    invoiceData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align='center' component="th" scope="row" sx={{ fontSize: '24px' }}>
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align='center' sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                      {t('invoices.paid')}
                    </TableCell>
                    <TableCell align='center'>
                      <img
                        src='/assets/downloadInvoice.png'
                        alt='Download'
                        style={{ cursor: 'pointer', width: '40px', height: '40px' }}
                        onClick={() => { handleDownload(row.documentPath) }}
                      />
                    </TableCell>
                  </TableRow>
                    ))
                  )
                : (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    {t('invoices.no_invoices')}
                  </TableCell>
                </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default StudentInvoicesContent
