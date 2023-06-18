import React from 'react'
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

function HotbarDashboard (props: { children: string | any }): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>): any => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): any => {
    navigate(ROUTES.STUDENT_LOGIN_PAGE)
    setAnchorEl(null)
  }

  const { t } = useTranslation()
  return (
        <div className='hotbar-container'>
          <img src="/assets/logo.svg" alt='logo'/>
          <p className='hotbar-container__title'>{ props.children }</p>
          <div className='hotbar-container__info'>
            <Avatar alt='avatar' src='/assets/anonymLogo.jpg'></Avatar>
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
                    Prénom NOM
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
                <MenuItem onClick={handleClose} disableRipple>
                      <EditIcon />
                      { t('student.dashboard.hotbar.profil') }
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      <ExitToAppOutlinedIcon />
                      { t('student.dashboard.hotbar.quit') }
                    </MenuItem>
            </StyledMenu>
          </div>
        </div>
  )
}

export default HotbarDashboard
