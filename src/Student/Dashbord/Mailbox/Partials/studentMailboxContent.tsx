/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Tabs, Tab } from '@mui/material'
import ProfileApi from '../../../../API/ProfileApi'
import * as ROUTES from '../../../../Router/routes'
import { useNavigate } from 'react-router-dom'

interface Conversation {
  id: number
  name: string
  logo?: string | null
}

interface Conversations {
  groupChannel: Conversation | null
  missionChannels: Conversation[]
  premissionChannels: Conversation[]
  dmChannels: Conversation[]
}

function StudentMailboxContent (): JSX.Element {
  const navigate = useNavigate()

  const [conversations, setConversations] = useState<Conversations>({
    groupChannel: null,
    missionChannels: [],
    premissionChannels: [],
    dmChannels: []
  })

  const [selectedTab, setSelectedTab] = useState<number>(0)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData () {
      try {
        const data = await ProfileApi.getStudentConversations(localStorage.getItem('jwtToken') as string)
        setConversations(data)
      } catch (error) {
        console.error('Error fetching student conversations:', error)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setSelectedTab(newValue)
  }

  const handleChannelClick = (channel: Conversation): void => {
    navigate(`${ROUTES.STUDENT_PRIVATE_MESSAGE.replace(':userId', channel.id.toString())}`)

    let route = ''

    switch (selectedTab) {
      case 1:
        route = ROUTES.STUDENT_MISSION_CHAT.replace(':missionId', channel.id.toString())
        break
      case 3:
        route = ROUTES.STUDENT_PRIVATE_MESSAGE.replace(':userId', channel.id.toString())
        break
      default:
        console.error('Unknown tab selected')
        return;
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
              <Tab label="Groupe" />
              <Tab label="Missions" />
              <Tab label="Pré-missions" />
              <Tab label="Messages privés" />
            </Tabs>
            <Divider />
            {selectedTab === 0 && conversations.groupChannel != null && (
              <List>
                <ListItem key={`groupChannel-${conversations.groupChannel.id}`} onClick={() => handleChannelClick(conversations.groupChannel!)}>
                  {conversations.groupChannel.logo != null
                    ? (
                    <ListItemAvatar>
                      <Avatar src={conversations.groupChannel.logo || '/assets/no-profile-picture.jpg'} alt={conversations.groupChannel.name} />
                    </ListItemAvatar>
                      )
                    : null}
                  <ListItemText primary={conversations.groupChannel.name} />
                </ListItem>
              </List>
            )}
            {selectedTab === 1 && renderChannelList(conversations.missionChannels, handleChannelClick, 'missionChannel')}
            {selectedTab === 2 && renderChannelList(conversations.premissionChannels, handleChannelClick, 'premissionChannel')}
            {selectedTab === 3 && renderChannelList(conversations.dmChannels, handleChannelClick, 'dmChannel')}
          </Box>
        </div>
      </div>
    </div>
  )
}

export default StudentMailboxContent
