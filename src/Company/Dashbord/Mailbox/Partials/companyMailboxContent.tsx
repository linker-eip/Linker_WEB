/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Tabs, Tab } from '@mui/material'
import ProfileApi from '../../../../API/ProfileApi'
import * as ROUTES from '../../../../Router/routes'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Conversation {
  id: number
  name: string
  logo?: string | null
}

interface Conversations {
  missionChannels: Conversation[]
  premissionChannels: Conversation[]
}

function StudentMailboxContent (): JSX.Element {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [conversations, setConversations] = useState<Conversations>({
    missionChannels: [],
    premissionChannels: [],
  })

  const [selectedTab, setSelectedTab] = useState<number>(0)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await ProfileApi.getCompanyConversations(localStorage.getItem('jwtToken') as string)
        setConversations(data)
      } catch (error) {
        console.error('Error fetching company conversations:', error)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setSelectedTab(newValue)
  }

  const handleChannelClick = (channel: Conversation): void => {
    let route = ''

    switch (selectedTab) {
      case 0:
        route = ROUTES.COMPANY_MISSION_CHAT.replace(':missionId', channel.id.toString())
        break
      default:
        console.error('Unknown tab selected')
        return
    }

    navigate(route)
  }

  const renderChannelList = (channels: Conversation[], onClickHandler: (channel: Conversation) => void, prefix: string): JSX.Element => (
    <List>
      {channels.map((channel: Conversation) => (
        <ListItem key={`${prefix}-${channel.id}`} onClick={() => onClickHandler(channel)}>
          {channel.logo != null
            ? (
            <ListItemAvatar>
              <Avatar src={channel.logo} alt={channel.name} />
            </ListItemAvatar>
              )
            : null}
          <ListItemText primary={channel.name} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <div className='std-document-content'>
      <div className='std-document-card' style={{width: '100%'}}>
        <div>
          <Box>
            <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
              <Tab label={t('mailbox.mission')} />
              <Tab label={t('mailbox.pre_mission')} />
            </Tabs>
            <Divider />
            {selectedTab === 0 && renderChannelList(conversations.missionChannels, handleChannelClick, 'missionChannel')}
            {selectedTab === 1 && renderChannelList(conversations.premissionChannels, handleChannelClick, 'premissionChannel')}
          </Box>
        </div>
      </div>
    </div>
  )
}

export default StudentMailboxContent
