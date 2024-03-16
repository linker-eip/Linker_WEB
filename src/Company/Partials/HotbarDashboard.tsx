import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProfileCompany } from '../../Typage/ProfileType'
import ProfileApi from '../../API/ProfileApi'
import { useTranslation } from 'react-i18next'
import NotificationApi from '../../API/NotificationApi'
import type { Notifications } from '../../Typage/NotificationType'
import NotificationButton from './NotificationButton'

// MUI imports.
import Avatar from '@mui/material/Avatar'
import Menu, { type MenuProps } from '@mui/material/Menu'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'

// Styles and Routes.
import '../../CSS/Hotbar.scss'
import * as ROUTES from '../../Router/routes'

// Custom theme.
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
  //
}))

function HotbarDashboard (props: { children: string | any }): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [profile, setProfile] = useState<ProfileCompany | null>(null)
  const [NotificationsData, setNotificationData] = useState<Notifications[]>()
  const [ids] = useState<string[]>([])
  const [reload, setReload] = useState<boolean>(false)
  const [newNotif, setNewNotif] = useState<number>(0)
  const [notifOpen, setNotifOpen] = useState<boolean>(false)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      const profileData = await ProfileApi.getCompanyProfile(localStorage.getItem('jwtToken') as string)
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

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleProfile = (): any => {
    navigate(ROUTES.COMPANY_PROFILE)
    setAnchorEl(null)
  }

  const handleDisconnect = (): void => {
    navigate(ROUTES.COMPANY_LOGIN_PAGE)
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

  return (
    <div className='hotbar-container'>
      <img src="/assets/logo.svg" alt='logo'/>
      <p className='hotbar-container__title'>{ props.children }</p>
      <NotificationButton title='Notification' isClicked={notifOpen} data={NotificationsData ?? []} onClick={callNotification} onReload={reloadNotif} newNotif={newNotif} />
      <div className='hotbar-container__info'>
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
                { profile !== null ? <p> { profile.name } </p> : 'NOM'}
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
                  { t('student.dashboard.hotbar.profil') }
                </MenuItem>
                <MenuItem onClick={handleDisconnect} disableRipple>
                  <ExitToAppOutlinedIcon />
                  { t('student.dashboard.hotbar.quit') }
                </MenuItem>
        </StyledMenu>
      </div>
    </div>
    // <div className='hotbar-container'>
    //   <img src="/assets/logo.svg" alt="logo" />
    //   <p className='hotbar-container__title'>{children}</p>
    //   <div className='hotbar-container__info'>
    //     <Avatar alt="avatar" src='/assets/anonymLogo.jpg' />
    //     <ThemeProvider theme={theme}>
    //       <Button
    //         id="demo-customized-button"
    //         aria-controls={(anchorEl != null) ? 'demo-customized-menu' : undefined}
    //         aria-haspopup="true"
    //         variant="contained"
    //         disableElevation
    //         onClick={handleClick}
    //         endIcon={<KeyboardArrowDownIcon />}
    //       >
    //         Prénom NOM
    //       </Button>
    //     </ThemeProvider>
    //     <StyledMenu
    //       id="demo-customized-menu"
    //       MenuListProps={{
    //         'aria-labelledby': 'demo-customized-button'
    //       }}
    //       anchorEl={anchorEl}
    //       open={Boolean(anchorEl)}
    //       onClose={handleClose}
    //     >
    //       <MenuItem onClick={handleClose} disableRipple>
    //         <EditIcon />
    //         {t('student.dashboard.hotbar.profil')}
    //       </MenuItem>
    //       <MenuItem onClick={handleClose} disableRipple>
    //         <ExitToAppOutlinedIcon />
    //         {t('student.dashboard.hotbar.quit')}
    //       </MenuItem>
    //     </StyledMenu>
    //   </div>
    // </div>
  )
}

export default HotbarDashboard
