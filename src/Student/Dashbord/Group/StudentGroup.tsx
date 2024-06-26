/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../../../CSS/StudentDashboard.scss'
import '../../../CSS/StudentMission.scss'
import HotbarDashboard from '../Partials/HotbarDashboard'
import SidebarDashboard from '../Partials/SidebarDashboard'
import { useTranslation } from 'react-i18next'
import { DashboardState } from '../../../Enum'
import isPrivateRoute from '../../../Component/isPrivateRoute'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import GroupChat from './partials/GroupChat'
import Group from './partials/Group'
import GroupApi from '../../../API/GroupApi'
import type { Group as GroupData, GroupInvitationData } from '../../../Typage/Type'
import Invitations from './partials/Invitations'

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

function StudentGroup (): JSX.Element {
  isPrivateRoute()
  const state = DashboardState
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const [groupData, setGroupData] = useState<GroupData>()
  const [groupInvitationData, setGroupInvitationData] = useState<GroupInvitationData>()
  const [refetchData, setRefetchData] = useState(false)

  useEffect(() => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      const groupInvitationData = await GroupApi.getGroupInvitation(localStorage.getItem('jwtToken') as string)
      const groupData = await GroupApi.getGroup(localStorage.getItem('jwtToken') as string)
      setGroupData(groupData)
      setGroupInvitationData(groupInvitationData)
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
      <HotbarDashboard> { t('student.dashboard.group') } </HotbarDashboard>
      <div className='std-bord-container__page'>
        <SidebarDashboard state={state.GROUP} />
        <div className='std-bord-container__content'>
          <div className='std-mission__group-page'>
            <Tabs className='std-mission__text' value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='std-mission__text' label={ groupData?.data?.name ?? t('student.dashboard.groups.my_group')} {...a11yProps(0)} />
              <Tab className='std-mission__text' label={t('student.dashboard.groups.chat')} {...a11yProps(0)} />
              <Tab className='std-mission__text' label={t('student.dashboard.groups.invite', { nbrInvitation: groupInvitationData?.data?.length ?? 0 })} {...a11yProps(0)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <Group data={groupData} onReturn={handleRefetch} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <GroupChat data={groupData} onReturn={handleRefetch} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Invitations data={groupInvitationData?.data} onReturn={handleRefetch} />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentGroup
