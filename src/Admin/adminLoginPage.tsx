import React, { useState } from 'react'
import '../CSS/BaseButton.scss'
import * as ROUTES from '../Router/routes'
import { useNavigate } from 'react-router-dom'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'

function AdminLoginPage (): JSX.Element {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email') as string
    const password = data.get('password') as string

    const payload = {
      email,
      password
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error('Erreur lors de la connexion admin')

      const responseData = await response.json()
      const jwtToken = responseData.token
      localStorage.setItem('jwtToken', jwtToken)
      navigate(ROUTES.ADMIN_DASHBOARD)
    } catch (error) {
      alert(`Erreur lors de la connexion admin: ${String(error)}`)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    handleCreate(event)
  }

  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }
  const handleClickForgotPassword = (): void => { console.log('forgot password') }

  return (
    <Stack
      height="100vh"
      sx={{ background: 'radial-gradient(circle, #2B6491 0%, #0B1421 100%)' }}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        component="form"
        onSubmit={handleSubmit}
        width="48.54vw"
        alignItems="center"
        borderRadius="20px"
        pt="8.33vh"
        pb="10.36vh"
        px="10.58vw"
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <img src="/assets/logo.svg" alt='logo'/>
        <Stack
          width="100%"
          mt="1vh"
        >
          <Typography variant="body1" color="white">Adresse E-mail</Typography>
          <TextField
            name="email"
            variant="filled"
            placeholder="Adresse E-mail"
            size="small"
            sx={{
              '& .MuiInputBase-input': { color: '#FFFFFF' },
              '& .MuiFormLabel-root.Mui-focused': { color: '#FFFFFF' },
              '& .MuiInputLabel-filled.MuiInputLabel-shrink': { color: '#FFFFFF' },
              '& .MuiInputLabel-filled': { color: 'rgba(255, 255, 255, 0.6)' }
            }}
          />
        </Stack>
        <Stack width="100%" mt="3.65vh">
          <Typography variant="body1" color="white">Mot de passe</Typography>
          <TextField
            name="password"
            variant="filled"
            placeholder="Mot de passe"
            size="small"
            sx={{
              '& .MuiInputBase-input': { color: '#FFFFFF' },
              '& .MuiFormLabel-root.Mui-focused': { color: '#FFFFFF' },
              '& .MuiInputLabel-filled.MuiInputLabel-shrink': { color: '#FFFFFF' },
              '& .MuiInputLabel-filled': { color: 'rgba(255, 255, 255, 0.6)' }
            }}
            type={showPassword ? 'text' : 'password'} InputProps={{ disableUnderline: true, hiddenLabel: true, endAdornment: (<IconButton sx={{ color: '#FFFFFF' }} size="small" onClick={handleClickShowPassword}>{showPassword ? <VisibilityOutlined fontSize="small" /> : <VisibilityOffOutlined fontSize="small" />}</IconButton>) }}
          />
          <Typography
            fontWeight="700"
            fontSize="15px"
            color="white"
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            mt="1.68vh"
            onClick={handleClickForgotPassword}
            alignSelf="end">
              Mot de passe oublié?
          </Typography>
        </Stack>
        <Stack mt="6.8vh" width="17.72vw" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: '25px' }}
            className="base-button">
              Se connecter
            </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AdminLoginPage
