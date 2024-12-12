import MemberCard from './MemberCard'
import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import GroupApi from '../../../../API/GroupApi'
import ModalCreateGroup from './ModalCreateGroup'
import io, { type Socket } from 'socket.io-client'
import MemberInvitedCard from './MemberInvitedCard'
import MessageIcon from '@mui/icons-material/Message'
import { TextField, InputAdornment } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import ClassicButton from '../../../../Component/ClassicButton'
import type { Group as GroupData, InvitedMember } from '../../../../Typage/Type'

interface Props {
  data: GroupData | undefined
  onReturn: () => void
}

interface GroupMessage {
  id: number
  content: string
  lastName: string
  picture: string
  firstName: string
  timestamp: string
}

function GroupChat (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [hasGroup, setStatus] = useState<boolean>(false)
  const [creationGroup, setCreationGroup] = useState<boolean>(false)
  const [memberInvited, setMemberInvited] = useState<InvitedMember[] | undefined>()
  const [refetch, setRefetch] = useState<boolean>(false)

  useEffect(() => {
    function setGroupStatusOnMounted (): void {
      if (props.data?.data?.name === undefined) {
        setStatus(false)
      } else {
        setStatus(true)
      }
    }
    setGroupStatusOnMounted()
  }, [props.data])

  useEffect(() => {
    async function setInvitedData (): Promise<void> {
      const jwtToken = localStorage.getItem('jwtToken') as string

      if (jwtToken != null && hasGroup) {
        const response = await GroupApi.getMemberInvited(jwtToken)
        setMemberInvited(response.data)
      } else {
        console.error('JWT token is missing')
      }
    }
    setInvitedData()
  }, [refetch])

  const handleCreateGroup = (): void => {
    setCreationGroup(false)
    props.onReturn()
  }

  const openModal = (): void => {
    setCreationGroup(true)
  }

  const handleRefetch = (): void => {
    setRefetch(!refetch)
  }

  const [newMessage, setNewMessage] = useState('')
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([])
  const socket = useRef<Socket | null>(null)

  const jwtToken = localStorage.getItem('jwtToken') as string

  const connect = (): void => {
    if (jwtToken == null) {
      console.error('JWT token is missing')
      return
    }

    const socketConfig = {
      autoConnect: false,
      transports: ['polling'],
      extraHeaders: { Authorization: `Bearer ${jwtToken}` }
    }

    const newSocket = io(`${process.env.REACT_APP_API_URL as string}`, socketConfig)

    newSocket.on('connect', () => {
      console.log('socket connected')
    })

    newSocket.on('error', (message) => {
      console.error(`error => ${JSON.stringify(message)}`)
    })

    newSocket.on('groupHistory', (message) => {
      if (Array.isArray(message)) {
        const groupMessages = message.map((dict: GroupMessage) => ({
          content: dict.content ?? '',
          lastName: dict.lastName ?? '',
          picture: dict.picture ?? '',
          id: dict.id != null ? dict.id : 0,
          firstName: dict.firstName ?? '',
          timestamp: dict.timestamp ?? ''
        }))

        setGroupMessages(groupMessages)
      } else {
        console.error('Expected an array for group history messages, but got:', message)
      }
    })

    newSocket.on('groupMessage', (newMessage: GroupMessage) => {
      setGroupMessages(prevMessages => [...prevMessages, newMessage])
    })

    socket.current = newSocket
    newSocket.connect()
  }

  const disconnect = (): void => {
    if (socket.current != null) {
      socket.current.close()
      socket.current = null
    }
  }

  const askForGroupHistory = (): void => {
    if (socket.current != null) {
      socket.current.emit('groupHistory')
    }
  }

  const sendGroupMessage = (message: string): void => {
    if (socket.current != null) {
      socket.current.emit('sendGroup', { message })
    }
  }

  useEffect(() => {
    connect()

    const handleConnect = (): void => {
      askForGroupHistory()
    }

    socket.current?.on('connect', handleConnect)

    return () => {
      disconnect()
      socket.current?.off('connect', handleConnect)
    }
  }, [])

  const handleSendMessage = (): void => {
    if (newMessage.trim() !== '') {
      sendGroupMessage(newMessage)
      setNewMessage('')
    }
  }

  return (
    <div>
      {hasGroup
        ? <div className='std-group__container'>
            <div className='std-group__details-section'>
              <div className='std-group__chat-messages'>
                {groupMessages.map((msg, index) => (
                  <div key={index} className='std-group__message'>
                    <div className='std-group__message-header'>
                      <img
                        src={msg.picture !== '' ? msg.picture : '/assets/DefaultProfile.svg'}
                        alt={`${msg.firstName} ${msg.lastName}`}
                        className='std-group__message-picture'
                      />
                      <div className='std-group__message-sender'>
                        {msg.firstName} {msg.lastName}
                      </div>
                      <div className='std-group__message-timestamp'>
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className='std-group__message-text'>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className='std-group__chat-input'>
                <TextField
                  id="search-bar"
                  value={newMessage}
                  variant="outlined"
                  placeholder="Écrivez un message ici"
                  onChange={(e) => {
                    setNewMessage(e.target.value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && newMessage.trim() !== '') {
                      handleSendMessage()
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MessageIcon />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    width: '90%',
                    borderRadius: '20px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px'
                    }
                  }}
                />
                <ClassicButton
                  title={t('student.dashboard.chat.send_message')}
                  onClick={handleSendMessage}
                />
              </div>
            </div>
            <div className='std-group__member-container'>
              <div className='std-group__member-title'> {t('student.dashboard.groups.member_title')} </div>
              <MemberCard member={props.data?.data?.members} />
              <div className='std-group__member-title'> {t('student.dashboard.groups.invited')} </div>
              <MemberInvitedCard member={memberInvited} onDelete={handleRefetch} />
            </div>
          </div>
        : <div className='std-group'>
            <div className='std-group__section'>
              <div className='std-group__text'> {t('student.dashboard.groups.no_group')} </div>
              <ClassicButton title={t('student.dashboard.groups.create_group_button')} onClick={openModal} />
            </div>
            <div className='std-group__image'>
              <img src='/assets/groups_image.svg' />
            </div>
            <ModalCreateGroup open={creationGroup} onClose={handleCreateGroup} />
          </div>
      }
    </div>
  )
}

export default GroupChat
