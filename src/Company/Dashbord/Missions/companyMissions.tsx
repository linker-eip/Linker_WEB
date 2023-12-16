import React, { useState } from 'react'
import '../../../CSS/StudentDashboard.scss'
import '../../../CSS/StudentMission.scss'
import HotbarDashboard from '../../Partials/HotbarDashboard'
import SidebarDashboard from '../../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import isPrivateRoute from '../../../Component/isPrivateRoute'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CompanyMissionsPending from './Partials/CompanyMissionPending'
import CompanyMissionsCompleted from './Partials/CompanyMissionCompleted'
import CompanyMissionsCancelled from './Partials/CompanyMissionCancelled'
import CompanyMissionsPotential from './Partials/CompanyMissionPotential'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel (props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props

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

function CompanyMissions (): JSX.Element {
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
            <Tabs
              className='std-mission__text'
              value={value} onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                className='std-mission__text'
                label={t('company.mission.pending.title')}
                {...a11yProps(0)}
              />
              <Tab
                className='std-mission__text'
                label={t('company.mission.completed.title')}
                {...a11yProps(0)}
              />
              <Tab
                className='std-mission__text'
                label={t('company.mission.cancelled.title')}
                {...a11yProps(0)}
              />
              <Tab
                className='std-mission__text'
                label={t('company.mission.potential.title')}
                {...a11yProps(0)}
              />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <CompanyMissionsPending />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CompanyMissionsCompleted />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <CompanyMissionsCancelled />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <CompanyMissionsPotential />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyMissions
