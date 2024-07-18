import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import isPrivateRoute from '../../../Component/isPrivateRoute'
import { DashboardState } from '../../../Enum'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { Tab, Tabs } from '@mui/material'
import StudentSecurity from './Partials/StudentSecurity'
import StudentPreferences from './Partials/StudentPreferences'

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

function StudentSettings (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  return (
    <div className='std-bord-container'>
      <HotbarDashboard> { t('student.dashboard.settings') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.SETTINGS} />
        <div className='std-bord-container__content'>
          <div className='std-mission__group-page'>
            <Tabs className='std-mission__text' value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='std-mission__text' label={ t('student.settings.security.title')} {...a11yProps(0)} />
              <Tab className='std-mission__text' label={t('student.settings.preference.title')} {...a11yProps(0)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <StudentSecurity />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <StudentPreferences />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSettings
