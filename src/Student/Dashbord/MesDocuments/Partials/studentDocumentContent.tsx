import React, { useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Enum.
import { StudentDocumentType } from '../../../../Enum'

// API.
import axios from 'axios'
import ProfileApi from '../../../../API/ProfileApi'

// Components.
import DropZone from '../../../../Component/DropZone'
import { TextField, Snackbar } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

// Styles.
import '../../../../CSS/BaseButton.scss'
import '../../../../CSS/StudentDocumentContent.scss'

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

function StudentDocumentContent (): JSX.Element {
  const { t } = useTranslation()

  const [cniFile, setCniFile] = useState<any>([])
  const [sirenFile, setSirenFile] = useState<any>([])
  const [urssafFile, setUrssafFile] = useState<any>([])
  const [ribFile, setRibFile] = useState<any>([])

  const [cniSnackBarValue, setCniSnackBarValue] = useState<boolean>(false)
  const [sirenSnackBarValue, setSirenSnackBarValue] = useState<boolean>(false)
  const [urssafSnackBarValue, setUrssafSnackBarValue] = useState<boolean>(false)
  const [ribSnackBarValue, setRibSnackBarValue] = useState<boolean>(false)

  const resetCniFile = (): void => {
    setCniFile([])
  }

  const resetSirenFile = (): void => {
    setSirenFile([])
  }

  const resetUrssafFile = (): void => {
    setUrssafFile([])
  }

  const resetRibFile = (): void => {
    setRibFile([])
  }

  const closeCniSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setCniSnackBarValue(false)
  }

  const closeSirenSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setSirenSnackBarValue(false)
  }

  const closeUrssafSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setUrssafSnackBarValue(false)
  }

  const closeRibSnackBar = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setRibSnackBarValue(false)
  }

  const postFile = async (): Promise<void> => {
    if (cniFile.length > 0) {
      const cniFormData = new FormData()
      cniFormData.append('file', cniFile[0])
      cniFormData.append('documentType', StudentDocumentType.CNI)
      try {
        await ProfileApi.uploadStudentDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          cniFormData
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setCniSnackBarValue(true)
        }
      }
    }

    if (sirenFile.length > 0) {
      const sirenFormData = new FormData()
      sirenFormData.append('file', sirenFile[0])
      sirenFormData.append('documentType', StudentDocumentType.SIREN)
      try {
        await ProfileApi.uploadStudentDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          sirenFormData
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setSirenSnackBarValue(true)
        }
      }
    }

    if (urssafFile.length > 0) {
      const urssafFormData = new FormData()
      urssafFormData.append('file', urssafFile[0])
      urssafFormData.append('documentType', StudentDocumentType.URSSAF)
      try {
        await ProfileApi.uploadStudentDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          urssafFile
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setUrssafSnackBarValue(true)
        }
      }
    }

    if (ribFile.length > 0) {
      const ribFormData = new FormData()
      ribFormData.append('file', ribFile[0])
      ribFormData.append('documentType', StudentDocumentType.RIB)
      try {
        await ProfileApi.uploadStudentDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          ribFormData
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setRibSnackBarValue(true)
        }
      }
    }
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <h2 className='std-document-card__title'>{t('student.dashboard.doc')}</h2>
        <div className='std-document-card__content'>
          <Document
            isSet={cniFile.length > 0}
            label="CNI"
            data={cniFile}
            handleReset={resetCniFile}
            handleFileChange={setCniFile}
          />
          <Document
            isSet={sirenFile.length > 0}
            label="SIREN"
            data={sirenFile}
            handleReset={resetSirenFile}
            handleFileChange={setSirenFile}
          />
          <Document
            isSet={urssafFile.length > 0}
            label="URSSAF"
            data={urssafFile}
            handleReset={resetUrssafFile}
            handleFileChange={setUrssafFile}
          />
          <Document
            isSet={ribFile.length > 0}
            label="RIB"
            data={ribFile}
            handleReset={resetRibFile}
            handleFileChange={setRibFile}
          />
          { cniFile.length > 0 || sirenFile.length > 0 || urssafFile.length > 0 || ribFile.length > 0
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
          <Snackbar open={sirenSnackBarValue} autoHideDuration={6000} onClose={closeSirenSnackBar}>
            <Alert onClose={closeSirenSnackBar} severity="error" sx={{ width: '100%' }}>
              Votre numéro de SIREN a déjà été validé.
            </Alert>
          </Snackbar>
          <Snackbar open={urssafSnackBarValue} autoHideDuration={6000} onClose={closeUrssafSnackBar}>
            <Alert onClose={closeUrssafSnackBar} severity="error" sx={{ width: '100%' }}>
              Votre attestation de vigilence Urssaf a déjà été validée.
            </Alert>
          </Snackbar>
          <Snackbar open={ribSnackBarValue} autoHideDuration={6000} onClose={closeRibSnackBar}>
            <Alert onClose={closeRibSnackBar} severity="error" sx={{ width: '100%' }}>
              Votre RIB a déjà été validé.
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}

export default StudentDocumentContent
