/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileCompetence.scss'
import { useTranslation } from 'react-i18next'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import ProfileApi from '../../../../API/ProfileApi'
import type { StudentProfileInfo } from '../../../../Typage/ProfileType'
import DropZone from '../../../../Component/DropZone'
import ClassicButton from '../../../../Component/ClassicButton'

interface Props {
  data: StudentProfileInfo
  update: () => void
}

function StudentProfileCompetence (props: Props): JSX.Element {
  const [skillName, setSkillName] = useState<string>()
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [AvatarImage, setAvatarImage] = useState<any>(undefined)
  const handleSkillOpen = (): void => { setOpen(true) }
  const handleSkillClose = (): void => { setOpen(false) }

  const handleAvatarImage = (event: ChangeEvent<HTMLInputElement>): void => {
    setAvatarImage(event)
  }

  const handleEditMode = (): void => {
    setIsEdit(!isEdit)
  }

  const handleSkillName = (event: ChangeEvent<HTMLInputElement>): void => {
    setSkillName(event.target.value)
  }

  const callApi = async (): Promise<void> => {
    const file = new FormData()
    file.append('file', AvatarImage[0])
    const returnValue = await ProfileApi.uploadFile(localStorage.getItem('jwtToken') as string, file)
    const skills = new FormData()
    skills.append('skills[0][name]', skillName ?? '')
    skills.append('skills[0][logo]', String(returnValue))
    setSkillName('')
    const response = await ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, skills)
    if (response !== undefined) {
      props.update()
    }
  }

  const handleNewSkill = (): void => {
    handleEditMode()
    callApi()
    handleSkillClose()
  }

  const removeSkill = async (skillId: number): Promise<void> => {
    const response = await ProfileApi.removeSkill(localStorage.getItem('jwtToken') as string, skillId)
    if (response !== undefined) {
      props.update()
    }
  }

  const handleRemoveSkill = (skillId: number): void => {
    removeSkill(skillId)
  }

  const { t } = useTranslation()
  return (
    <div className='std-profile-comp'>
      <div className='std-profile-comp__columns'>
        <div className='std-profile-comp__title-container'>
          <h1 className='std-profile-comp__title'> { t('student.profile.skills.title') } </h1>
        </div>
        <div className='std-profile-comp__container'>
          { props.data.skills.map((item, index) => (
          <div className='std-profile-comp__section' key={index}>
            { isEdit ? <img className='std-profile-comp__delete-skill' src='/assets/remove.svg' onClick={() => handleRemoveSkill(item.id)} /> : null}
            <img src={item.logo} className='std-profile-comp__img' />
            <p> {item.name} </p>
          </div>
          )) }
        </div>
        { isEdit
          ? <div className='std-profile-comp__add' onClick={handleSkillOpen}>
            <img src='/assets/adder.svg'/>
            <p> { t('student.profile.skills.add_skill') } </p>
          </div>
          : <></>
      }
      </div>
      { !isEdit
        ? <div onClick={handleEditMode}>
            <EditIcon className='std-profile-comp__edit'/>
          </div>
        : <div onClick={handleEditMode}>
            <CloseIcon className='std-profile-comp__edit'/>
          </div>
        }
      <Modal open={open} onClose={handleSkillClose} >
        <div className='std-profile-comp__modal'>
          <div className='std-profile-comp__modal-title'> Ajoute ta compétence </div>
            <div className='std-profile-comp__content'>
            <DropZone onObjectChange={handleAvatarImage}/>
            { AvatarImage !== undefined
              ? <div className='std-profile-comp__filename'>
                  <img className='std-profile-comp__img' src='/assets/file.png' />
                  <p> {AvatarImage[0].path } </p>
                </div>
              : null }
              <div className='std-profile-comp__textfield'>
                <TextField
                  value={skillName}
                  onChange={handleSkillName}
                  variant='standard'
                  id="standard-required"
                  label="Nom de la compétence"
                  />
              </div>
              <ClassicButton title='Envoyer' onClick={handleNewSkill} />
            </div>
        </div>
      </Modal>
    </div>
  )
}

export default StudentProfileCompetence
