/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileExperience.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import DropZone from '../../../../Component/DropZone'
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

function StudentProfileEducation (props: Props): JSX.Element {
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
  // const [photo, setPhoto] = useState<string | undefined>()
  const handleModalOpen = (): void => {
    setIsEdit(!isEdit)
    setOpen(true)
  }
  const handleModalClose = (): void => {
    setOpen(false)
    setIsEdit(!isEdit)
  }

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

    const studies = new FormData()
    studies.append('studies[0][name]', experienceName ?? '')
    studies.append('studies[0][city]', localisation ?? '')
    studies.append('studies[0][duration]', formatRange(dateRange[0], dateRange[1]))
    studies.append('studies[0][description]', description ?? '')
    studies.append('studies[0][logo]', String(returnValue))
    studies.append('studies[0][position]', position ?? '')
    const response = await ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, studies)
    if (response !== undefined) {
      props.update()
    }
  }

  const handleNewExperience = (): void => {
    handleEditMode()
    callApi()
    handleModalClose()
  }

  const removeStudies = async (studyId: number): Promise<void> => {
    const response = await ProfileApi.removeStudies(localStorage.getItem('jwtToken') as string, studyId)
    if (response !== undefined) {
      props.update()
    }
  }

  const handleRemoveStudies = (studyId: number): void => {
    removeStudies(studyId)
  }

  const { t } = useTranslation()
  return (
    <div className='std-profile-exp'>
      <div className='std-profile-exp__columns'>
        <div className='std-profile-exp__title-container'>
          <h1 className='std-profile-exp__title'> { t('student.profile.education.title') } </h1>
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
          { props.data.studies !== undefined
            ? props.data.studies.map((item, index: number) => (
            <div className={ props.data.studies.length > index + 1 ? 'std-profile-exp__separator' : 'std-profile-exp__row'} key={index}>
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
              { isEditing ? <img className='std-profile-exp__delete-skill' src='/assets/remove.svg' onClick={() => handleRemoveStudies(item.id)} /> : null}
              </div>
            </div>
            ))
            : '' }
        </div>
        {isEditing &&
          <div className='std-profile-exp__add' onClick={handleModalOpen}>
            <img src='/assets/adder.svg'/>
            <p> { t('student.profile.education.add_form') } </p>
          </div>
        }
      </div>
      <Modal open={open} onClose={handleModalClose} >
        <div className='std-profile-exp__modal'>
          <h1> Ajoute ton expérience </h1>
            <div className='std-profile-exp__content'>
              <DropZone onObjectChange={handleLogo} />
              { logo !== undefined
                ? <div>
                    <p> {logo[0].path } </p>
                  </div>
                : null
              }
              <TextField
                className='std-profile-exp__input'
                value={experienceName}
                onChange={handleExperienceName}
                variant='standard'
                id="standard-required"
                label={t('student.profile.education.name')}
              />
              <TextField
                className='std-profile-exp__input'
                value={position}
                onChange={handlePositionChange}
                variant='standard'
                id="standard-required"
                label={t('student.profile.education.position')}
              />
              <TextField
                className='std-profile-exp__input'
                value={localisation}
                onChange={handleLocalisationChange}
                variant='standard'
                id="standard-required"
                label={t('student.profile.education.localisation')}
              />
              <p className='std-profile-exp__text'> { t('student.profile.education.date') } </p>
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

export default StudentProfileEducation
