/* eslint-disable */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useState, useEffect, type ChangeEvent } from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/CompanyDetailedMission.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { DashboardState, ModalType, MissionStatus, TaskStatus, TicketType } from '../../Enum'
import { useTranslation } from 'react-i18next'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import ClassicButton from '../../Component/ClassicButton'
import ModalValidation from '../../Component/ModalValidation'
import { useParams } from 'react-router-dom'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import type { CompanyMissionDetails, GroupInvitedList, MissionInfo, MissionTaskArrayInfo } from '../../Typage/Type'
import MissionApi from '../../API/MissionApi'
import MissionGroup from './partials/MissionGroup'
import TaskTab from './partials/TaskTab'
import Historic from './partials/Historic'
import DropZoneV2 from '../../Component/DropZoneV2'
import ReportButton from '../../Component/ReportButton'

interface HistoricDataEntry {
  logo: string | undefined
  name: string
  action: string
}

function CompanyDetailedMission (): JSX.Element {
  isPrivateRoute()
  const { missionId } = useParams()
  const [open, setOpen] = useState(false)
  const [edit, setEditOpen] = useState(false)
  const [notationModal, setNotationModal] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [missionData, setMissionData] = useState<CompanyMissionDetails>()
  const [editMissionData, setEditMissionData] = useState<MissionInfo>()
  const [nbrMission, setNbrMission] = useState<number | undefined>(0)
  const [hasCompanyNoted, setHasCompanyNoted] = useState<number>(0)
  const [hasCompanyCommented, setHasCompanyCommented] = useState<number>(0)
  const [refetchMissionData, setRefetch] = useState<boolean>(false)
  const [nbrFinishedTask, setFinishedTask] = useState<number>(0)
  const [devis, setDevis] = useState<any>()
  const [isDevis, setIsDevis] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [invitedGroups, setInvitedGroups] = useState<GroupInvitedList[]>()
  const [groupToAccept, setGroupToAccept] = useState<number[]>()
  const [group, setGroup] = useState('')
  const [comment, setComment] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false)

  const handleChange = (event: SelectChangeEvent): void => {
    setGroup(event.target.value)
  }

  useEffect(() => {
    async function fetchData (): Promise<void> {
      if (typeof missionId === 'undefined') {
        console.error('missionId is undefined.')
        return
      }

      const response = await MissionApi.getCompanyDetailedMission(localStorage.getItem('jwtToken') as string, missionId)
      setMissionData(response)
      if (response !== undefined) {
        setFinishedTask(response.missionTaskArray.filter((missionTask: MissionTaskArrayInfo) => missionTask.missionTask.status === TaskStatus.FINISHED).length)
        const value = await MissionApi.getPaymentStatus(localStorage.getItem('jwtToken') as string, response.mission.id)
        setPaymentStatus(value)
        if (response.mission.specificationsFile !== undefined && response.mission.specificationsFile !== null) {
          setIsDevis(true)
          setIsValid(true)
          setDevis(response.mission.specificationsFile)
        }
      }
      const response2 = await MissionApi.getGroupList(localStorage.getItem('jwtToken') as string, missionId)
      if (response2 !== undefined) {
        setInvitedGroups(response2)
      }
      const response3 = await MissionApi.getGroupAcceptedMission(localStorage.getItem('jwtToken') as string, missionId)
      if (response3 !== undefined) {
        setGroupToAccept(response3)
      }
    }
    fetchData()
  }, [missionId, refetchMissionData])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/mission`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const pendingMissionsCount = data.filter(
          (item: any) => item.status !== 'FINISHED' && item.status !== 'CANCELLED').length
        setNbrMission(pendingMissionsCount)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  useEffect(() => {
    switch (missionData?.mission.status) {
      case MissionStatus.PENDING:
        setActiveStep(1)
        break
      case MissionStatus.ACCEPTED:
        setActiveStep(2)
        break
      case MissionStatus.PROVISIONED:
        setActiveStep(3)
        break
      case MissionStatus.IN_PROGRESS:
        setActiveStep(4)
        break
      case MissionStatus.FINISHED:
        setActiveStep(5)
        break
      default:
        break
    }
  }, [missionData])

  const handleRefuseOpen = (): void => {
    setOpen(true)
  }

  const handleRefuseClose = (): void => {
    setOpen(false)
  }

  const handleEditOpen = (): void => {
    setEditMissionData(missionData?.mission)
    setEditOpen(true)
  }

  const handleEditClose = (): void => {
    setEditOpen(false)
  }

  const handleNotationOpen = (): void => {
    setNotationModal(true)
  }

  const handleNotationClose = (): void => {
    setNotationModal(false)
  }

  const handleCommentOpen = (): void => {
    setCommentModal(true)
  }

  const handleCommentClose = (): void => {
    setCommentModal(false)
  }

  const handleRefetch = (): void => {
    setRefetch(!refetchMissionData)
  }

  const handlePaymentCheckout = async (): Promise<void> => {
    try {
      if (missionData?.mission) {
        const paymentCheckout = await MissionApi.getCompanyMissionCheckout(localStorage.getItem('jwtToken') as string, missionData?.mission.id)
        if (typeof paymentCheckout.sessionUrl === 'string' && paymentCheckout.sessionUrl.trim() !== '') {
          window.open(paymentCheckout.sessionUrl, '_blank', 'noopener,noreferrer')
        } else {
          console.log('[ERROR] - Session URL is missing in the response.')
        }
      }
    } catch (error) {
      console.error('[ERROR] - Unable to proceed payment checkout:', error)
    }
  }

  const [starsStatus, setStarsStatus] = useState(['selected', 'selected', 'selected', 'selected', 'selected'])
  const state = DashboardState
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    t('company.detailed_mission.research_mission'),
    t('company.detailed_mission.accepted'),
    t('company.detailed_mission.provisionée'),
    t('company.detailed_mission.in_progress'),
    t('company.detailed_mission.completed')
  ]

  const [historicData, setHistoricData] = useState<HistoricDataEntry[]>([])

  useEffect(() => {
    setHistoricData([
      {
        logo: missionData?.companyProfile.picture ?? '',
        name: 'Vous',
        action: 'avez noté la prestation.'
      },
      {
        logo: missionData?.companyProfile.picture ?? '',
        name: 'Vous',
        action: 'avez laissé un avis sur la prestation.'
      }
    ])
  }, [missionData?.companyProfile])

  const handleUpdate = (): void => {
    const payload = {
      name: editMissionData?.name,
      description: editMissionData?.description,
      amount: editMissionData?.amount
    }

    fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/mission/${String(missionId)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(async response => await response.json())
      .then(() => {
        setEditOpen(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la modifcation de la mission: ${String(error)}`)
      })
  }

  const [fieldValidity, setFieldValidity] = useState({
    nameValid: true,
    descriptionValid: true,
    amountValid: true
  })

  useEffect(() => {
    const isValid = {
      nameValid: editMissionData?.name.trim() !== '',
      descriptionValid: editMissionData?.description.trim() !== '',
      amountValid: editMissionData !== undefined && editMissionData?.amount > 0
    }

    setFieldValidity(isValid)
  }, [editMissionData])

  const isFormValid = (): boolean => {
    return Object.values(fieldValidity).every(value => value)
  }

  const finishMission = async (): Promise<void> => {
    if (missionData?.mission !== undefined && missionData.mission.id !== undefined) {
      try {
        const response = await MissionApi.finishMission(localStorage.getItem('jwtToken') as string, missionData.mission.id)
        if (response !== undefined) {
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const downloadDevis = (): void => {
    window.open(devis, '_blank')
  }

  const handleDevis = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsValid(true)
    setDevis(event)
  }

  const validDevis = (): void => {
    setIsDevis(true)
    uploadSpecifications()
  }

  const resetDevis = (): void => {
    setIsDevis(false)
    setIsValid(false)
    setDevis(undefined)
  }

  const uploadSpecifications = async (): Promise<void> => {
    if (devis.length > 0 && devis[0].size <= 2 * 1024 * 1024) {
      const specificationsFormData = new FormData()
      specificationsFormData.append('specifications', devis[0])
      try {
        if (missionData?.mission.id !== undefined) {
          const response = await MissionApi.uploadSpecifications(localStorage.getItem('jwtToken') as string, missionData?.mission.id, specificationsFormData)
          if (response !== undefined) {
            window.location.reload()
          }
        }
      } catch (error) {
        console.error(error)
      }
    } else if (devis.length > 0) {
      alert('Votre fichier ne doit pas exéder 2 Mb.')
    }
  }

  const handleComment = async (): Promise<void> => {
    try {
      const missionId = missionData?.mission.id
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/mission/company/comment/${missionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`
        },
        body: JSON.stringify({
          comment: comment
        })
      })
      if (!response.ok) throw new Error('Erreur lors de l\'appel API')
      setHasCompanyCommented(1)
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error)
    }
  }

  const handleNote = async (): Promise<void> => {
    try {
      const missionId = missionData?.mission.id
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/mission/company/note/${missionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`
        },
        body: JSON.stringify({
          note: 5
        })
      })
      if (!response.ok) throw new Error('Erreur lors de l\'appel API')
      setHasCompanyNoted(1)
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error)
    }
  }

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> {t('student.dashboard.mission')} </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        {missionData !== undefined && missionData !== null
          ? <div className='std-bord-container__content'>
            <div className='cpn-detailed-mission__section'>
              <ReportButton TicketType={TicketType.MISSION} id={missionData.mission.id} />
              {missionData.mission.status === MissionStatus.PENDING
                ? <div className='cpn-detailed-mission__potential-section'>
                  <p className='cpn-detailed-mission__section__title'> {t('company.detailed_mission.research_mission')} </p>
                  <div className='cpn-detailed-mission__potential-button'>
                    <ClassicButton title='Modifier' onClick={handleEditOpen} />
                    <ClassicButton title='Supprimer' refuse onClick={handleRefuseOpen} />
                  </div>
                </div>
                : null
              }
              {missionData.mission.status === MissionStatus.ACCEPTED
                ? <div className='cpn-detailed-mission__potential-section'>
                  <p className='cpn-detailed-mission__section__title'> {t('student.detailed_mission.mission_pending')} </p>
                </div>
                : null
              }
              {missionData.mission.status === MissionStatus.FINISHED
                ? <div className='cpn-detailed-mission__potential-section'>
                  <p className='cpn-detailed-mission__section__title'> {t('student.detailed_mission.mission_completed')} </p>
                </div>
                : null
              }
              <p className='cpn-detailed-mission__section__title-3'>{missionData.mission.name}</p>
              <p className='cpn-detailed-mission__section__title-4'>{missionData.mission.description}</p>
              <Stepper
                activeStep={activeStep - 1}
                alternativeLabel
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>
                      <p className={
                        index === activeStep - 1
                          ? 'cpn-detailed-mission__stepper-active'
                          : 'cpn-detailed-mission__stepper'
                      }>
                        {label}
                      </p>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className='cpn-detailed-mission__container'>
              <div className='cpn-detailed-mission__section'>
                <div className='cpn-detailed-mission__section__notation'>
                  <p className='cpn-detailed-mission__container__title'>{t('student.detailed_mission.details')}</p>
                  {
                    missionData.mission.status === MissionStatus.IN_PROGRESS
                      ? <div>
                        {`Tâches terminées: ${nbrFinishedTask}/${missionData.missionTaskArray.length}`}
                      </div>
                      : null
                  }
                  {
                    missionData.missionTaskArray.length > 0 && nbrFinishedTask === missionData.missionTaskArray.length && (missionData.mission.status === MissionStatus.IN_PROGRESS || missionData.mission.status === MissionStatus.PROVISIONED)
                      ? paymentStatus 
                        ? <ClassicButton title={t('company.mission.finished')} onClick={finishMission} />
                        : <ClassicButton title={t('company.mission.pay')} onClick={() => { handlePaymentCheckout() }}/>
                      : null
                  }
                  {missionData.mission.isNoted === false ? (
                    <div>
                      {missionData.mission.status === MissionStatus.FINISHED && hasCompanyNoted === 0
                        ? <ClassicButton title='Noter' onClick={handleNotationOpen} />
                        : null
                      }
                      {missionData.mission.status === MissionStatus.FINISHED && hasCompanyCommented === 0
                        ? <ClassicButton title='Laisser un avis' onClick={handleCommentOpen} />
                        : null
                      }
                    </div>
                  ) :
                    <div></div>
                  }
                </div>
                {isValid
                  ? null
                  : <div>
                      <div> { t('company.detailed_mission.devis.devis') } </div>
                      <DropZoneV2 onClose={resetDevis} onObjectChange={handleDevis} />
                    </div>
                }
                { devis !== undefined && isValid && !isDevis
                  ? <div className='cpn-detailed-mission__import-section'>
                      <img src='/assets/downloadInvoice.png' />
                      <p> {devis[0].path } </p>
                      <ClassicButton title='Valider' onClick={validDevis} />
                      <ClassicButton title='Remplacer' onClick={resetDevis} />
                    </div>
                  : null }
                { isDevis
                  ? <div className='cpn-detailed-mission__devis'>
                      <img src='/assets/downloadInvoice.png' />
                      { t('company.detailed_mission.devis.title', { name: missionData.mission.name }) }
                      <ClassicButton title='remplacer' onClick={resetDevis} />
                      <ClassicButton title='Télécharger' onClick={downloadDevis} />
                    </div>
                  : null
                }
                { missionData.mission.status === MissionStatus.PENDING
                  ? <div className='cpn-detailed-mission__selection'>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> { t('company.detailed_mission.selection') } </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={group}
                          label={ t('company.detailed_mission.selection') }
                          onChange={handleChange}
                          >
                            {invitedGroups !== undefined
                              ? invitedGroups.map((element: GroupInvitedList, index: number) => (
                                <MenuItem key={index} value={element.groupId}> {element.groupName} </MenuItem>
                              ))
                              : null
                            }
                        </Select>
                      </FormControl>
                    </div>
                  : null
                }
                <TaskTab missionStatus={missionData.mission.status} missionTask={missionData.missionTaskArray} missionId={parseInt(missionId ?? '0', 10)} groupInfo={missionData.group} groupStudentInfo={missionData.groupStudents} displayId={group} groupListToAccept={groupToAccept ?? null} onCallback={handleRefetch} />
              </div>
              <div className='cpn-detailed-mission__column'>
                <MissionGroup missionData={missionData} />
                <div>
                  <div className='cpn-detailed-mission__section'>
                    <p className='cpn-detailed-mission__container__title'> {t('company.detailed_mission.historic')} </p>
                    <Historic missionStatus={missionData.mission.status} companyName={missionData.companyProfile.name} groupName={missionData.group !== null ? missionData.group.name : 'GroupName'} companyLogo={missionData.companyProfile.picture} groupLogo={missionData.group !== null ? missionData.group.picture : 'GroupName'} />
                    {hasCompanyNoted > 0 && (
                      <div className='cpn-detailed-mission__sub-section'>
                        <div className='cpn-detailed-mission__row'>
                          <Avatar className='cpn-detailed-mission__historic-logo' src={historicData[0].logo} />
                          <div className='cpn-detailed-mission__text-important'> {historicData[0].name}</div>
                          <div className='cpn-detailed-mission__text '> {historicData[0].action} </div>
                        </div>
                      </div>
                    )}
                    {hasCompanyCommented > 0 && (
                      <div className='cpn-detailed-mission__sub-section'>
                        <div className='cpn-detailed-mission__row'>
                          <Avatar className='cpn-detailed-mission__historic-logo' src={historicData[1].logo} />
                          <div className='cpn-detailed-mission__text-important'> {historicData[1].name}</div>
                          <div className='cpn-detailed-mission__text '> {historicData[1].action} </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null}
      </div>
      {
        open
          ? <ModalValidation
            subject={missionData?.mission.name ?? ''}
            open={open}
            type={ModalType.DELETE}
            id={missionData?.mission.id}
            isDetails={true}
            onClose={handleRefuseClose}
          />
          : null
      }
      {
        notationModal
          ? <ModalValidation
            subject={missionData?.mission.name ?? ''}
            open={notationModal}
            type={ModalType.NOTATION}
            onClose={handleNotationClose}
            onValid={() => { handleNote() }}
          />
          : null
      }
      {
        commentModal
          ? <ModalValidation
            subject={missionData?.mission.name ?? ''}
            open={commentModal}
            type={ModalType.COMMENT}
            onClose={handleCommentClose}
            onValid={() => { handleComment() }}
            onCommentChange={setComment}
          />
          : null
      }
      <Dialog open={edit} onClose={handleEditClose}>
        <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Modifier la mission</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titre"
            fullWidth
            value={editMissionData?.name}
            onChange={(e) => {
              if (editMissionData !== null && editMissionData !== undefined) {
                setEditMissionData({ ...editMissionData, name: e.target.value })
                setFieldValidity({ ...fieldValidity, nameValid: true })
              }
            }}
            error={!fieldValidity.nameValid}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editMissionData?.description}
            onChange={(e) => {
              if (editMissionData !== null && editMissionData !== undefined) {
                setEditMissionData({ ...editMissionData, description: e.target.value })
                setFieldValidity({ ...fieldValidity, descriptionValid: true })
              }
            }}
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            error={!fieldValidity.descriptionValid}
          />
          <TextField
            margin="dense"
            label="Prix"
            fullWidth
            value={editMissionData?.amount}
            onChange={(e) => {
              if (editMissionData !== null && editMissionData !== undefined) {
                const parsedAmount = parseInt(e.target.value, 10)
                setEditMissionData({
                  ...editMissionData,
                  amount: isNaN(parsedAmount) ? 0 : parsedAmount
                })
                setFieldValidity({
                  ...fieldValidity,
                  amountValid: !isNaN(parsedAmount) && parsedAmount > 0
                })
              }
            }}
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            error={!fieldValidity.amountValid}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditClose}
            color="primary"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              if (isFormValid()) {
                handleUpdate()
              }
            }}
            color="primary"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            disabled={!isFormValid()}
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CompanyDetailedMission
