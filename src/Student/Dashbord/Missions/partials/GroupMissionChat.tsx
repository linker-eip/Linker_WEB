import '../../../../CSS/StudentGroup.scss'
import { useTranslation } from 'react-i18next'
import GroupApi from '../../../../API/GroupApi'
import io, { type Socket } from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message'
import MemberCard from '../../Group/partials/MemberCard'
import { TextField, InputAdornment } from '@mui/material'
import ClassicButton from '../../../../Component/ClassicButton'
import ModalCreateGroup from '../../Group/partials/ModalCreateGroup'
import MemberInvitedCard from '../../Group/partials/MemberInvitedCard'
import type { Group as GroupData, InvitedMember } from '../../../../Typage/Type'

interface Props {
  data: GroupData | undefined
  onReturn: () => void
}

interface WebSocketHook {
  messages: any[]
  sendMessage: (message: string) => void
}

const useWebSocket = (jwtToken: string): WebSocketHook => {
  const [messages, setMessages] = useState<any[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    console.log('ho', jwtToken)

    const newSocket = io('https://dev.linker-app.fr/', {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    })

    setSocket(newSocket)

    console.log('Tentative de connexion WebSocket...')

    newSocket.on('connect', () => {
      console.log('WebSocket connecté.')
    })

    newSocket.on('error', (error) => {
      console.error('Erreur WebSocket:', error)
    })

    newSocket.on('groupHistory', (groupMessages: any[]) => {
      setMessages(groupMessages)
    })

    newSocket.on('groupMessage', (newMessage: any) => {
      setMessages(prevMessages => [...prevMessages, newMessage])
    })

    return () => {
      newSocket.close()
      console.log('WebSocket déconnecté.')
    }
  }, [jwtToken])

  const sendMessage = (message: string): void => {
    socket?.emit('sendGroup', { message })
  }

  return { messages, sendMessage }
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

  const [newMessage, setNewMessage] = useState('')
  const { messages, sendMessage } = useWebSocket(localStorage.getItem('jwtToken') as string)

  const handleSendMessage = (): void => {
    sendMessage(newMessage)
    setNewMessage('')
  }

  return (
    <div>
      { hasGroup
        ? <div className='std-group__container'>
            <div className='std-group__details-section'>
                <div className='std-group__chat-messages'>
                    {messages.map((msg, index) => (
                    <div key={index} className='std-group__message'>
                        <div>{msg.sender}: {msg.content}</div>
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
