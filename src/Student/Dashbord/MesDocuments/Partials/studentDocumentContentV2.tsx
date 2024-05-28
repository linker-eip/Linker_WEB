/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Enum.
import { StudentDocumentType } from '../../../../Enum'

// API.
import axios from 'axios'
import ProfileApi from '../../../../API/ProfileApi'

// Components.
import DropZone from '../../../../Component/DropZone'
import DropZoneV2 from '../../../../Component/DropZoneV2'
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

function StudentDocumentContentV2 (): JSX.Element {
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
    if (cniFile.length > 0 && cniFile[0].size <= 2 * 1024 * 1024) {
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
    } else if (cniFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (sirenFile.length > 0 && sirenFile[0].size <= 2 * 1024 * 1024) {
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
    } else if (sirenFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (urssafFile.length > 0 && urssafFile[0].size <= 2 * 1024 * 1024) {
      const urssafFormData = new FormData()
      urssafFormData.append('file', urssafFile[0])
      urssafFormData.append('documentType', StudentDocumentType.URSSAF)
      try {
        await ProfileApi.uploadStudentDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          urssafFormData
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setUrssafSnackBarValue(true)
        }
      }
    } else if (urssafFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (ribFile.length > 0 && ribFile[0].size <= 2 * 1024 * 1024) {
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
    } else if (ribFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }
  }

  return (
    <div className='std-documentV2'>
      <div className='std-documentV2__container'>
        <div className='std-documentV2__title'> { t('student.dashboard.doc') } </div>
        <div className='std-documentV2__content'>
          <div className='std-documentV2__content--text-section'>
            <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
            <div className='std-documentV2__content--text-sp'> { t('document.cni') } </div>
            <div className='std-documentV2__content--text'> : </div>
          </div>
          <DropZoneV2 onObjectChange={setCniFile} onClose={resetCniFile} />
        </div>
        <div className='std-documentV2__content'>
          <div className='std-documentV2__content--text-section'>
            <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
            <div className='std-documentV2__content--text-sp'> { t('document.siren') } </div>
            <div className='std-documentV2__content--text'> : </div>
          </div>
          <DropZoneV2 onObjectChange={setSirenFile} onClose={resetSirenFile} />
        </div>
        <div className='std-documentV2__content'>
          <div className='std-documentV2__content--text-section'>
            <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
            <div className='std-documentV2__content--text-sp'> { t('document.urssaf') } </div>
            <div className='std-documentV2__content--text'> : </div>
          </div>
          <DropZoneV2 onObjectChange={setUrssafFile} onClose={resetUrssafFile} />
        </div>
        <div className='std-documentV2__content'>
          <div className='std-documentV2__content--text-section'>
            <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
            <div className='std-documentV2__content--text-sp'> { t('document.rib') } </div>
            <div className='std-documentV2__content--text'> : </div>
          </div>
          <DropZoneV2 onObjectChange={setRibFile} onClose={resetRibFile} />
        </div>
      </div>
    </div>
  )
}

export default StudentDocumentContentV2
