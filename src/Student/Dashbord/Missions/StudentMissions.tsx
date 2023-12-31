/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import '../../../CSS/StudentDashboard.scss'
import '../../../CSS/StudentMission.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import isPrivateRoute from '../../../Component/isPrivateRoute'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import StudentMissionsCompleted from './partials/StudentMissionCompleted'
import StudentMissionsPending from './partials/StudentMissionPending'
import StudentMissionsCancelled from './partials/StudentMissionCancelled'
import StudentMissionsPotential from './partials/StudentMissionPotential'

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

function StudentMissions (): JSX.Element {
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
          <div className='std-mission'>
            <Tabs className='std-mission__text' value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='std-mission__text' label={t('student.mission.pending.title')} {...a11yProps(0)} />
              <Tab className='std-mission__text' label={t('student.mission.completed.title')} {...a11yProps(0)} />
              <Tab className='std-mission__text' label={t('student.mission.cancelled.title')} {...a11yProps(0)} />
              <Tab className='std-mission__text' label={t('student.mission.potential.title')} {...a11yProps(0)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <StudentMissionsPending />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <StudentMissionsCompleted />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <StudentMissionsCancelled />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <StudentMissionsPotential />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentMissions
