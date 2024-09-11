/* eslint-disable @typescript-eslint/no-unused-vars */
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import PrivateChat from './PrivateChat'
import '../../../../CSS/StudentMission.scss'
import '../../../../CSS/StudentDashboard.scss'
import { useTranslation } from 'react-i18next'
import GroupApi from '../../../../API/GroupApi'
import { DashboardState } from '../../../../Enum'
import React, { useEffect, useState } from 'react'
import HotbarDashboard from '../../Partials/HotbarDashboard'
import SidebarDashboard from '../../Partials/SidebarDashboard'
import type { Group as GroupData } from '../../../../Typage/Type'
import isPrivateRoute from '../../../../Component/isPrivateRoute'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel (props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props
  const { t } = useTranslation()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  )
}

function a11yProps (index: number): any {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function StudentPrivateChat (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const [groupData, setGroupData] = useState<GroupData>()
  const [refetchData, setRefetchData] = useState(false)

  useEffect(() => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      const groupData = await GroupApi.getGroup(localStorage.getItem('jwtToken') as string)
      setGroupData(groupData)
    }
    fetchData()
  }, [refetchData])

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const handleRefetch = (): void => {
    setRefetchData(!refetchData)
  }

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.network') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.NETWORK} />
        <div className='std-bord-container__content'>
          <div className='std-mission__group-page'>
            <Tabs className='std-mission__text' value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='std-mission__text' label={t('student.dashboard.groups.chat')} {...a11yProps(0)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
             <PrivateChat />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentPrivateChat
