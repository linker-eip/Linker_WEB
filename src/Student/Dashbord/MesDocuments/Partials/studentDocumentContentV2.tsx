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
import { TextField, Snackbar, Skeleton } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import ClassicButton from '../../../../Component/ClassicButton'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

// Icons
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

// Styles.
import '../../../../CSS/BaseButton.scss'
import '../../../../CSS/StudentDocumentContent.scss'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

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

function StudentDocumentContentV2 (): JSX.Element {
  const { t } = useTranslation()

  const [loading, setLoading] = useState<boolean | null>(null)

  const [cniFile, setCniFile] = useState<any>([])
  const [sirenFile, setSirenFile] = useState<any>([])
  const [urssafFile, setUrssafFile] = useState<any>([])
  const [ribFile, setRibFile] = useState<any>([])

  const [cniSnackBarValue, setCniSnackBarValue] = useState<boolean>(false)
  const [sirenSnackBarValue, setSirenSnackBarValue] = useState<boolean>(false)
  const [urssafSnackBarValue, setUrssafSnackBarValue] = useState<boolean>(false)
  const [ribSnackBarValue, setRibSnackBarValue] = useState<boolean>(false)

  const [cniStatus, setCniStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [sirenStatus, setSirenStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [urssafStatus, setUrssafStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [ribStatus, setRibStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)

  const [cniBisStatus, setCniBisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [sirenBisStatus, setSirenBisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [urssafBisStatus, setUrssafBisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)
  const [ribBisStatus, setRibBisStatus] = useState<DocumentStatus>(DocumentStatus.NOT_FILLED)

  const [cniReplace, setCniReplace] = useState<boolean>(false)
  const [sirenReplace, setSirenReplace] = useState<boolean>(false)
  const [urssafReplace, setUrssafReplace] = useState<boolean>(false)
  const [ribReplace, setRibReplace] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      const response = await ProfileApi.getStudentDocumentStatus(localStorage.getItem('jwtToken') as string)
      if (response.length > 0) {
        response.forEach((element): void => {
          if (element.documentType === StudentDocumentType.CNI && !element.bis) {
            setCniStatus(element.status)
          }
          if (element.documentType === StudentDocumentType.SIREN && !element.bis) {
            setSirenStatus(element.status)
          }
          if (element.documentType === StudentDocumentType.URSSAF && !element.bis) {
            setUrssafStatus(element.status)
          }
          if (element.documentType === StudentDocumentType.RIB && !element.bis) {
            setRibStatus(element.status)
          }
          if (element.documentType === StudentDocumentType.CNI && element.bis) {
            setCniBisStatus(element.status)
          }
          if (element.documentType === StudentDocumentType.SIREN && element.bis) {
            setSirenBisStatus(element.status)
          }
          if (element.documentType === StudentDocumentType.URSSAF && element.bis) {
            setUrssafBisStatus(element.status)
          }
          if (element.documentType === StudentDocumentType.RIB && element.bis) {
            setRibBisStatus(element.status)
          }
        })
      }
      setLoading(false)
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
    setCniReplace(true)
  }

  const changeSirenStatus = (): void => {
    setSirenReplace(true)
  }

  const changeUrssafStatus = (): void => {
    setUrssafReplace(true)
  }

  const changeRibStatus = (): void => {
    setRibReplace(true)
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
      if (cniStatus === DocumentStatus.VERIFIED) {
        try {
          const response = await ProfileApi.replaceStudentDocument(localStorage.getItem('jwtToken') as string, cniFormData)
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
          await ProfileApi.uploadStudentDocumentVerification(localStorage.getItem('jwtToken') as string, cniFormData)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setCniSnackBarValue(true)
          }
        }
      }
    } else if (cniFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (sirenFile.length > 0 && sirenFile[0].size <= 2 * 1024 * 1024) {
      const sirenFormData = new FormData()
      sirenFormData.append('file', sirenFile[0])
      sirenFormData.append('documentType', StudentDocumentType.SIREN)
      if (sirenStatus === DocumentStatus.VERIFIED) {
        try {
          const response = await ProfileApi.replaceStudentDocument(localStorage.getItem('jwtToken') as string, sirenFormData)
          if (response.status === 201) {
            console.log('File: SIREN has been updated successfully')
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setSirenSnackBarValue(true)
          }
        }
      } else {
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
    } else if (sirenFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (urssafFile.length > 0 && urssafFile[0].size <= 2 * 1024 * 1024) {
      const urssafFormData = new FormData()
      urssafFormData.append('file', urssafFile[0])
      urssafFormData.append('documentType', StudentDocumentType.URSSAF)
      if (urssafStatus === DocumentStatus.VERIFIED) {
        try {
          const response = await ProfileApi.replaceStudentDocument(localStorage.getItem('jwtToken') as string, urssafFormData)
          if (response.status === 201) {
            console.log('File: URSSAF has been updated successfully')
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setUrssafSnackBarValue(true)
          }
        }
      } else {
        try {
          await ProfileApi.uploadStudentDocumentVerification(
            localStorage.getItem('jwtToken') as string, urssafFormData)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setUrssafSnackBarValue(true)
          }
        }
      }
    } else if (urssafFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }

    if (ribFile.length > 0 && ribFile[0].size <= 2 * 1024 * 1024) {
      const ribFormData = new FormData()
      ribFormData.append('file', ribFile[0])
      ribFormData.append('documentType', StudentDocumentType.RIB)
      if (ribStatus === DocumentStatus.VERIFIED) {
        try {
          const response = await ProfileApi.replaceStudentDocument(localStorage.getItem('jwtToken') as string, ribFormData)
          if (response.status === 201) {
            console.log('File: RIB has been updated successfully')
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setRibSnackBarValue(true)
          }
        }
      } else {
        try {
          await ProfileApi.uploadStudentDocumentVerification(localStorage.getItem('jwtToken') as string, ribFormData)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            setRibSnackBarValue(true)
          }
        }
      }
    } else if (ribFile.length > 0) {
      alert('Votre fichier ne doit pas exécder 2 Mb.')
    }
    window.location.reload()
  }

  return (
    <div className='std-documentV2'>
      <div className='std-documentV2__top-section'>
      {loading === null
        ? <Skeleton variant='rectangular' animation='wave' height={400} width={800} />
        : <div className='std-documentV2__container'>
            <div className='std-documentV2__section'>
              {cniStatus !== DocumentStatus.NOT_FILLED && !cniReplace && cniStatus !== DocumentStatus.DENIED
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
                          <div>
                            {t('document.statut.bis')}
                          </div>
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
                          <div>
                            {t('document.statut.bis')}
                          </div>
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
              {sirenStatus !== DocumentStatus.NOT_FILLED && !sirenReplace && sirenStatus !== DocumentStatus.DENIED
                ? <div className='std-documentV2__content'>
                    <div className='std-documentV2__status-content'>
                      <ShowIcon status={sirenStatus} />
                      {t('student.dashboard.card.status.statut')}
                    </div>
                    {sirenBisStatus === DocumentStatus.NOT_FILLED
                      ? null
                      : <div className='std-documentV2__status-content'>
                          <ShowIcon status={sirenBisStatus} />
                          {t('student.dashboard.card.status.statut')}
                          <div>
                            {t('document.statut.bis')}
                          </div>
                        </div>
                    }
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
                    <div className='std-documentV2__status-content'>
                      <ShowIcon status={sirenStatus} />
                      {t('student.dashboard.card.status.statut')}
                    </div>
                    {sirenBisStatus === DocumentStatus.NOT_FILLED
                      ? null
                      : <div className='std-documentV2__status-content'>
                          <ShowIcon status={sirenBisStatus} />
                          {t('student.dashboard.card.status.statut')}
                          <div>
                            {t('document.statut.bis')}
                          </div>
                        </div>
                    }
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
            {urssafStatus !== DocumentStatus.NOT_FILLED && !urssafReplace && urssafStatus !== DocumentStatus.DENIED
              ? <div className='std-documentV2__content'>
                  <div className='std-documentV2__status-content'>
                    <ShowIcon status={urssafStatus} />
                    {t('student.dashboard.card.status.urssaf')}
                  </div>
                  {urssafBisStatus === DocumentStatus.NOT_FILLED
                    ? null
                    : <div className='std-documentV2__status-content'>
                        <ShowIcon status={urssafBisStatus} />
                        {t('student.dashboard.card.status.urssaf')}
                        <div>
                            {t('document.statut.bis')}
                          </div>
                      </div>
                  }
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
                  <div className='std-documentV2__status-content'>
                    <ShowIcon status={urssafStatus} />
                    {t('student.dashboard.card.status.urssaf')}
                  </div>
                  {urssafBisStatus === DocumentStatus.NOT_FILLED
                    ? null
                    : <div className='std-documentV2__status-content'>
                        <ShowIcon status={urssafBisStatus} />
                        {t('student.dashboard.card.status.urssaf')}
                        <div>
                            {t('document.statut.bis')}
                          </div>
                      </div>
                  }
                  <div className='std-documentV2__content--text-section'>
                    <div className='std-documentV2__content--text'> { t('document.no_document') } </div>
                    <div className='std-documentV2__content--text-sp'> { t('document.urssaf') } </div>
                    <div className='std-documentV2__content--text'> : </div>
                  </div>
                  <DropZoneV2 onObjectChange={setUrssafFile} onClose={resetUrssafFile} />
                </div>
              }
              {ribStatus !== DocumentStatus.NOT_FILLED && !ribReplace && ribStatus !== DocumentStatus.DENIED
                ? <div className='std-documentV2__content'>
                    <div className='std-documentV2__status-content'>
                      <ShowIcon status={ribStatus} />
                      {t('student.dashboard.card.status.rib')}
                    </div>
                    {ribBisStatus === DocumentStatus.NOT_FILLED
                      ? null
                      : <div className='std-documentV2__status-content'>
                          <ShowIcon status={ribBisStatus} />
                          {t('student.dashboard.card.status.rib')}
                          <div>
                            {t('document.statut.bis')}
                          </div>
                        </div>
                    }
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
                    <div className='std-documentV2__status-content'>
                      <ShowIcon status={ribStatus} />
                      {t('student.dashboard.card.status.rib')}
                    </div>
                    {ribBisStatus === DocumentStatus.NOT_FILLED
                      ? null
                      : <div className='std-documentV2__status-content'>
                          <ShowIcon status={ribBisStatus} />
                          {t('student.dashboard.card.status.rib')}
                          <div>
                            {t('document.statut.bis')}
                          </div>
                        </div>
                    }
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
      }
      {loading === null
        ? <Skeleton variant='rectangular' animation='wave' width={800} height={50} />
        : <div className='std-documentV2__button'>
            <ClassicButton title={t('document.send')} onClick={() => { postFile() }} />
          </div>
      }
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
