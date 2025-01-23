/* eslint-disable @typescript-eslint/no-unused-vars */
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import '../../CSS/StudentMission.scss'
import '../../CSS/StudentDashboard.scss'
import { DashboardState } from '../../Enum'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import HotbarDashboard from '../Partials/HotbarDashboard'
import GroupMissionChat from './partials/GroupMissionChat'
import isPrivateRoute from '../../Component/isPrivateRoute'
import SidebarDashboard from '../Partials/SidebarDashboard'

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

function CompanyMissionChat (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.mission') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.MISSION} />
        <div className='std-bord-container__content'>
          <div className='std-mission__group-page'>
            <Tabs className='std-mission__text' value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='std-mission__text' label={t('student.dashboard.groups.chat')} {...a11yProps(0)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <GroupMissionChat />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyMissionChat
