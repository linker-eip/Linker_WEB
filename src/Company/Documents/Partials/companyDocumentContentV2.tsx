/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Enum.
import { CompanyDocumentType, DocumentStatus, StudentDocumentType } from '../../../Enum'

// API.
import axios from 'axios'
import ProfileApi from '../../../API/ProfileApi'

// Components.
import DropZone from '../../../Component/DropZone'
import DropZoneV2 from '../../../Component/DropZoneV2'
import { TextField, Snackbar } from '@mui/material'
import ClassicButton from '../../../Component/ClassicButton'
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

function CompanyDocumentContentV2 (): JSX.Element {
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

  const [cniStatus, setCniStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [kbisStatus, setKbisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      const response = await ProfileApi.getCompanyDocumentStatus(localStorage.getItem('jwtToken') as string)
      if (response.length > 0) {
        response.forEach((element): void => {
          if (element.documentType === CompanyDocumentType.CNI) {
            setCniStatus(element.status)
          }
          if (element.documentType === CompanyDocumentType.KBIS) {
            setKbisStatus(element.status)
          }
        })
      }
    }
    fetchData()
  }, [])

  const changeCniStatus = (): void => {
    setCniStatus(DocumentStatus.NOT_FILLED)
  }

  const changeKbisStatus = (): void => {
    setKbisStatus(DocumentStatus.NOT_FILLED)
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
    if (cniFile.length > 0 && cniFile[0].size <= 2 * 1024 * 1024) {
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
    } else if (cniFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (kbisFile.length > 0 && kbisFile[0].size <= 2 * 1024 * 1024) {
      const sirenFormData = new FormData()
      sirenFormData.append('file', kbisFile[0])
      sirenFormData.append('documentType', CompanyDocumentType.KBIS)
      try {
        await ProfileApi.uploadCompanyDocumentVerification(
          localStorage.getItem('jwtToken') as string,
          sirenFormData
        )
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          setKbisSnackBarValue(true)
        }
      }
    } else if (kbisFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }
    window.location.reload()
  }

  return (
    <div className='std-documentV2'>
      <div className='std-documentV2__top-section'>
        <div className='std-documentV2__container'>
          <div className='std-documentV2__section'>
            {cniStatus !== DocumentStatus.NOT_FILLED && cniStatus !== DocumentStatus.DENIED
              ? <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part1') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.cni') } </div>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part2') } </div>
                  </div>
                  <div className='std-documentV2__button'>
                    <ClassicButton title={t('document.replace')} onClick={changeCniStatus} />
                  </div>
                </div>
              : <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.cni') } </div>
                    <div className='std-documentV2__content--text'> : </div>
                  </div>
                  <DropZoneV2 onObjectChange={setCniFile} onClose={resetCniFile} />
                </div>
            }
            {kbisStatus !== DocumentStatus.NOT_FILLED && kbisStatus !== DocumentStatus.DENIED
              ? <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part1') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.kbis') } </div>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part2') } </div>
                  </div>
                  <div className='std-documentV2__button'>
                    <ClassicButton title={t('document.replace')} onClick={changeKbisStatus} />
                  </div>
                </div>
              : <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.kbis') } </div>
                    <div className='std-documentV2__content--text'> : </div>
                  </div>
                  <DropZoneV2 onObjectChange={setKbisFile} onClose={resetKbisFile} />
                </div>
            }
          </div>
        </div>
        <div className='std-documentV2__button'>
          <ClassicButton title={t('document.send')} onClick={() => { postFile() }} />
        </div>
      </div>
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
  )
}

export default CompanyDocumentContentV2
