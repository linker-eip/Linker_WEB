import React, { useEffect, useState } from 'react'
import '../../../CSS/StudentDashboard.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import isPrivateRoute from '../../../Component/isPrivateRoute'
import StudentProfileContent from './partials/StudentProfileContent'
import StudentProfileVerification from './partials/StudentProfileVerification'
import StudentProfileCompetence from './partials/StudentProfileCompetence'
import StudentProfileExperience from './partials/StudentProfileExperience'
import StudentProfileEducation from './partials/StudentProfileEducation'
import ProfileApi from '../../../API/ProfileApi'
import { type StudentProfileInfo, type SkillsListInfo } from '../../../Typage/ProfileType'
import { Skeleton } from '@mui/material'

function StudentProfile (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  const [profileData, setProfileData] = useState<StudentProfileInfo>()
  const [skillsList, setSkillsList] = useState<SkillsListInfo>()
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
        if (data !== undefined && data !== null) {
          setProfileData(data)
        }
        const skills = await ProfileApi.getSkillsList(localStorage.getItem('jwtToken') as string)
        if (skills !== undefined && skills !== null) {
          setSkillsList(skills)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchData()
  }, [updateProfile])

  const refreshProfileData = (): void => {
    setUpdateProfile(!updateProfile)
  }

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.profil') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.PROFIL} />
        {profileData !== undefined && skillsList !== undefined
          ? <div className='std-bord-container__content'>
              <StudentProfileContent editable data={profileData} update={refreshProfileData}/>
              <div className='std-bord-container__row'>
                <StudentProfileVerification data={profileData}/>
                <StudentProfileCompetence data={profileData} skills={skillsList} update={refreshProfileData} />
              </div>
              <StudentProfileExperience data={profileData} update={refreshProfileData}/>
              <StudentProfileEducation data={profileData} update={refreshProfileData}/>
            </div>
          : <div className='std-bord-container__skeleton'>
              <div className='std-bord-container__skeleton-row'>
                <Skeleton variant='circular' animation='wave' width={200} height={200} />
                <div className='std-bord-container__skeleton-text'>
                  <Skeleton variant='text' animation='wave' width={500} height={50} />
                  <Skeleton variant='text' animation='wave' width={350} height={25} />
                  <Skeleton variant='text' animation='wave' width={250} height={25} />
                </div>
              </div>
              <div className='std-bord-container__skeleton-row'>
                <Skeleton variant='rounded' animation='wave' width={300} height={500} />
                <Skeleton variant='rounded' animation='wave' width={300} height={500} />
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default StudentProfile
