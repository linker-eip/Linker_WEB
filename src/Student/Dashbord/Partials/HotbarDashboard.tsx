/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React, { useState, useEffect } from 'react'
import '../../../CSS/Hotbar.scss'
import Avatar from '@mui/material/Avatar'
import Menu, { type MenuProps } from '@mui/material/Menu'
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles'
import { Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../Router/routes'
import type { StudentProfileInfo } from '../../../Typage/ProfileType'
import ProfileApi from '../../../API/ProfileApi'
import NotificationApi from '../../../API/NotificationApi'
import type { Notifications } from '../../../Typage/NotificationType'
import NotificationButton from './NotificationButton'
import ClassicButton from '../../../Component/ClassicButton'

const theme = createTheme({
  palette: {
    primary: {
      main: '#005275'
    }
  },
  typography: {
    fontSize: 20
  }
})

const StyledMenu = styled((props: MenuProps): JSX.Element => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

interface Props {
  children: string | any
  hideNotif?: boolean
  hideName?: boolean
  homepage?: boolean
}

function HotbarDashboard (props: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [profile, setProfile] = useState<StudentProfileInfo | null>(null)
  const [notifOpen, setNotifOpen] = useState<boolean>(false)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const [NotificationsData, setNotificationData] = useState<Notifications[]>()
  const [ids] = useState<string[]>([])
  const [reload, setReload] = useState<boolean>(false)
  const [newNotif, setNewNotif] = useState<number>(0)

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      const profileData = await ProfileApi.getProfile(localStorage.getItem('jwtToken') as string)
      setProfile(profileData)
      return profileData
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      const response = await NotificationApi.getNotifications(localStorage.getItem('jwtToken') as string)
      let count = 0
      response.forEach(item => {
        if (!item.alreadySeen) {
          count += 1
        }
        return item
      })
      setNewNotif(count)
      setNotificationData(response)
    }
    fetchData()
  }, [reload])

  const handleClick = (event: React.MouseEvent<HTMLElement>): any => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): any => {
    setAnchorEl(null)
  }

  const handleProfile = (): any => {
    navigate(ROUTES.STUDENT_PROFILE)
    setAnchorEl(null)
  }

  const handleDisconnect = (): void => {
    navigate(ROUTES.STUDENT_LOGIN_PAGE)
    localStorage.removeItem('jwtToken')
    setAnchorEl(null)
  }

  const reloadNotif = (): void => {
    setReload(!reload)
  }

  const callNotification = (): void => {
    if (!notifOpen) {
      NotificationsData?.map(item => ids.push(item.id.toString()))
      const dto = {
        ids
      }
      NotificationApi.changeNotificationStatus(localStorage.getItem('jwtToken') as string, dto)
      reloadNotif()
    }
    setNotifOpen(!notifOpen)
  }

  const redirectToDashboard = (): void => {
    if (window.location.href.includes('/student/')) {
      navigate(ROUTES.STUDENT_DASHBOARD)
    }
  }

  const scrollToAncre = (): void => {
    window.location.hash = '#register'
  }

  const { t } = useTranslation()
  return (
    <div className={props.homepage ?? false ? 'hotbar-container-2' : 'hotbar-container'} >
      <img className='hotbar-container__logo' src="/assets/LinkerFull.png" alt='logo' onClick={redirectToDashboard} />
      <p className='hotbar-container__title'>{props.children}</p>
      { props.homepage
        ? <div> <ClassicButton title={ t('homepage.register') } onClick={scrollToAncre} /> </div>
        : null
      }
      { props.hideNotif ?? false
        ? null
        : <NotificationButton title='Notification' isClicked={notifOpen} data={NotificationsData ?? []} onClick={callNotification} onReload={reloadNotif} newNotif={newNotif} />
      }
      {props.hideName ?? false
        ? null
        : <div className='hotbar-container__info'>
            <Avatar alt='avatar' src={profile?.picture} />
            <ThemeProvider theme={theme}>
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {profile !== null ? <p> {profile.firstName} {profile.lastName}</p> : 'Prenom NOM'}
              </Button>
            </ThemeProvider>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile} disableRipple>
                <EditIcon />
                {t('student.dashboard.hotbar.profil')}
              </MenuItem>
              <MenuItem onClick={handleDisconnect} disableRipple>
                <ExitToAppOutlinedIcon />
                {t('student.dashboard.hotbar.quit')}
              </MenuItem>
            </StyledMenu>
          </div>
      }
    </div>
  )
}

export default HotbarDashboard
