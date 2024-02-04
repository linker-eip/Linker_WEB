/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileContent.scss'
import Avatar from '@mui/material/Avatar'
import PlaceIcon from '@mui/icons-material/Place'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import ProfileApi from '../../../../API/ProfileApi'
import type { StudentProfileInfo } from '../../../../Typage/ProfileType'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BaseButton from '../../../../Component/BaseButton'
import DropZone from '../../../../Component/DropZone'

interface Props {
  editable: boolean
  data: StudentProfileInfo
  update: () => void
}

function StudentProfileContent (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const [website, setWebsite] = useState<string | undefined>(undefined)
  const [isEdit, setIsEdit] = useState(false)
  const [isAvatarEditing, setIsAvatarEditing] = useState(false)
  const [AvatarImage, setAvatarImage] = useState<any>(undefined)
  const maxLength = 500
  useEffect(() => {
    setDescription(props.data.description)
    setLocation(props.data.location)
    setWebsite(props.data.website)
  }, [])

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
  // }, [isEdit])

  const handleAvatarEditing = (): void => {
    if (props.editable) {
      setIsAvatarEditing(!isAvatarEditing)
    }
  }

  const handleEditMode = (): void => {
    setIsEdit(!isEdit)
  }

  const handleAvatarImage = (event: ChangeEvent<HTMLInputElement>): void => {
    setAvatarImage(event)
  }

  const handleDesc = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
  }

  const handleLoc = (event: ChangeEvent<HTMLInputElement>): void => {
    setLocation(event.target.value)
  }

  const handleWebsite = (event: ChangeEvent<HTMLInputElement>): void => {
    setWebsite(event.target.value)
  }

  const handleValidNewInfo = async (): Promise<void> => {
    handleEditMode()
    const fd = new FormData()
    fd.append('description', description ?? '')
    fd.append('location', location ?? '')
    fd.append('website', website ?? '')
    const response = await ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, fd)
    if (response !== undefined) {
      props.update()
    }
  }

  const handleNewPicture = async (): Promise<void> => {
    setIsAvatarEditing(!isAvatarEditing)
    const picture = new FormData()
    picture.append('picture', AvatarImage[0])
    const response = await ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, picture)
    if (response !== undefined) {
      props.update()
    }
  }
  return (
    <div className='std-profile-content'>
      {
        !isEdit
          ? <div className='std-profile-content__container'>
            <div className='std-profile-content__container-2'>
              { isAvatarEditing
                ? <div>
                    <div onClick={handleAvatarEditing}>
                      <CloseIcon className='std-profile-exp__edit'/>
                    </div>
                    <DropZone onObjectChange={handleAvatarImage}/>
                    { AvatarImage !== undefined
                      ? <div>
                          <p> {AvatarImage[0].path } </p>
                          <BaseButton title='Envoyer' onClick={handleNewPicture} />
                        </div>
                      : null }
                  </div>
                : <div onClick={handleAvatarEditing} className='std-profile-content__avatar-section'>
                    { props.data.picture !== null && props.data.picture !== undefined ? <Avatar alt='avatar' className='std-profile-content__avatar' src={props.data.picture} /> : <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' /> }
                  </div>
              }
            <div className='std-profile-content__content'>
              <h1 className='std-profile-content__title'>
                { props.data.firstName } { props.data.lastName }
              </h1>
              { props.data.description !== '' ? <p> { props.data.description } </p> : <p> Description </p>}
              <div className='std-profile-content__mark'>
                { props.data.note }
                <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars-selected' />
                <div className='std-profile-content__circle' />
                <p> mission réalisé : <strong> {props.data.note} </strong></p>
              </div>
                <div className='std-profile-content__section'>
                  <PlaceIcon />
                  { props.data.location !== '' ? <p> { props.data.location } </p> : <p> Localité </p> }
                </div>
                <div className='std-profile-content__section'>
                  { props.data.website !== '' ? <p className='std-profile-content__site'> { props.data.website } </p> : <p> Site Web </p> }
                </div>
              </div>
            </div>
            { props.editable
              ? <div onClick={handleEditMode}>
                  <EditIcon className='std-profile-content__edit' />
                </div>
              : null
            }
          </div>
          : <div className='std-profile-content__container'>
            <div className='std-profile-content__container-2'>
              { isAvatarEditing
                ? <div>
                    <div onClick={handleAvatarEditing}>
                      <CloseIcon className='std-profile-content__edit'/>
                    </div>
                    <DropZone onObjectChange={handleAvatarImage}/>
                    { AvatarImage !== undefined
                      ? <div className='std-profile-content__avatar-section'>
                          <p> {AvatarImage[0].path } </p>
                          <BaseButton title='Envoyer' onClick={handleNewPicture} />
                        </div>
                      : null }
                  </div>
                : <div onClick={handleAvatarEditing}>
                    { props.data.picture !== null && props.data.picture !== undefined ? <Avatar alt='avatar' className='std-profile-content__avatar' src={props.data.picture} /> : <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' /> }
                  </div>
              }
              <div className='std-profile-content__content'>
              <div className='std-profile-content__row'>
                  <TextField
                    defaultValue={description}
                    onChange={handleDesc}
                    variant='standard'
                    id="standard-required"
                    label={t('student.profile.edit_mode.desc')}
                    inputProps={{
                      maxLength
                    }}
                  />
                  <p className='std-profile-content__text'>{description?.length ?? 0}/{maxLength} </p>
                </div>
                <TextField
                  value={location}
                  onChange={handleLoc}
                  variant='standard'
                  id="standard-required"
                  label={t('student.profile.edit_mode.location')}
                />
                <TextField
                  value={website}
                  onChange={handleWebsite}
                  variant='standard'
                  id="standard-required"
                  label={t('student.profile.edit_mode.website')}
                />
                <BaseButton title='Envoyer' onClick={handleValidNewInfo} />
              </div>
            </div>
              <div onClick={handleEditMode}>
                <CloseIcon className='std-profile-content__edit'/>
              </div>
          </div>
      }
    </div>
  )
}

export default StudentProfileContent
