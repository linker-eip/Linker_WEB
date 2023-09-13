import React, { useState, useEffect, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileContent.scss'
import Avatar from '@mui/material/Avatar'
import PlaceIcon from '@mui/icons-material/Place'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import ProfileApi from '../../../../API/ProfileApi'
import type { Profile } from '../../../../Typage/ProfileType'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BaseButton from '../../../../Component/BaseButton'
import DropZone from '../../../../Component/DropZone'

function StudentProfileContent (): JSX.Element {
  const [profileData, setProfileData] = useState<Profile>()
  const { t } = useTranslation()
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const [website, setWebsite] = useState<string | undefined>(undefined)
  const [isEdit, setIsEdit] = useState(false)
  const [isAvatarEditing, setIsAvatarEditing] = useState(false)
  const [AvatarImage, setAvatarImage] = useState<any>(undefined)
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
        setProfileData(data)
        setDescription(data.description)
        setLocation(data.location)
        setWebsite(data.website)
        setProfilePicture(data.picture)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function refetchData () {
      try {
        const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
        setProfileData(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    refetchData()
  }, [isEdit])

  const handleAvatarEditing = (): void => {
    setIsAvatarEditing(!isAvatarEditing)
  }

  const handleEditMode = (): void => {
    setIsEdit(!isEdit)
  }

  const [starsMark, setStarsMark] = useState(5)
  const [starsStatus, setStarsStatus] = useState(['selected', 'selected', 'selected', 'selected', 'selected'])

  const handleAvatarImage = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event)
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

  const handleValidNewInfo = (): void => {
    handleEditMode()
    ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, { description, location, website })
  }

  const handleNewPicture = (): void => {
    setIsAvatarEditing(!isAvatarEditing)
    ProfileApi.updateProfile(localStorage.getItem('jwtToken') as string, { picture: AvatarImage[0] })
  }

  const handleChangeStars = (): void => {
    if (starsMark !== 5) {
      setStarsMark(starsMark + 1)
    } else {
      setStarsMark(0)
    }

    switch (starsMark) {
      case 0:
        setStarsStatus(['no', 'no', 'no', 'no', 'no'])
        break
      case 1:
        setStarsStatus(['selected', 'no', 'no', 'no', 'no'])
        break
      case 2:
        setStarsStatus(['selected', 'selected', 'no', 'no', 'no'])
        break
      case 3:
        setStarsStatus(['selected', 'selected', 'selected', 'no', 'no'])
        break
      case 4:
        setStarsStatus(['selected', 'selected', 'selected', 'selected', 'no'])
        break
      case 5:
        setStarsStatus(['selected', 'selected', 'selected', 'selected', 'selected'])
        break
      default:
        break
    }
  }

  return (
    <div className='std-profile-content'>
      {
        !isEdit
          ? <div className='std-profile-content__container'>
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
                : <div onClick={handleAvatarEditing}>
                    { profilePicture !== '' ? <Avatar alt='avatar' className='std-profile-content__avatar' src={profilePicture} /> : <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' /> }
                  </div>
              }
            <div className='std-profile-content__content'>
              <h1 className='std-profile-content__title'>
                { profileData?.firstName } { profileData?.lastName }
              </h1>
              { profileData?.description !== '' ? <p> { profileData?.description } </p> : <p> Description </p>}
              <div className='std-profile-content__mark' onClick={handleChangeStars}>
                {
                  starsStatus.map((item, index) => {
                    if (item === 'selected') {
                      return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars-selected' key={index} />
                    } else {
                      return <img src='/assets/stars.svg' alt='stars' className='std-profile-content__stars' key={index} />
                    }
                  })
                }
                <div className='std-profile-content__circle' />
                <p> nbr mission</p>
              </div>
                <div className='std-profile-content__section'>
                  <PlaceIcon />
                  { profileData?.location !== '' ? <p> { profileData?.location } </p> : <p> Localité </p> }
                </div>
                <div className='std-profile-content__section'>
                  { profileData?.website !== '' ? <p className='std-profile-content__site'> { profileData?.website } </p> : <p> Site Web </p> }
                </div>
              </div>
            <div onClick={handleEditMode}>
              <EditIcon className='std-profile-content__edit' />
            </div>
          </div>
          : <div className='std-profile-content__container'>
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
                : <div onClick={handleAvatarEditing}>
                    <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' />
                  </div>
              }
              <div className='std-profile-content__content'>
                <TextField
                  defaultValue={description}
                  onChange={handleDesc}
                  variant='standard'
                  id="standard-required"
                  label={t('student.profile.edit_mode.desc')}
                />
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
              <div onClick={handleEditMode}>
                <CloseIcon className='std-profile-exp__edit'/>
              </div>
          </div>
      }
    </div>
  )
}

export default StudentProfileContent
