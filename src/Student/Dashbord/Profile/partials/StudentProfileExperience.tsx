/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileExperience.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import DropZoneV2 from '../../../../Component/DropZoneV2'
import ProfileApi from '../../../../API/ProfileApi'
import type { StudentProfileInfo } from '../../../../Typage/ProfileType'
import DatePicker, {} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  data: StudentProfileInfo
  update: () => void
}

function StudentProfileExperience (props: Props): JSX.Element {
  // const [profileData, setProfileData] = useState<StudentProfileInfo>()
  const [experienceName, setExperienceName] = useState<string>()
  const [logo, setLogo] = useState<any>()
  const [position, setPosition] = useState<string>()
  const [localisation, setLocalisation] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [isEdit, setIsEdit] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const handleModalOpen = (): void => {
    setIsEdit(!isEdit)
    setOpen(true)
  }
  const handleModalClose = (): void => {
    setOpen(false)
    setIsEdit(!isEdit)
  }

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  //   async function fetchData () {
  //     try {
  //       const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
  //       setProfileData(data)
  //     } catch (error) {
  //       console.error('Error fetching profile data:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  //   async function refetchData () {
  //     try {
  //       const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
  //       setProfileData(data)
  //     } catch (error) {
  //       console.error('Error fetching profile data:', error)
  //     }
  //   }

  //   refetchData()
  // }, [isSubmited])

  const formatRange = (startDate: Date | null, endDate: Date | null): string => {
    if (startDate === null || endDate === null) return ''

    const startText = format(startDate, 'MMMM yyyy')
    const endText = format(endDate, 'MMMM yyyy')

    return `${startText} - ${endText}`
  }

  const handleEditingMode = (): void => {
    setIsEditing(!isEditing)
  }

  const handleEditMode = (): void => {
    setIsEdit(!isEdit)
  }

  const handleExperienceName = (event: ChangeEvent<HTMLInputElement>): void => {
    setExperienceName(event.target.value)
  }

  const handlePositionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPosition(event.target.value)
  }

  const handleLocalisationChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLocalisation(event.target.value)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value)
  }

  const handleLogo = (event: ChangeEvent<HTMLInputElement>): void => {
    setLogo(event)
  }

  const callApi = async (): Promise<void> => {
    const file = new FormData()
    file.append('file', logo[0])
    const returnValue = await ProfileApi.uploadFile(localStorage.getItem('jwtToken') as string, file)

    const jobs = new FormData()
    jobs.append('jobs[0][name]', experienceName ?? '')
    jobs.append('jobs[0][city]', localisation ?? '')
    jobs.append('jobs[0][duration]', formatRange(startDate, endDate))
    jobs.append('jobs[0][description]', description ?? '')
    jobs.append('jobs[0][logo]', String(returnValue))
    jobs.append('jobs[0][position]', position ?? '')
    const response = await ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, jobs)
    if (response !== undefined) {
      props.update()
    }
  }

  const handleNewExperience = (): void => {
    handleEditMode()
    callApi()
    handleModalClose()
  }

  const removeJob = async (jobId: number): Promise<void> => {
    const response = await ProfileApi.removeJob(localStorage.getItem('jwtToken') as string, jobId)
    if (response !== undefined) {
      props.update()
    }
  }

  const handleRemoveJob = (jobId: number): void => {
    removeJob(jobId)
  }

  const { t } = useTranslation()
  return (
    <div className='std-profile-exp'>
      <div className='std-profile-exp__columns'>
        <div className='std-profile-exp__title-container'>
          <h1 className='std-profile-exp__title'> { t('student.profile.experience.title') } </h1>
          { !isEditing
            ? <div onClick={handleEditingMode}>
              <EditIcon className='std-profile-exp__edit'/>
            </div>
            : <div onClick={handleEditingMode}>
              <CloseIcon className='std-profile-exp__edit'/>
            </div>
        }
        </div>
        <div>
          { props.data.jobs !== undefined
            ? props.data.jobs.map((item, index: number) => (
            <div className={ props.data.jobs.length > index + 1 ? 'std-profile-exp__separator' : 'std-profile-exp__row'} key={index}>
              <img className='std-profile-exp__logo' src={item.logo} alt={item.logo} />
              <div className='std-profile-exp__container'>
                <p className='std-profile-exp__container-title' > {item.name} </p>
                <div className='std-profile-exp__position'>
                  <p> {item.position} </p>
                </div>
                <div className='std-profile-exp__date'>
                  <div className='std-profile-exp__location'>
                    <img src='/assets/location.svg' />
                    <p> {item.city} </p>
                  </div>
                  <div className='std-profile-exp__calendar'>
                    <img src='/assets/calendar.svg' />
                    <p> {item.duration} </p>
                  </div>
                </div>
                <p> {item.description} </p>
              { isEditing ? <img className='std-profile-exp__delete-skill' src='/assets/remove.svg' onClick={() => handleRemoveJob(item.id)} /> : null}
              </div>
            </div>
            ))
            : '' }
        </div>
        {isEditing &&
          <div className='std-profile-exp__add' onClick={handleModalOpen}>
            <img src='/assets/adder.svg'/>
            <p> { t('student.profile.experience.add_exp') } </p>
          </div>
        }
      </div>
      <Modal open={open} onClose={handleModalClose} >
        <div className='std-profile-exp__modal'>
          <h1> Ajoute ton expérience </h1>
            <div className='std-profile-exp__content'>
              <DropZoneV2 onClose={() => {}} onObjectChange={handleLogo} />
              <TextField
                className='std-profile-exp__input'
                value={experienceName}
                onChange={handleExperienceName}
                variant='standard'
                id="standard-required"
                label={t('student.profile.experience.name')}
              />
              <TextField
                className='std-profile-exp__input'
                value={position}
                onChange={handlePositionChange}
                variant='standard'
                id="standard-required"
                label={t('student.profile.experience.position')}
              />
              <TextField
                className='std-profile-exp__input'
                value={localisation}
                onChange={handleLocalisationChange}
                variant='standard'
                id="standard-required"
                label={t('student.profile.experience.localisation')}
              />
              <p className='std-profile-exp__text'> { t('student.profile.experience.date') } </p>
              <div className='std-profile-exp__datepicker'>
                <DatePicker
                  className='std-profile-exp__datepicker'
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update: any) => {
                    setDateRange(update)
                  }}
                  dateFormat='MMMM yyyy'
                  isClearable={true}
                  />
              </div>
              <p className='std-profile-exp__text' > Description </p>
              <textarea
                className='std-profile-exp__input'
                value={description}
                onChange={handleDescriptionChange}
                rows={4}
                cols={32}
              />
              <div className='std-profile-exp__button'>
                <BaseButton title='envoyer' onClick={handleNewExperience} />
              </div>
            </div>
        </div>
      </Modal>
    </div>
  )
}

export default StudentProfileExperience
