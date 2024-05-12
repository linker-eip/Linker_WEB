import React, { useEffect, useState } from 'react'
import '../../../../CSS/MissionCard.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../Router/routes'
import ClassicButton from '../../../../Component/ClassicButton'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType } from '../../../../Enum'
import type { MissionInfo, GroupType, CompanyAdminInfo, StudentMissionDetails } from '../../../../Typage/Type'
import GroupApi from '../../../../API/GroupApi'
import MissionApi from '../../../../API/MissionApi'

interface Props {
  data: MissionInfo
  cancelled?: boolean
  potential?: boolean
  onCallback: () => void
}

function MissionCard (props: Props): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [acceptModal, setAcceptModal] = useState(false)
  const [groupData, setGroupData] = useState<GroupType>()
  const [companyData, setCompanyData] = useState<CompanyAdminInfo>()
  const [missionData, setMissionData] = useState<StudentMissionDetails>()

  useEffect(() => {
    async function fetchData (): Promise<void> {
      const response = await GroupApi.getGroup(localStorage.getItem('jwtToken') as string)
      if (response !== undefined) {
        setGroupData(response.data)
      }
      const response2 = await MissionApi.getCompany(localStorage.getItem('jwtToken') as string, props.data.companyId)
      if (response2 !== undefined) {
        setCompanyData(response2)
      }
      const response3 = await MissionApi.getStudentDetailedMission(localStorage.getItem('jwtToken') as string, props.data.id.toString())
      if (response3 !== undefined) {
        setMissionData(response3)
      }
    }
    fetchData()
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

  const handleValidation = (): void => {
    props.onCallback()
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
    if (missionData !== undefined) {
      const response = await MissionApi.refuseMission(localStorage.getItem('jwtToken') as string, missionData.mission.id, missionData.group.id)
      if (response !== undefined) {
        window.location.reload()
      }
    }
  }

  const handleNavigation = (): void => {
    navigate(`${ROUTES.STUDENT_DETAILED_MISSION.replace(':missionId', props.data.id.toString())}`)
  }

  function formatDate (missionDate: string): string {
    const [date] = missionDate.split('T')
    const [year, month, day] = date.split('-')
    return `${day}-${month}-${year}`
  }

  return (
    <div className='mission-card'>
        <img className='mission-card__logo' src={companyData?.companyPicture} />
      <div className='mission-card__container'>
        <div>
          <p className='mission-card__title'> { props.data.name} </p>
        </div>
        <div className='mission-card__content'>
          <div className='mission-card__section'>
            <p className='mission-card__text'> {t('missionCard.price')} </p>
            <p className='mission-card__text-important'> { props.data.amount } € HT </p>
          </div>
          {
            props.data.startOfMission !== undefined &&
            <div className='mission-card__section'>
              <p className='mission-card__text'> {t('missionCard.begin')} </p>
              <p className='mission-card__value'> { formatDate(props.data.startOfMission.toString()) } </p>
            </div>
          }
          <div className='mission-card__section'>
            { props.cancelled !== null && props.cancelled === true
              ? <p className='mission-card__text'> {t('missionCard.cancelled')} </p>
              : <p className='mission-card__text'> {t('missionCard.end')} </p>
            }
            <p className='mission-card__value'> {
              props.cancelled !== null && props.cancelled === true
                ? formatDate(props.data.endOfMission.toString())
                : formatDate(props.data.endOfMission.toString())
              }
            </p>
          </div>
          <div className='mission-card__section'>
            <p className='mission-card__text'> {t('missionCard.participants')} </p>
            <p className='mission-card__value'> { groupData?.members.length } personnes </p>
          </div>
        </div>
        { props.potential ??
          <div className='mission-card__link' onClick={handleNavigation}>
            <p> {t('missionCard.see_mission')} </p>
          </div>
        }
        { props.potential === true
          ? <div className='mission-card__potential-section'>
              <div className='mission-card__link' onClick={handleNavigation}>
                <p> {t('missionCard.see_mission')} </p>
              </div>
              <ClassicButton title='Refuser' refuse onClick={handleRefuseOpen} />
              <ClassicButton title='Accepter' onClick={handleAcceptOpen} />
            </div>
          : null
        }
        </div>
        {
          open ? <ModalValidation subject={props.data.name} open={open} type={ModalType.REFUS} onClose={handleRefuseClose} onValid={props.potential === true ? refuseMission : handleValidation} /> : null
        }
        {
          acceptModal ? <ModalValidation subject={props.data.name} open={acceptModal} type={ModalType.ACCEPT} onClose={handleAcceptClose} onValid={props.potential === true ? acceptMission : handleValidation} /> : null
        }
      </div>
  )
}

export default MissionCard
