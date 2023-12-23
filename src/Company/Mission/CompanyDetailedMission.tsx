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
import ClassicButton from '../../Component/ClassicButton'
import ModalValidation from '../../Component/ModalValidation'
import { useParams } from 'react-router-dom'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material'
import { CompanyMissionDetails } from '../../Typage/Type'

interface MissionDetails {
  id: number
  name: string
  status: string
  description: string
  companyId: number
  companyName: string
  companyProfilePicture: string
  groupId: number
  startOfMission: Date
  endOfMission: Date
  createdAt: Date
  amount: number
  skills: string
}

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
  const [editMissionData, setEditMissionData] = useState<MissionDetails>()
  const [nbrMission, setNbrMission] = useState<number | undefined>(0)
  const [hasCompanyNoted, setHasCompanyNoted] = useState<number>(0)
  const [hasCompanyCommented, setHasCompanyCommented] = useState<number>(0)

  useEffect(() => {
    if (typeof missionId === 'undefined') {
      console.error('missionId is undefined.')
      return
    }

    fetch(`https://dev.linker-app.fr/api/mission/info/${missionId}/company`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        setMissionData({
          id: data.mission.id,
          name: data.mission.name,
          status: data.mission.status,
          description: data.mission.description,
          companyId: data.mission.companyId,
          companyName: data.companyProfile.name,
          companyProfilePicture: data.companyProfile.picture,
          groupId: data.mission.groupId,
          startOfMission: data.mission.startOfMission,
          endOfMission: data.mission.endOfMission,
          createdAt: data.mission.createdAt,
          amount: data.mission.amount,
          skills: data.mission.skills
        })
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [missionId])

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
        logo: missionData?.companyProfilePicture,
        name: 'Vous',
        action: 'avez noté la prestation.'
      },
      {
        logo: missionData?.companyProfilePicture,
        name: 'Vous',
        action: 'avez laissé un avis sur la prestation.'
      }
    ])
  }, [missionData?.companyProfilePicture])

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

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.mission') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        { missionData !== undefined && missionData !== null
          ? <div className='std-bord-container__content'>
              <div className='std-detailed-mission__section'>
                { missionData.status === MissionStatus.PENDING
                  ? <div className='std-detailed-mission__potential-section'>
                    <p className='std-detailed-mission__section__title'> { t('company.detailed_mission.research_mission') } </p>
                      <div className='std-detailed-mission__potential-button'>
                        <ClassicButton title='Modifier' onClick={handleEditOpen}/>
                        <ClassicButton title='Supprimer' refuse onClick={handleRefuseOpen}/>
                      </div>
                    </div>
                  : null
                }
                { missionData.status === 'ACCEPTED'
                  ? <div className='std-detailed-mission__potential-section'>
                      <p className='std-detailed-mission__section__title'> { t('student.detailed_mission.mission_pending') } </p>
                    </div>
                  : null
                }
                { missionData.status === 'FINISHED'
                  ? <div className='std-detailed-mission__potential-section'>
                      <p className='std-detailed-mission__section__title'> { t('student.detailed_mission.mission_completed') } </p>
                    </div>
                  : null
                }
                <p className='std-detailed-mission__section__title-3'>{ missionData.name }</p>
                <p className='std-detailed-mission__section__title-4'>{ missionData.description }</p>
                <Stepper
                  activeStep={missionData.status === 'PENDING' ? 0 : (missionData.status === 'FINISHED' ? steps.length - 1 : activeStep - 1)}
                  alternativeLabel
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel>
                        <p className={
                            index === (missionData.status === 'PENDING' ? 0 : (missionData.status === 'FINISHED' ? steps.length - 1 : activeStep - 1))
                              ? 'std-detailed-mission__stepper-active'
                              : 'std-detailed-mission__stepper'
                          }>
                          {label}
                        </p>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div className='std-detailed-mission__container'>
                <div className='std-detailed-mission__section'>
                  <div className='std-detailed-mission__section__notation'>
                    <p className='std-detailed-mission__container__title'>{ t('student.detailed_mission.details') }</p>
                    <div>
                      { missionData.status === 'FINISHED' && hasCompanyNoted === 0
                        ? <ClassicButton title='Noter' onClick={handleNotationOpen} />
                        : null
                      }
                      { missionData.status === 'FINISHED' && hasCompanyCommented === 0
                        ? <ClassicButton title='Laisser un avis' onClick={handleCommentOpen} />
                        : null
                      }
                    </div>
                  </div>
                  <div className='std-detailed-mission__tab-container std-detailed-mission__tab-container--colored'>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.detail')} </p>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.quantity')} </p>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.unitary_price')} </p>
                    <p className='std-detailed-mission__centered'> {t('student.detailed_mission.tab.total_price')} </p>
                  </div>
                </div>
                <div className='std-detailed-mission__column'>
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
                    {/* <div className='std-detailed-mission__section'>
                      <div className='std-detailed-mission__row'>
                        <img className='std-detailed-mission__logo' src={'missionData.logo'} />
                        <div className='std-detailed-mission__column'>
                          <p className='std-detailed-mission__section__title-2'> { missionData?.name } </p>
                          <p className='std-detailed-mission__section__subtitle'> { missionData?.companyName } </p>
                        </div>
                      </div>
                      <div className='std-detailed-mission__column-2'>
                        <div className='std-detailed-mission__mark'>
                          {
                            starsStatus.map((index) => {
                              return <img src='/assets/stars.svg' alt='stars' className='std-detailed-mission__stars' key={index} />
                            })
                          }
                          <div className='std-detailed-mission__circle' />
                          <p>{ nbrMission } {t('student.detailed_mission.mission')} </p>
                        </div>
                        <p className='std-detailed-mission__conversation'> {t('student.detailed_mission.conversation')} </p>
                      </div>
                    </div> */}
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
                          historicData.map((historic, index) => (
                            <div className='std-detailed-mission__sub-section' key={index}>
                              <div className='std-detailed-mission__row'>
                                <Avatar className='std-detailed-mission__historic-logo' src={historic.logo} />
                                <div className='std-detailed-mission__text-important'> {historic.name} </div>
                                <div className='std-detailed-mission__text '> {historic.action} </div>
                              </div>
                            </div>
                          ))
                        } */}
                        { hasCompanyNoted > 0 && (
                          <div className='std-detailed-mission__sub-section'>
                            <div className='std-detailed-mission__row'>
                              <Avatar className='std-detailed-mission__historic-logo' src={historicData[0].logo} />
                              <div className='std-detailed-mission__text-important'> {historicData[0].name}</div>
                              <div className='std-detailed-mission__text '> {historicData[0].action} </div>
                            </div>
                          </div>
                        )}
                        { hasCompanyCommented > 0 && (
                          <div className='std-detailed-mission__sub-section'>
                            <div className='std-detailed-mission__row'>
                              <Avatar className='std-detailed-mission__historic-logo' src={historicData[1].logo} />
                              <div className='std-detailed-mission__text-important'> {historicData[1].name}</div>
                              <div className='std-detailed-mission__text '> {historicData[1].action} </div>
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
              subject={missionData?.name ?? ''}
              open={open}
              type={ModalType.DELETE}
              id={missionData?.id}
              isDetails={true}
              onClose={handleRefuseClose}
            />
          : null
      }
      {
        notationModal
          ? <ModalValidation
              subject={missionData?.name ?? ''}
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
              subject={missionData?.name ?? ''}
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
