/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/StudentDetailedMission.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { DashboardState, ModalType } from '../../Enum'
import { useTranslation } from 'react-i18next'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Avatar } from '@mui/material'
import ClassicButton from '../../Component/ClassicButton'
import ModalValidation from '../../Component/ModalValidation'
import { useParams } from 'react-router-dom'

interface MissionPotentialItems {
  id: number
  name: string
  status: string
  description: string
  companyId: number
  startOfMission: Date
  endOfMission: Date
  amount: number
  skills: string
}

function CompanyDetailedMission (): JSX.Element {
  isPrivateRoute()
  const { missionId } = useParams()
  const potential = true
  const [open, setOpen] = useState(false)
  const [acceptModal, setAcceptModal] = useState(false)
  const [missionData, setMissionData] = useState<MissionPotentialItems>()

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/mission', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        setMissionData(data.filter((item: any) => item.id.toString() === missionId?.toString()).map((item: MissionPotentialItems) => {
          return {
            id: item.id,
            name: item.name,
            status: item.status,
            description: item.description,
            companyId: item.companyId,
            startOfMission: item.startOfMission,
            endOfMission: item.endOfMission,
            amount: item.amount,
            skills: item.skills
          }
        })[0])
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

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
        { missionData !== undefined && missionData !== null
          ? <div className='std-bord-container__content'>
              <div className='std-detailed-mission__section'>
                <p className='std-detailed-mission__section__title-3'> { missionData.name } </p>
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
                <div className='std-detailed-mission__section'>
                  <p className='std-detailed-mission__container__title'> { t('student.detailed_mission.details') } </p>
                  <div className='std-detailed-mission__tab-container std-detailed-mission__tab-container--colored'>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.detail')} </p>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.quantity')} </p>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.unitary_price')} </p>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.total_price')} </p>
                  </div>
                    {/* { data.missionDetails.map((details, index) => (
                      <div className='std-detailed-mission__tab-container' key={index}>
                        <div className='std-detailed-mission__sub-section'>
                          <p> {details.element} </p>
                          <div className='std-detailed-mission__sub-container'>
                            {
                              details.description.map((description, index) => (
                                <div key={index} className='std-detailed-mission__content'>
                                  <div className='std-detailed-mission__circle' />
                                  <p > {description} </p>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                        <div className='std-detailed-mission__sub-section'>
                          <p className='std-detailed-mission__centered'> {details.quantity} </p>
                        </div>
                        <div className='std-detailed-mission__sub-section'>
                          <p className='std-detailed-mission__centered'> {details.unitaryPrice} € </p>
                        </div>
                        <div className='std-detailed-mission__sub-section'>
                          <p className='std-detailed-mission__centered'> {details.total} € </p>
                        </div>
                      </div>
                    ))} */}
                </div>
                <div className='std-detailed-mission__column'>
                    <div className='std-detailed-mission__section'>
                      <div className='std-detailed-mission__row'>
                        <img className='std-detailed-mission__logo' src={'missionData.logo'} />
                        <div className='std-detailed-mission__column'>
                          <p className='std-detailed-mission__section__title-2'> { missionData?.name } </p>
                          <p className='std-detailed-mission__section__subtitle'> company name= { missionData?.name } </p>
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
                          <p> {'missionData.nbrMission'} {t('student.detailed_mission.mission')} </p>
                        </div>
                        <p className='std-detailed-mission__conversation'> {t('student.detailed_mission.conversation')} </p>
                      </div>
                    </div>
                    <div>
                      <div className='std-detailed-mission__section'>
                        <p className='std-detailed-mission__container__title'> { t('student.detailed_mission.historic') } </p>
                        {/* {
                          missionData.historic.map((historic, index) => (
                            <div className='std-detailed-mission__sub-section' key={index}>
                              <div className='std-detailed-mission__row'>
                                <Avatar className='std-detailed-mission__historic-logo' src={historic.logo} />
                                <div className='std-detailed-mission__text-important'> {historic.name} </div>
                                <div className='std-detailed-mission__text '> {historic.action} </div>
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
