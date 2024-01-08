/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/StudentDetailedMission.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Dashbord/Partials/HotbarDashboard'
import SidebarDashboard from '../Dashbord/Partials/SidebarDashboard'
import { DashboardState, ModalType, MissionStatus, TaskStatus } from '../../Enum'
import { useTranslation } from 'react-i18next'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Avatar } from '@mui/material'
import ClassicButton from '../../Component/ClassicButton'
import ModalValidation from '../../Component/ModalValidation'
import { useParams } from 'react-router-dom'
import MissionApi from '../../API/MissionApi'
import type { StudentMissionDetails, MissionTaskArrayInfo } from '../../Typage/Type'
import TaskTab from './partials/TaskTab'
import Historic from './partials/Historic'

function StudentDetailedMission (): JSX.Element {
  isPrivateRoute()
  const { missionId } = useParams()
  const potential = true
  const [open, setOpen] = useState(false)
  const [acceptModal, setAcceptModal] = useState(false)
  const [missionData, setMissionData] = useState<StudentMissionDetails>()
  const [refetchMissionData, setRefetch] = useState<boolean>(false)
  const [nbrFinishedTask, setFinishedTask] = useState<number>(0)

  useEffect(() => {
    async function fetchData (): Promise<void> {
      if (typeof missionId === 'undefined') {
        console.error('missionId is undefined.')
        return
      }

      const response = await MissionApi.getStudentDetailedMission(localStorage.getItem('jwtToken') as string, missionId)
      setMissionData(response)
      if (response !== undefined) {
        setFinishedTask(response.missionTaskArray.filter((missionTask: MissionTaskArrayInfo) => missionTask.missionTask.status === TaskStatus.FINISHED).length)
      }
    }
    fetchData()
  }, [missionId, refetchMissionData])

  const handleRefuseOpen = (): void => {
    setOpen(true)
  }

  const handleRefuseClose = (): void => {
    setOpen(false)
  }

  const handleAcceptOpen = (): void => {
    setAcceptModal(true)
  }

  const handleAcceptClose = (): void => {
    setAcceptModal(false)
  }

  const handleRefetch = (): void => {
    setRefetch(!refetchMissionData)
  }

  const finishMission = async (): Promise<void> => {
    if (missionData?.mission !== undefined && missionData.mission.id !== undefined) {
      const response = await MissionApi.finishMission(localStorage.getItem('jwtToken') as string, missionData.mission.id)
      if (response !== undefined) {
        window.location.reload()
      }
    }
  }

  const acceptMission = async (): Promise<void> => {
    if (missionData !== undefined) {
      const response = await MissionApi.acceptMission(localStorage.getItem('jwtToken') as string, missionData.mission.id, missionData.group.id)
      if (response !== undefined) {
        window.location.reload()
      }
    }
  }

  const refuseMission = async (): Promise<void> => {
    console.log('test')
    if (missionData !== undefined) {
      const response = await MissionApi.refuseMission(localStorage.getItem('jwtToken') as string, missionData.mission.id, missionData.group.id)
      if (response !== undefined) {
        window.location.reload()
      }
    }
  }

  const [starsStatus, setStarsStatus] = useState(['selected', 'selected', 'selected', 'selected', 'selected'])
  const state = DashboardState
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(1)
  const steps = [
    t('company.detailed_mission.research_mission'),
    t('company.detailed_mission.accepted'),
    t('company.detailed_mission.provisionée'),
    t('company.detailed_mission.in_progress'),
    t('company.detailed_mission.completed')
  ]

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

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.mission') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        <div className='std-bord-container__content'>
          { missionData !== undefined
            ? <div className='cpn-detailed-mission__section'>
                { missionData.mission.status === MissionStatus.PENDING
                  ? <div className='cpn-detailed-mission__potential-section'>
                      <p className='cpn-detailed-mission__section__title'> { t('company.detailed_mission.research_mission') } </p>
                      <div className='cpn-detailed-mission__potential-button'>
                        <ClassicButton title='Refuser' refuse onClick={handleRefuseOpen}/>
                        <ClassicButton title='Accepter' onClick={handleAcceptOpen} />
                      </div>
                    </div>
                  : null
                }
                { missionData.mission.status === MissionStatus.ACCEPTED || missionData.mission.status === MissionStatus.IN_PROGRESS
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
            : null
          }
          {/* <div className='std-detailed-mission__section'>
            { potential
              ? <div className='std-detailed-mission__potential-section'>
                  <p className='std-detailed-mission__section__title'> { t('student.detailed_mission.pending_mission') } </p>
                  <div className='std-detailed-mission__potential-button'>
                    <ClassicButton title='Refuser' refuse onClick={handleRefuseOpen}/>
                    <ClassicButton title='Accepter' onClick={handleAcceptOpen} />
                  </div>
                </div>
              : <p className='std-detailed-mission__section__title'> { t('student.detailed_mission.pending_mission') } </p>
            }
            <p className='std-detailed-mission__section__title-3'> { missionData?.mission.name } </p>
            <Stepper activeStep={activeStep - 1} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    { index <= activeStep - 1
                      ? <p className='std-detailed-mission__stepper-active'>{label}</p>
                      : <p className='std-detailed-mission__stepper'>{label}</p>
                    }
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div> */}

          <div className='std-detailed-mission__container'>
            <div className='cpn-detailed-mission__section'>
              <div className='std-detailed-mission__row-2'>
                <p className='cpn-detailed-mission__container__title'>{ t('student.detailed_mission.details') }</p>
                <div>
                  { missionData !== undefined && missionData.mission.status === MissionStatus.IN_PROGRESS
                    ? <div>
                        { `Tâches terminées: ${nbrFinishedTask}/${missionData.missionTaskArray.length}` }
                      </div>
                    : null
                  }
                  { missionData !== undefined && missionData.missionTaskArray.length > 0 && nbrFinishedTask === missionData.missionTaskArray.length && missionData.mission.status === MissionStatus.IN_PROGRESS
                    ? <ClassicButton title='Terminer la mission' onClick={finishMission} />
                    : null
                  }
                </div>
              </div>
              {missionData !== undefined
                ? <TaskTab missionTask={missionData.missionTaskArray } missionId={parseInt(missionId ?? '0', 10)} missionStatus={missionData?.mission.status} onCallback={handleRefetch}/>
                : <div />
              }
            </div>
            <div className='std-detailed-mission__column'>
                {/* <div className='std-detailed-mission__section'>
                  <div className='std-detailed-mission__row'>
                    <img className='std-detailed-mission__logo' src={missionData.logo} />
                    <div className='std-detailed-mission__column'>
                      <p className='std-detailed-mission__section__title-2'> { missionData.name } </p>
                      <p className='std-detailed-mission__section__subtitle'> { missionData.companyName } </p>
                    </div>
                  </div>
                  <div className='std-detailed-mission__column-2'>
                    <div className='std-detailed-mission__mark'>
                      {
                        starsStatus.map((item, index) => {
                          return <img src='/assets/stars.svg' alt='stars' className='std-detailed-mission__stars' key={index} />
                        })
                      }
                      <div className='std-detailed-mission__circle' />
                      <p> {missionData.nbrMission} {t('student.detailed_mission.mission')} </p>
                    </div>
                    <p className='std-detailed-mission__conversation'> {t('student.detailed_mission.conversation')} </p>
                  </div>
                </div> */}
                <div>
                   <div className='std-detailed-mission__section'>
                    <p className='std-detailed-mission__container__title'> { t('student.detailed_mission.historic') } </p>
                    {missionData !== undefined
                      ? <Historic missionStatus={missionData?.mission.status} companyName={missionData.mission.name} groupName={missionData.group.name} companyLogo={missionData.group.picture} groupLogo={missionData.group.picture} />
                      : null
                    }
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      {missionData?.mission.status === MissionStatus.PENDING
        ? <div>
            {open ? <ModalValidation subject={missionData.mission.name} open={open} type={ModalType.REFUS} onClose={handleRefuseClose} onValid={refuseMission}/> : null}
            {acceptModal ? <ModalValidation subject={missionData.mission.name} open={acceptModal} type={ModalType.ACCEPT} onClose={handleAcceptClose} onValid={acceptMission} /> : null}
          </div>
        : null
      }
    </div>
  )
}

export default StudentDetailedMission
