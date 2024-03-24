import React, { useState, useEffect, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileContent.scss'
import Avatar from '@mui/material/Avatar'
import PlaceIcon from '@mui/icons-material/Place'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import ArticleIcon from '@mui/icons-material/Article'
import LanguageIcon from '@mui/icons-material/Language'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ProfileApi from '../../../../API/ProfileApi'
import type { ProfileCompany } from '../../../../Typage/ProfileType'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BaseButton from '../../../../Component/BaseButton'
import DropZone from '../../../../Component/DropZone'
import ClassicButton from '../../../../Component/ClassicButton'
import ModalValidation from '../../../../Component/ModalValidation'
import { ModalType } from '../../../../Enum'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../Router/routes'

interface Props {
  editable: boolean
}

function CompanyProfileContent ({ editable }: Props): JSX.Element {
  const [profileData, setProfileData] = useState<ProfileCompany>()
  const { t } = useTranslation()
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const [website, setWebsite] = useState<string | undefined>(undefined)
  const [activity, setActivity] = useState<string | undefined>(undefined)
  const [nbrMission, setNbrMission] = useState<number | undefined>(0)
  const [isEdit, setIsEdit] = useState(false)
  const [isAvatarEditing, setIsAvatarEditing] = useState(false)
  const [AvatarImage, setAvatarImage] = useState<any>(undefined)
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined)
  const maxLength = 500
  const [deactivateModal, setDeactivateModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://dev.linker-app.fr/api/mission', {
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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await ProfileApi.getCompanyProfile(localStorage.getItem('jwtToken') as string)
        setProfileData(data)
        setDescription(data.description)
        setLocation(data.location)
        setWebsite(data.website)
        setActivity(data.activity)
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
        const data = await ProfileApi.getCompanyProfile(localStorage.getItem('jwtToken') as string)
        setProfileData(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    refetchData()
  }, [isEdit])

  const handleAvatarEditing = (): void => {
    if (editable) {
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

  const handleActivity = (event: ChangeEvent<HTMLInputElement>): void => {
    setActivity(event.target.value)
  }

  const handleValidNewInfo = (): void => {
    handleEditMode()
    const fd = new FormData()
    fd.append('description', description ?? '')
    fd.append('location', location ?? '')
    fd.append('website', website ?? '')
    fd.append('activity', activity ?? '')
    ProfileApi.updateCompanyProfile(localStorage.getItem('jwtToken') as string, fd)
  }

  const handleNewPicture = async (): Promise<void> => {
    setIsAvatarEditing(!isAvatarEditing)

    const picture = new FormData()
    picture.append('file', AvatarImage[0])
    const returnValue = await ProfileApi.uploadFile(localStorage.getItem('jwtToken') as string, picture)

    const fd = new FormData()
    fd.append('picture', String(returnValue))
    await ProfileApi.updateCompanyProfile(localStorage.getItem('jwtToken') as string, fd)
    window.location.reload()
  }

  const openDeactivateModal = (): void => {
    setDeactivateModal(true)
  }

  const openDeleteModal = (): void => {
    setDeleteModal(true)
  }

  const closeDeactivateModal = (): void => {
    setDeactivateModal(false)
  }

  const closeDeleteModal = (): void => {
    setDeleteModal(false)
  }

  const deactivateAccount = (): void => {
    setDeactivateModal(false)
    ProfileApi.deactivateCompanyAccount(localStorage.getItem('jwtToken') as string)
      .then(() => {
        navigate(ROUTES.COMPANY_LOGIN_PAGE)
      })
      .catch((error) => {
        console.error('[ERROR] - Unable to deactivate account:', error)
      })
  }

  const deleteAccount = (): void => {
    setDeleteModal(false)
    ProfileApi.deleteCompanyAccount(localStorage.getItem('jwtToken') as string)
      .then(() => {
        navigate(ROUTES.COMPANY_REGISTER_PAGE)
      })
      .catch((error) => {
        console.error('[ERROR] - Unable to delete account:', error)
      })
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
                          <BaseButton title='Envoyer' onClick={(): void => { handleNewPicture() }} />
                        </div>
                      : null }
                  </div>
                : <div onClick={handleAvatarEditing}>
                    { profilePicture !== '' ? <Avatar alt='avatar' className='std-profile-content__avatar' src={profilePicture} /> : <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' /> }
                  </div>
              }
            <div className='std-profile-content__content'>
              <h1 className='std-profile-content__title'>
                { profileData?.name }
              </h1>
              { profileData?.description !== '' ? <p> { profileData?.description } </p> : <p> Description </p>}
              <div className='std-profile-content__section'>
                <PlaceIcon />
                { profileData?.location !== '' ? <p> { profileData?.location } </p> : <p> Localité </p> }
              </div>
              <div className='std-profile-content__section'>
                <LanguageIcon />
                { profileData?.website !== '' ? <p className='std-profile-content__site'> { profileData?.website } </p> : <p> Site Web </p> }
              </div>
              <div className='std-profile-content__section'>
                <BusinessCenterIcon />
                { profileData?.activity !== '' ? <p> { profileData?.activity } </p> : <p> Activité </p> }
              </div>
              <div className='std-profile-content__section'>
                <ArticleIcon />
                <p> Nombre total de missions: { nbrMission } </p>
              </div>
            </div>
            { editable
              ? <div onClick={handleEditMode}>
                <EditIcon className='std-profile-content__edit-small' />
                </div>
              : <div></div>
            }
            <div className='std-profile-content__content'></div>
            <div className='std-profile-content__content'></div>
            <div className='std-profile-content__content'></div>
            <div className='std-profile-content__content'></div>
            <div className='std-profile-content__content'></div>
            <div className='std-profile-content__content'>
              <div className='std-profile-content__section'>
                <ClassicButton title='Désactiver votre compte' onClick={openDeactivateModal} refuse />
              </div>
              <div className='std-profile-content__section'>
                <ClassicButton title='Supprimer votre compte' onClick={openDeleteModal} refuse />
              </div>
              {
                profileData !== null && profileData !== undefined && (
                  <>
                    <ModalValidation
                      subject={profileData.name}
                      open={deactivateModal}
                      onClose={closeDeactivateModal}
                      type={ModalType.DEACTIVATE_ACCOUNT}
                      onValid={deactivateAccount}
                    />
                    <ModalValidation
                      subject={profileData.name}
                      open={deleteModal}
                      onClose={closeDeleteModal}
                      type={ModalType.DELETE_ACCOUNT}
                      onValid={deleteAccount}
                    />
                  </>
                )
              }
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
                          <BaseButton title='Envoyer' onClick={(): void => { handleNewPicture() }} />
                        </div>
                      : null }
                  </div>
                : <div onClick={handleAvatarEditing}>
                    { profilePicture !== '' ? <Avatar alt='avatar' className='std-profile-content__avatar' src={profilePicture} /> : <Avatar alt='avatar' className='std-profile-content__avatar' src='/assets/anonymLogo.jpg' /> }
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
                <TextField
                  value={activity}
                  onChange={handleActivity}
                  variant='standard'
                  id="standard-required"
                  label={t('student.profile.edit_mode.activity')}
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

export default CompanyProfileContent
