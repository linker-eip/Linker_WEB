import React, { useEffect, useState } from 'react'
import '../../CSS/StudentDashboard.scss'
import '../../CSS/StudentStatistics.scss'
import isPrivateRoute from '../../Component/isPrivateRoute'
import HotbarDashboard from '../Dashbord/Partials/HotbarDashboard'
import SidebarDashboard from '../Dashbord/Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../Enum'
import StudentProfileContent from '../Dashbord/Profile/partials/StudentProfileContent'
import StatisticsSales from './partials/StatisticsSales'
import MissionStatistics from './partials/MissionStatistics'
import ProfileApi from '../../API/ProfileApi'
import { type StudentProfileInfo } from '../../Typage/ProfileType'

function StudentStatistics (): JSX.Element {
  isPrivateRoute()
  const { t } = useTranslation()
  const state = DashboardState
  const [profileData, setProfileData] = useState<StudentProfileInfo>()
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
        if (data !== undefined && data !== null) {
          setProfileData(data)
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
      <HotbarDashboard> { t('student.dashboard.stat') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.STATISTICS} />
        <div className='std-bord-container__content'>
          {profileData !== undefined
            ? <StudentProfileContent editable={false} data={profileData} update={refreshProfileData} />
            : null
          }
          <MissionStatistics />
          <div className='std-statistics__container'>
          <StatisticsSales />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentStatistics
