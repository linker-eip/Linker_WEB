/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/CompanyDetailedMission.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { DashboardState, ModalType, MissionStatus, TaskStatus } from '../../Enum'
import { useTranslation } from 'react-i18next'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import ClassicButton from '../../Component/ClassicButton'
import ModalValidation from '../../Component/ModalValidation'
import { useParams } from 'react-router-dom'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material'
import type { CompanyMissionDetails, MissionInfo, MissionTaskArrayInfo } from '../../Typage/Type'
import MissionApi from '../../API/MissionApi'
import MissionGroup from './partials/MissionGroup'
import TaskTab from './partials/TaskTab'
import Historic from './partials/Historic'

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

    fetch(`https://dev.linker-app.fr/api/admin/mission/${String(missionId)}`, {
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
    console.log(missionData)
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

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.mission') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        { missionData !== undefined && missionData !== null
          ? <div className='std-bord-container__content'>
              <div className='cpn-detailed-mission__section'>
                { missionData.mission.status === MissionStatus.PENDING
                  ? <div className='cpn-detailed-mission__potential-section'>
                    <p className='cpn-detailed-mission__section__title'> { t('company.detailed_mission.research_mission') } </p>
                      <div className='cpn-detailed-mission__potential-button'>
                        <ClassicButton title='Modifier' onClick={handleEditOpen}/>
                        <ClassicButton title='Supprimer' refuse onClick={handleRefuseOpen}/>
                      </div>
                    </div>
                  : null
                }
                { missionData.mission.status === MissionStatus.ACCEPTED
                  ? <div className='cpn-detailed-mission__potential-section'>
                      <p className='cpn-detailed-mission__section__title'> { t('student.detailed_mission.mission_pending') } </p>
                    </div>
                  : null
                }
                { missionData.mission.status === MissionStatus.FINISHED
                  ? <div className='cpn-detailed-mission__potential-section'>
                      <p className='cpn-detailed-mission__section__title'> { t('student.detailed_mission.mission_completed') } </p>
                    </div>
                  : null
                }
                <p className='cpn-detailed-mission__section__title-3'>{ missionData.mission.name }</p>
                <p className='cpn-detailed-mission__section__title-4'>{ missionData.mission.description }</p>
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
                    <p className='cpn-detailed-mission__container__title'>{ t('student.detailed_mission.details') }</p>
                    {
                      missionData.mission.status === MissionStatus.IN_PROGRESS
                        ? <div>
                            { `Tâches terminées: ${nbrFinishedTask}/${missionData.missionTaskArray.length}` }
                          </div>
                        : null
                    }
                    {
                      missionData.missionTaskArray.length > 0 && nbrFinishedTask === missionData.missionTaskArray.length && missionData.mission.status === MissionStatus.IN_PROGRESS
                        ? <ClassicButton title='Terminer la mission' onClick={finishMission} />
                        : null
                    }
                    <div>
                      { missionData.mission.status === MissionStatus.FINISHED && hasCompanyNoted === 0
                        ? <ClassicButton title='Noter' onClick={handleNotationOpen} />
                        : null
                      }
                      { missionData.mission.status === MissionStatus.FINISHED && hasCompanyCommented === 0
                        ? <ClassicButton title='Laisser un avis' onClick={handleCommentOpen} />
                        : null
                      }
                    </div>
                  </div>
                  <TaskTab missionStatus={missionData.mission.status} missionTask={missionData.missionTaskArray} missionId={parseInt(missionId ?? '0', 10)} onCallback={handleRefetch}/>
                </div>
                <div className='cpn-detailed-mission__column'>
                <MissionGroup missionData={missionData} />
                  <div>
                    <div className='cpn-detailed-mission__section'>
                      <p className='cpn-detailed-mission__container__title'> { t('company.detailed_mission.historic') } </p>
                      <Historic missionStatus={missionData.mission.status} companyName={missionData.companyProfile.name} groupName={missionData.group !== null ? missionData.group.name : 'GroupName'} companyLogo={missionData.companyProfile.picture} groupLogo={missionData.group !== null ? missionData.group.picture : 'GroupName'} />
                      { hasCompanyNoted > 0 && (
                        <div className='cpn-detailed-mission__sub-section'>
                          <div className='cpn-detailed-mission__row'>
                            <Avatar className='cpn-detailed-mission__historic-logo' src={historicData[0].logo} />
                            <div className='cpn-detailed-mission__text-important'> {historicData[0].name}</div>
                            <div className='cpn-detailed-mission__text '> {historicData[0].action} </div>
                          </div>
                        </div>
                      )}
                      { hasCompanyCommented > 0 && (
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
              onValid={() => { setHasCompanyNoted(1) }}
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
              onValid={() => { setHasCompanyCommented(1) }}
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
