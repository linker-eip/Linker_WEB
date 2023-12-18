/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/CompanyDetailedMission.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { DashboardState, ModalType, MissionStatus } from '../../Enum'
import { useTranslation } from 'react-i18next'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Avatar } from '@mui/material'
import ClassicButton from '../../Component/ClassicButton'
import ModalValidation from '../../Component/ModalValidation'
import { useParams } from 'react-router-dom'
import { type MissionDetails } from '../../Typage/Type'

function CompanyDetailedMission (): JSX.Element {
  isPrivateRoute()
  const { missionId } = useParams()
  const potential = true
  const [open, setOpen] = useState(false)
  const [acceptModal, setAcceptModal] = useState(false)
  const [missionData, setMissionData] = useState<MissionDetails>()

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
        setMissionData(data.filter((item: any) => item.id.toString() === missionId?.toString()).map((item: MissionDetails) => {
          return {
            id: item.id,
            name: item.name,
            status: item.status,
            description: item.description,
            companyId: item.companyId,
            groupId: item.groupId,
            startOfMission: item.startOfMission,
            endOfMission: item.endOfMission,
            createdAt: item.createdAt,
            amount: item.amount,
            skills: item.skills
          }
        })[0])
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  useEffect(() => {
    switch (missionData?.status) {
      case MissionStatus.PENDING:
        setActiveStep(1)
        break
      case MissionStatus.ACCEPTED:
        setActiveStep(2)
        break
      case MissionStatus.PROVISIONED:
        setActiveStep(2)
        break
      case MissionStatus.IN_PROGRESS:
        setActiveStep(3)
        break
      case MissionStatus.FINISHED:
        setActiveStep(4)
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

  const handleAcceptOpen = (): void => {
    setAcceptModal(true)
  }

  const handleAcceptClose = (): void => {
    setAcceptModal(false)
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

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.mission') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        { missionData !== undefined && missionData !== null
          ? <div className='std-bord-container__content'>
              <div className='cpn-detailed-mission__section'>
                {missionData.status === MissionStatus.PENDING
                  ? <div className='cpn-detailed-mission__section__title'>
                    { t('company.detailed_mission.research_mission') }
                  </div>
                  : null
                }
                <p className='cpn-detailed-mission__section__title-3'> { missionData.name } </p>
                <Stepper activeStep={activeStep - 1} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel>
                        { index <= activeStep - 1
                          ? <p className='cpn-detailed-mission__stepper-active'>{label}</p>
                          : <p className='cpn-detailed-mission__stepper'>{label}</p>
                        }
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>

              <div className='cpn-detailed-mission__container'>
                <div className='cpn-detailed-mission__section'>
                  <p className='cpn-detailed-mission__container__title'> { t('student.detailed_mission.details') } </p>
                  <div className='cpn-detailed-mission__tab-container cpn-detailed-mission__tab-container--colored'>
                    <p className='cpn-detailed-mission__centered'> {t('student.detailed_mission.tab.detail')} </p>
                    <p className='cpn-detailed-mission__centered'> {t('student.detailed_mission.tab.quantity')} </p>
                    <p className='cpn-detailed-mission__centered'> {t('student.detailed_mission.tab.unitary_price')} </p>
                    <p className='cpn-detailed-mission__centered'> {t('student.detailed_mission.tab.total_price')} </p>
                  </div>
                    {/* { data.missionDetails.map((details, index) => (
                      <div className='cpn-detailed-mission__tab-container' key={index}>
                        <div className='cpn-detailed-mission__sub-section'>
                          <p> {details.element} </p>
                          <div className='cpn-detailed-mission__sub-container'>
                            {
                              details.description.map((description, index) => (
                                <div key={index} className='cpn-detailed-mission__content'>
                                  <div className='cpn-detailed-mission__circle' />
                                  <p > {description} </p>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                        <div className='cpn-detailed-mission__sub-section'>
                          <p className='cpn-detailed-mission__centered'> {details.quantity} </p>
                        </div>
                        <div className='cpn-detailed-mission__sub-section'>
                          <p className='cpn-detailed-mission__centered'> {details.unitaryPrice} € </p>
                        </div>
                        <div className='cpn-detailed-mission__sub-section'>
                          <p className='cpn-detailed-mission__centered'> {details.total} € </p>
                        </div>
                      </div>
                    ))} */}
                </div>
                <div className='cpn-detailed-mission__column'>
                    <div className='cpn-detailed-mission__section'>
                      <p className='cpn-detailed-mission__section__title-4'> { t('company.detailed_mission.participants')} </p>
                        {missionData.groupId != null
                          ? <div className='cpn-detailed-mission__column-2'>
                              <div className='cpn-detailed-mission__row'>
                                <img className='cpn-detailed-mission__logo' src={'missionData.logo'} />
                                <div className='cpn-detailed-mission__column'>
                                  <p className='cpn-detailed-mission__section__subtitle'> company name= { missionData?.name } </p>
                                </div>
                              </div>
                              <p className='cpn-detailed-mission__conversation'> {t('student.detailed_mission.conversation')} </p>
                            </div>
                          : <div className='cpn-detailed-mission__column-2'>
                              <img className='cpn-detailed-mission__img' src='/assets/groups_image.svg' />
                              <div className='cpn-detailed-mission__row'>
                                { t('company.detailed_mission.no_participants')}
                              </div>
                            </div>
                        }
                    </div>
                    <div>
                      <div className='cpn-detailed-mission__section'>
                        <p className='cpn-detailed-mission__container__title'> { t('student.detailed_mission.historic') } </p>
                        {missionData.status === MissionStatus.PENDING.toString()
                          ? <div>
                              L’historique est vide.
                            </div>
                          : null
                        }
                        {/* {
                          missionData.historic.map((historic, index) => (
                            <div className='cpn-detailed-mission__sub-section' key={index}>
                              <div className='cpn-detailed-mission__row'>
                                <Avatar className='cpn-detailed-mission__historic-logo' src={historic.logo} />
                                <div className='cpn-detailed-mission__text-important'> {historic.name} </div>
                                <div className='cpn-detailed-mission__text '> {historic.action} </div>
                              </div>
                            </div>
                          ))
                        } */}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          : null}
      </div>
      {
        open ? <ModalValidation subject={missionData?.name ?? ''} open={open} type={ModalType.REFUS} onClose={handleRefuseClose} onValid={() => {}}/> : null
      }
      {
        acceptModal ? <ModalValidation subject={missionData?.name ?? ''} open={acceptModal} type={ModalType.ACCEPT} onClose={handleAcceptClose} onValid={() => {}} /> : null
      }
    </div>
  )
}

export default CompanyDetailedMission
