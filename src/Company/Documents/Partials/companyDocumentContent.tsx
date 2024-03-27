import React, { useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Enum.
import { CompanyDocumentType } from '../../../Enum'

// API.
import axios from 'axios'
import ProfileApi from '../../../API/ProfileApi'

// Components.
import DropZone from '../../../Component/DropZone'
import { TextField, Snackbar } from '@mui/material'
import BaseButton from '../../../Component/BaseButton'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

// Styles.
import '../../../CSS/BaseButton.scss'
import '../../../CSS/StudentDocumentContent.scss'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface DocumentProps {
  isSet: boolean
  label: string
  data: any
  handleReset: () => void
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  handleFileChange?: (value: any) => void
}

const Document: React.FC<DocumentProps> = ({ isSet, label, data, handleReset, handleChange, handleFileChange }) => {
  if (isSet) {
    return (
      <div className='std-document-card__line'>
        Vous avez bien renseigné votre {label}
        <div className='std-document-card__button'>
          <button className='base-button__little' onClick={handleReset}>
            Remplacer
          </button>
        </div>
      </div>
    )
  }

  if (handleChange != null) {
    return (
      <div className='std-document-card__textfield-container'>
        Veuillez renseigner votre {label}
        <TextField onChange={handleChange} id={label.toLowerCase()} label={label} variant="standard" />
      </div>
    )
  }

  return (
    <div className='std-document-card__dropzone'>
      <p>Veuillez renseigner votre {label}:</p>
      { data.length > 0 ? <div className='std-document-card__dropzone-filename'> { data[0].path } </div> : <DropZone onObjectChange={handleFileChange}/> }
    </div>
  )
}

function CompanyDocumentContent (): JSX.Element {
  const { t } = useTranslation()

  const [cniFile, setCniFile] = useState<any>([])
  const [kbisFile, setKbisFile] = useState<any>([])

  const [cniSnackBarValue, setCniSnackBarValue] = useState<boolean>(false)
  const [kbisSnackBarValue, setKbisSnackBarValue] = useState<boolean>(false)

  const resetCniFile = (): void => {
    setCniFile([])
  }

  const resetKbisFile = (): void => {
    setKbisFile([])
  }

  const closeCniSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setCniSnackBarValue(false)
  }

  const closeKbisSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setKbisSnackBarValue(false)
  }

  const postFile = async (): Promise<void> => {
    if (cniFile.length > 0) {
      const cniFormData = new FormData()
      cniFormData.append('file', cniFile[0])
      cniFormData.append('documentType', CompanyDocumentType.CNI)
      try {
        await ProfileApi.uploadCompanyDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          cniFormData
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setCniSnackBarValue(true)
        }
      }
    }

    if (kbisFile.length > 0) {
      const kbisFormData = new FormData()
      kbisFormData.append('file', kbisFile[0])
      kbisFormData.append('documentType', CompanyDocumentType.KBIS)
      try {
        await ProfileApi.uploadCompanyDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          kbisFormData
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setKbisSnackBarValue(true)
        }
      }
    }
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <h2 className='std-document-card__title'> { t('student.dashboard.doc') } </h2>
        <div className='std-document-card__content'>
          <Document
            isSet={cniFile.length > 0}
            label="CNI"
            data={cniFile}
            handleReset={resetCniFile}
            handleFileChange={setCniFile}
          />
          <Document
            isSet={kbisFile.length > 0}
            label="KBIS"
            data={kbisFile}
            handleReset={resetKbisFile}
            handleFileChange={setKbisFile}
          />
          { cniFile.length > 0 || kbisFile.length > 0
            ? <div className='std-document-card__button'>
                <BaseButton onClick={() => { postFile() }} title={t('validate')} />
              </div>
            : null
          }
          <Snackbar open={cniSnackBarValue} autoHideDuration={6000} onClose={closeCniSnackBar}>
            <Alert onClose={closeCniSnackBar} severity="error" sx={{ width: '100%' }}>
              Votre carte d&apos;identité a déjà été validée.
            </Alert>
          </Snackbar>
          <Snackbar open={kbisSnackBarValue} autoHideDuration={6000} onClose={closeKbisSnackBar}>
            <Alert onClose={closeKbisSnackBar} severity="error" sx={{ width: '100%' }}>
              Votre extrait KBIS a déjà été validé.
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}

export default CompanyDocumentContent
