/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/StudentDetailedMission.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Dashbord/Partials/HotbarDashboard'
import SidebarDashboard from '../Dashbord/Partials/SidebarDashboard'
import { DashboardState, ModalType } from '../../Enum'
import { useTranslation } from 'react-i18next'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Avatar } from '@mui/material'
import ClassicButton from '../../Component/ClassicButton'
import ModalValidation from '../../Component/ModalValidation'

function StudentDetailedMission (): JSX.Element {
  isPrivateRoute()
  const potential = true
  const [open, setOpen] = useState(false)
  const [acceptModal, setAcceptModal] = useState(false)
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

  const [missionData] = useState<{ logo: string, name: string, companyName: string, mark: number, nbrMission: number, historic: Array<{ logo: string, name: string, action: string }> }>(
    {
      logo: '/assets/anonymLogo.jpg',
      name: 'Killian PASTOR',
      companyName: 'Physic Form 2.0',
      mark: 5,
      nbrMission: 10,
      historic: [
        {
          logo: '/assets/anonymLogo.jpg',
          name: 'Vous',
          action: 'avez indiqué la mission est en cours'
        },
        {
          logo: '/assets/anonymLogo.jpg',
          name: 'Vous',
          action: 'avez accepté la mission'
        },
        {
          logo: '/assets/anonymLogo.jpg',
          name: 'Killian PASTOR',
          action: 'a provisionné la mission'
        }
      ]
    }
  )
  const [data] = useState<{ title: string, step: number, missionDetails: Array<{ element: string, description: string[], quantity: number, unitaryPrice: number, total: number }> }>(
    {
      title: 'Développement d’une application mobile pour une salle de sports',
      step: 3,
      missionDetails: [
        {
          element: 'Page d\'accueil',
          description: [
            'Presentation du produit',
            '...'
          ],
          quantity: 1,
          unitaryPrice: 350.00,
          total: 350.00
        },
        {
          element: 'Page de connexion',
          description: [
            '2 champs',
            '1 button'
          ],
          quantity: 1,
          unitaryPrice: 180.00,
          total: 180.00
        },
        {
          element: 'Page d\'inscription',
          description: [
            '6 champs',
            '...'
          ],
          quantity: 1,
          unitaryPrice: 350.00,
          total: 350.00
        }
      ]
    }
  )

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
            <p className='std-detailed-mission__section__title-3'> { data.title } </p>
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
                { data.missionDetails.map((details, index) => (
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
                ))}
            </div>
            <div className='std-detailed-mission__column'>
                <div className='std-detailed-mission__section'>
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
                </div>
                <div>
                  <div className='std-detailed-mission__section'>
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
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      {
        open ? <ModalValidation subject={data.title} open={open} type={ModalType.REFUS} onClose={handleRefuseClose} /> : null
      }
      {
        acceptModal ? <ModalValidation subject={data.title} open={acceptModal} type={ModalType.ACCEPT} onClose={handleAcceptClose} /> : null
      }
    </div>
  )
}

export default StudentDetailedMission
