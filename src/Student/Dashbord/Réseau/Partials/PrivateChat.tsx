/* eslint-disable */
import '../../../../CSS/StudentGroup.scss'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import io, { type Socket } from 'socket.io-client'
import MessageIcon from '@mui/icons-material/Message'
import { TextField, InputAdornment, Avatar, Box, Typography, Stack } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import ClassicButton from '../../../../Component/ClassicButton'

interface PrivateMessage {
  id: number
  authorId: number
  content: string
  lastName: string
  picture: string
  firstName: string
  timestamp: string
}

function PrivateChat (): JSX.Element {
  const { t } = useTranslation()

  const { userId } = useParams()

  const [newMessage, setNewMessage] = useState('')
  const [groupMessages, setGroupMessages] = useState<PrivateMessage[]>([])
  const socket = useRef<Socket | null>(null)

  const jwtToken = localStorage.getItem('jwtToken') as string

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

    newSocket.on('directMessageHistory', (message) => {
      if (Array.isArray(message)) {
        const groupMessages = message.map((dict: PrivateMessage) => ({
          content: dict.content ?? '',
          lastName: dict.lastName ?? '',
          picture: dict.picture ?? '',
          id: dict.id != null ? dict.id : 0,
          authorId: dict.authorId != null ? dict.authorId : 0,
          firstName: dict.firstName ?? '',
          timestamp: dict.timestamp ?? ''
        }))

        setGroupMessages(groupMessages)
      } else {
        console.error('Expected an array for mission history messages, but got:', message)
      }
    })

    newSocket.on('directMessage', (newMessage: PrivateMessage) => {
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
      socket.current.emit('directMessageHistory', { userId })
    }
  }

  const sendMissionMessage = (message: string): void => {
    if (socket.current != null) {
      socket.current.emit('sendDirectMessage', { message, userId })
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

  function formatDate (timeStamp: string): string {
    const currentTimestamp = new Date()

    if (!timeStamp) {
      const year = currentTimestamp.getFullYear()
      const month = String(currentTimestamp.getMonth() + 1).padStart(2, '0')
      const day = String(currentTimestamp.getDate()).padStart(2, '0')
      const hour = String(currentTimestamp.getHours()).padStart(2, '0')
      const minute = String(currentTimestamp.getMinutes()).padStart(2, '0')

      return `${day}-${month}-${year} ${hour}:${minute}`
    }

    const [date, time] = timeStamp.split('T')
    const [year, month, day] = date.split('-')
    const [hour, minute] = time.split(':')

    return `${day}-${month}-${year} ${hour}:${minute}`
  }

  return (
    <Box className='std-group__container' sx={{ height: '80vh', width: '100%' }}>
      <Box className='std-group__details-section'>
        <Box className='std-group__chat-messages'>
          {groupMessages.map((msg, index) => (
            <Stack key={index} direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar src={msg.picture} alt={`${msg.firstName} ${msg.lastName}`} />
              <Stack direction="column" spacing={0.5}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {msg.firstName} {msg.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(msg.timestamp)}
                  </Typography>
                </Stack>
                <Typography variant="body1">{msg.content}</Typography>
              </Stack>
            </Stack>
          ))}
        </Box>
        <Box className='std-group__chat-input' display="flex" alignItems="center">
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
        </Box>
      </Box>
    </Box>
  )
}

export default PrivateChat
