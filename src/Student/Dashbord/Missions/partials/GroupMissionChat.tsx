import '../../../../CSS/StudentGroup.scss'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GroupApi from '../../../../API/GroupApi'
import io, { type Socket } from 'socket.io-client'
import MessageIcon from '@mui/icons-material/Message'
import MemberCard from '../../Group/partials/MemberCard'
import { TextField, InputAdornment } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import ClassicButton from '../../../../Component/ClassicButton'
import ModalCreateGroup from '../../Group/partials/ModalCreateGroup'
import MemberInvitedCard from '../../Group/partials/MemberInvitedCard'
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

function GroupMissionChat (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [hasGroup, setStatus] = useState<boolean>(false)
  const [creationGroup, setCreationGroup] = useState<boolean>(false)
  const [memberInvited, setMemberInvited] = useState<InvitedMember[] | undefined>()
  const [refetch, setRefetch] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function setGroupStatusOnMounted () {
      if (props.data?.data?.name === undefined) {
        setStatus(false)
      } else {
        setStatus(true)
      }
    }
    setGroupStatusOnMounted()
  }, [props.data])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function setInvitedData () {
      const response = await GroupApi.getMemberInvited(localStorage.getItem('jwtToken') as string)
      setMemberInvited(response.data)
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

  const { missionId } = useParams()

  const [newMessage, setNewMessage] = useState('')
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([])
  const socket = useRef<Socket | null>(null)

  const jwtToken = localStorage.getItem('jwtToken') as string
  const id = missionId

  const connect = (): void => {
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

    newSocket.on('missionHistory', (message) => {
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
        console.error('Expected an array for mission history messages, but got:', message)
      }
    })

    newSocket.on('missionMessage', (newMessage: GroupMessage) => {
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

  const askForMissionHistory = (): void => {
    if (socket.current != null) {
      socket.current.emit('missionHistory', { id })
    }
  }

  const sendMissionMessage = (message: string): void => {
    if (socket.current != null) {
      socket.current.emit('sendMission', { message, id })
    }
  }

  useEffect(() => {
    connect()

    const handleConnect = (): void => {
      askForMissionHistory()
    }

    socket.current?.on('connect', handleConnect)

    return () => {
      disconnect()
      socket.current?.off('connect', handleConnect)
    }
  }, [])

  const handleSendMessage = (): void => {
    sendMissionMessage(newMessage)
    setNewMessage('')
  }

  return (
    <div>
      { hasGroup
        ? <div className='std-group__container'>
            <div className='std-group__details-section'>
                <div className='std-group__chat-messages'>
                  {groupMessages.map((msg, index) => (
                    <div key={index} className='std-group__message'>
                      <div>
                        {msg.firstName} {msg.lastName}: {msg.content}
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
                      title={ t('student.dashboard.chat.send_message') }
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
            <div className='std-group__text'> { t('student.dashboard.groups.no_group') } </div>
            <ClassicButton title={t('student.dashboard.groups.create_group_button')} onClick={openModal}/>
          </div>
          <div className='std-group__image' >
            <img src='/assets/groups_image.svg' />
          </div>
          <ModalCreateGroup open={creationGroup} onClose={handleCreateGroup}/>
        </div>
      }
    </div>
  )
}

export default GroupMissionChat
