import React, { useState, useEffect, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileContent.scss'
import Avatar from '@mui/material/Avatar'
import PlaceIcon from '@mui/icons-material/Place'
import EditIcon from '@mui/icons-material/Edit'
import ProfileApi from '../../../../API/ProfileApi'
import type { Profile } from '../../../../Typage/ProfileType'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BaseButton from '../../../../Component/BaseButton'

function StudentProfileContent (): JSX.Element {
  const [profileData, setProfileData] = useState<Profile>()
  const { t } = useTranslation()
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

  const handleEditMode = (): void => {
    setIsEdit(!isEdit)
  }

  const [description, setDescription] = useState(profileData?.description)
  const [location, setLocation] = useState(profileData?.location)
  const [website, setWebsite] = useState(profileData?.website)

  const [isEdit, setIsEdit] = useState(false)
  const [starsMark, setStarsMark] = useState(5)
  const [starsStatus, setStarsStatus] = useState(['selected', 'selected', 'selected', 'selected', 'selected'])

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
            <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' />
            <div className='std-profile-content__content'>
              <h1 className='std-profile-content__title'>
                { profileData?.name }
              </h1>
              <p> Poste - techno </p>
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
                <p> Localité: Marseille </p>
              </div>
              <div className='std-profile-content__section'>
                <p> Site Web: </p>
                <p className='std-profile-content__site'> https://www.google.fr </p>
              </div>
            </div>
            <div onClick={handleEditMode}>
              <EditIcon className='std-profile-content__edit' />
            </div>
          </div>
          : <div className='std-profile-content__container'>
              <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' />
              <div className='std-profile-content__content'>
                <TextField
                  value={description}
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
                <BaseButton title='submit' onClick={handleValidNewInfo} />
              </div>
          </div>
      }
    </div>
  )
}

export default StudentProfileContent
