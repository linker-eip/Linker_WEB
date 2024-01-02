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

  const [starsStatus, setStarsStatus] = useState(['selected', 'selected', 'selected', 'selected', 'selected'])
  const state = DashboardState
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(3)
  const steps = [
    t('student.detailed_mission.accepted'),
    t('student.detailed_mission.provisionée'),
    t('student.detailed_mission.in_progress'),
    t('student.detailed_mission.completed')
  ]

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.mission') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        <div className='std-bord-container__content'>
          <div className='std-detailed-mission__section'>
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
          </div>

          <div className='std-detailed-mission__container'>
            {missionData !== undefined
              ? <TaskTab missionTask={missionData.missionTaskArray } missionId={parseInt(missionId ?? '0', 10)} missionStatus={missionData?.mission.status} onCallback={handleRefetch}/>
              : null
            }
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
                  {/* <div className='std-detailed-mission__section'>
                    <p className='std-detailed-mission__container__title'> { t('student.detailed_mission.historic') } </p>
                    {
                      missionData.historic.map((historic, index) => (
                        <div className='std-detailed-mission__sub-section' key={index}>
                          <div className='std-detailed-mission__row'>
                            <Avatar className='std-detailed-mission__historic-logo' src={historic.logo} />
                            <div className='std-detailed-mission__text-important'> {historic.name} </div>
                            <div className='std-detailed-mission__text '> {historic.action} </div>
                          </div>
                        </div>
                      ))
                    }
                  </div> */}
                </div>
            </div>
          </div>
        </div>
      </div>
      {missionData?.mission.status === MissionStatus.PENDING
        ? <div>
            {open ? <ModalValidation subject={missionData.mission.name} open={open} type={ModalType.REFUS} onClose={handleRefuseClose} onValid={() => {}}/> : null}
            {acceptModal ? <ModalValidation subject={missionData.mission.name} open={acceptModal} type={ModalType.ACCEPT} onClose={handleAcceptClose} onValid={() => {}} /> : null}
          </div>
        : null
      }
    </div>
  )
}

export default StudentDetailedMission
