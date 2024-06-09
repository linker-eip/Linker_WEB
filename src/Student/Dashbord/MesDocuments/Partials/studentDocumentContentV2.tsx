/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

// Enum.
import { DocumentStatus, StudentDocumentType } from '../../../../Enum'

// API.
import axios from 'axios'
import ProfileApi from '../../../../API/ProfileApi'

// Components.
import DropZone from '../../../../Component/DropZone'
import DropZoneV2 from '../../../../Component/DropZoneV2'
import { TextField, Snackbar } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import ClassicButton from '../../../../Component/ClassicButton'
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

  const [cniStatus, setCniStatus] = useState<DocumentStatus>()
  const [sirenStatus, setSirenStatus] = useState<DocumentStatus>()
  const [urssafStatus, setUrssafStatus] = useState<DocumentStatus>()
  const [ribStatus, setRibStatus] = useState<DocumentStatus>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      const response = await ProfileApi.getStudentDocumentStatus(localStorage.getItem('jwtToken') as string)
      setCniStatus(response[0].status)
      setSirenStatus(response[1].status)
      setUrssafStatus(response[2].status)
      setRibStatus(response[3].status)
    }
    fetchData()
  }, [])

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

  const changeCniStatus = (): void => {
    setCniStatus(DocumentStatus.NOT_FILLED)
  }

  const changeSirenStatus = (): void => {
    setSirenStatus(DocumentStatus.NOT_FILLED)
  }

  const changeUrssafStatus = (): void => {
    setUrssafStatus(DocumentStatus.NOT_FILLED)
  }

  const changeRibStatus = (): void => {
    setRibStatus(DocumentStatus.NOT_FILLED)
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
      <div className='std-documentV2__top-section'>
        <div className='std-documentV2__container'>
          <div className='std-documentV2__section'>
            {cniStatus !== DocumentStatus.NOT_FILLED
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
            {sirenStatus !== DocumentStatus.NOT_FILLED
              ? <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part1') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.siren') } </div>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part2') } </div>
                  </div>
                  <div className='std-documentV2__button'>
                    <ClassicButton title={t('document.replace')} onClick={changeSirenStatus} />
                  </div>
                </div>
              : <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.siren') } </div>
                    <div className='std-documentV2__content--text'> : </div>
                  </div>
                  <DropZoneV2 onObjectChange={setSirenFile} onClose={resetSirenFile} />
                </div>
            }
          </div>
          <div className='std-documentV2__section'>
          {urssafStatus !== DocumentStatus.NOT_FILLED
            ? <div className='std-documentV2__content'>
                <div className='std-documentV2__content--text-section'>
                  <div className='std-documentV2__content--text'> { t('document.is_document.part1') } </div>
                  <div className='std-documentV2__content--text-sp'> { t('document.urssaf') } </div>
                  <div className='std-documentV2__content--text'> { t('document.is_document.part2') } </div>
                </div>
                <div className='std-documentV2__button'>
                  <ClassicButton title={t('document.replace')} onClick={changeUrssafStatus} />
                </div>
              </div>
            : <div className='std-documentV2__content'>
                <div className='std-documentV2__content--text-section'>
                  <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
                  <div className='std-documentV2__content--text-sp'> { t('document.urssaf') } </div>
                  <div className='std-documentV2__content--text'> : </div>
                </div>
                <DropZoneV2 onObjectChange={setUrssafFile} onClose={resetUrssafFile} />
              </div>
            }
            {ribStatus !== DocumentStatus.NOT_FILLED
              ? <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part1') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.rib') } </div>
                    <div className='std-documentV2__content--text'> { t('document.is_document.part2') } </div>
                  </div>
                  <div className='std-documentV2__button'>
                    <ClassicButton title={t('document.replace')} onClick={changeRibStatus} />
                  </div>
                </div>
              : <div className='std-documentV2__content'>
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.rib') } </div>
                    <div className='std-documentV2__content--text'> : </div>
                  </div>
                  <DropZoneV2 onObjectChange={setRibFile} onClose={resetRibFile} />
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
  )
}

export default StudentDocumentContentV2
