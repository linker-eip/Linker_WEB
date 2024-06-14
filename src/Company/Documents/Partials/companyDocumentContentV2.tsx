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

// Icons
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

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

interface ShowIconProps {
  status: DocumentStatus
}

function ShowIcon ({ status }: ShowIconProps): JSX.Element {
  switch (status) {
    case DocumentStatus.NOT_FILLED:
      return <HelpOutlineOutlinedIcon className='std-dashboard-card__notfilled' />
    case DocumentStatus.PENDING:
      return <PendingOutlinedIcon className='std-dashboard-card__pending' />
    case DocumentStatus.VERIFIED:
      return <CheckCircleOutlineIcon className='std-dashboard-card__validated' />
    case DocumentStatus.DENIED:
      return <CloseOutlinedIcon className='std-dashboard-card__denied' />
    default:
      return <HelpOutlineOutlinedIcon className='std-dashboard-card__notfilled' />
  }
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

  const [cniStatus, setCniStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [kbisStatus, setKbisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)

  const [cniBisStatus, setCniBisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [kbisBisStatus, setKbisBisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)

  const [cniReplace, setCniReplace] = useState<boolean>(false)
  const [kbisReplace, setKbisReplace] = useState<boolean>(false)

  const resetCniFile = (): void => {
    setCniFile([])
  }

  const resetKbisFile = (): void => {
    setKbisFile([])
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      const response = await ProfileApi.getCompanyDocumentStatus(localStorage.getItem('jwtToken') as string)
      if (response.length > 0) {
        response.forEach((element): void => {
          if (element.documentType === CompanyDocumentType.CNI && element.bis === false) {
            setCniStatus(element.status)
          }
          if (element.documentType === CompanyDocumentType.KBIS && element.bis === false) {
            setKbisStatus(element.status)
          }
          if (element.documentType === CompanyDocumentType.CNI && element.bis === true) {
            setCniBisStatus(element.status)
          }
          if (element.documentType === CompanyDocumentType.KBIS && element.bis === true) {
            setKbisBisStatus(element.status)
          }
        })
      }
    }
    fetchData()
  }, [])

  const changeCniStatus = (): void => {
    setCniReplace(true)
  }

  const changeKbisStatus = (): void => {
    setKbisReplace(true)
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
      if (cniStatus === DocumentStatus.VERIFIED) {
        try {
          const response = await ProfileApi.replaceCompanyDocument(localStorage.getItem('jwtToken') as string, cniFormData)
          if (response.status === 201) {
            console.log('File: CNI has been updated successfully')
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setCniSnackBarValue(true)
          }
        }
      } else {
        try {
          await ProfileApi.uploadCompanyDocumentVerification(localStorage.getItem('jwtToken') as string, cniFormData)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setCniSnackBarValue(true)
          }
        }
      }
    } else if (cniFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (kbisFile.length > 0 && kbisFile[0].size <= 2 * 1024 * 1024) {
      const kbisFormData = new FormData()
      kbisFormData.append('file', kbisFile[0])
      kbisFormData.append('documentType', CompanyDocumentType.KBIS)
      if (kbisStatus === DocumentStatus.VERIFIED) {
        try {
          const response = await ProfileApi.replaceCompanyDocument(localStorage.getItem('jwtToken') as string, kbisFormData)
          if (response.status === 201) {
            console.log('File: KBIS has been updated successfully')
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setKbisSnackBarValue(true)
          }
        }
      } else {
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
            {cniStatus !== DocumentStatus.NOT_FILLED && cniStatus !== DocumentStatus.DENIED && !cniReplace
              ? <div className='std-documentV2__content'>
                  <div className='std-documentV2__status-content'>
                    <ShowIcon status={cniStatus} />
                    {t('student.dashboard.card.status.cni')}
                  </div>
                  {cniBisStatus === DocumentStatus.NOT_FILLED
                    ? null
                    : <div className='std-documentV2__status-content'>
                        <ShowIcon status={cniBisStatus} />
                        {t('student.dashboard.card.status.cni')}
                      </div>
                  }
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
                  <div className='std-documentV2__status-content'>
                    <ShowIcon status={cniStatus} />
                    {t('student.dashboard.card.status.cni')}
                  </div>
                  {cniBisStatus === DocumentStatus.NOT_FILLED
                    ? null
                    : <div className='std-documentV2__status-content'>
                        <ShowIcon status={cniBisStatus} />
                        {t('student.dashboard.card.status.cni')}
                      </div>
                  }
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.cni') } </div>
                    <div className='std-documentV2__content--text'> : </div>
                  </div>
                  <DropZoneV2 onObjectChange={setCniFile} onClose={resetCniFile} />
                </div>
            }
            {kbisStatus !== DocumentStatus.NOT_FILLED && kbisStatus !== DocumentStatus.DENIED && !kbisReplace
              ? <div className='std-documentV2__content'>
                  <div className='std-documentV2__status-content'>
                    <ShowIcon status={kbisStatus} />
                    {t('company.dashboard.card.status.kbis')}
                  </div>
                  {kbisBisStatus === DocumentStatus.NOT_FILLED
                    ? null
                    : <div className='std-documentV2__status-content'>
                        <ShowIcon status={kbisBisStatus} />
                        {t('company.dashboard.card.status.kbis')}
                      </div>
                  }
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
                  <div className='std-documentV2__status-content'>
                    <ShowIcon status={kbisStatus} />
                    {t('company.dashboard.card.status.kbis')}
                  </div>
                  {kbisBisStatus === DocumentStatus.NOT_FILLED
                    ? null
                    : <div className='std-documentV2__status-content'>
                        <ShowIcon status={kbisBisStatus} />
                        {t('company.dashboard.card.status.kbis')}
                      </div>
                  }
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
