import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

interface HotbarProps {
  children: React.ReactNode
}

const HotbarDashboard: React.FC<HotbarProps> = ({ children }: HotbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    navigate(ROUTES.COMPANY_LOGIN_PAGE)
    setAnchorEl(null)
  }

  return (
    <div className='hotbar-container'>
      <img src="/assets/logo.svg" alt="logo" />
      <p className='hotbar-container__title'>{children}</p>
      <div className='hotbar-container__info'>
        <Avatar alt="avatar" src='/assets/anonymLogo.jpg' />
        <ThemeProvider theme={theme}>
          <Button
            id="demo-customized-button"
            aria-controls={(anchorEl != null) ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Prénom NOM
          </Button>
        </ThemeProvider>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button'
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <EditIcon />
            {t('student.dashboard.hotbar.profil')}
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ExitToAppOutlinedIcon />
            {t('student.dashboard.hotbar.quit')}
          </MenuItem>
        </StyledMenu>
      </div>
    </div>
  )
}

export default HotbarDashboard
