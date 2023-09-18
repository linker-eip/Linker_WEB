import React, { useState, type ChangeEvent, useEffect } from 'react'
import '../../../../CSS/StudentProfileCompetence.scss'
import { useTranslation } from 'react-i18next'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import BaseButton from '../../../../Component/BaseButton'
import ProfileApi from '../../../../API/ProfileApi'
import type { Profile } from '../../../../Typage/ProfileType'
import DropZone from '../../../../Component/DropZone'

function StudentProfileCompetence (): JSX.Element {
  const [profileData, setProfileData] = useState<Profile>()
  const [skillName, setSkillName] = useState<string>()
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [AvatarImage, setAvatarImage] = useState<any>(undefined)
  const handleSkillOpen = (): void => { setOpen(true) }
  const handleSkillClose = (): void => { setOpen(false) }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
        setProfileData(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchData()
  }, [])

  const handleAvatarImage = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event)
    setAvatarImage(event)
  }

  const handleEditMode = (): void => {
    setIsEdit(!isEdit)
    console.log(isEdit)
  }

  const handleSkillName = (event: ChangeEvent<HTMLInputElement>): void => {
    setSkillName(event.target.value)
  }

  const handleNewSkill = (): void => {
    handleEditMode()
    const skills = new FormData()
    skills.append('skills[0][name]', skillName ?? '')
    skills.append('skills[0][logo]', AvatarImage[0].path)
    setSkillName('')
    ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, skills)

    handleSkillClose()
  }

  const { t } = useTranslation()
  return (
    <div className='std-profile-comp'>
      <div className='std-profile-comp__columns'>
        <div className='std-profile-comp__title-container'>
          <h1 className='std-profile-comp__title'> { t('student.profile.skills.title') } </h1>
        </div>
        <div className='std-profile-comp__container'>
          { profileData?.skills.map((item, index) => (
          <div className='std-profile-comp__section' key={index}>
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
          <h1> Ajoute ta compétence </h1>
            <div className='std-profile-comp__content'>
            <DropZone onObjectChange={handleAvatarImage}/>
            { AvatarImage !== undefined
              ? <div>
                  <p> {AvatarImage[0].path } </p>
                </div>
              : null }
              <TextField
                value={skillName}
                onChange={handleSkillName}
                variant='standard'
                id="standard-required"
                label="Nom de la compétence"
              />
              <BaseButton title='submit' onClick={handleNewSkill} />
            </div>
        </div>
      </Modal>
    </div>
  )
}

export default StudentProfileCompetence
