import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from './Router/routes'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button, CardContent } from '@mui/material'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import * as colors from './color.js'

const drawerWidth = 240

const AppBarStyles = ({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
})

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(AppBarStyles)

const mdTheme = createTheme({
  palette: {
    primary: { main: colors.PRIMARY },
    secondary: { main: colors.SECONDARY }
  },
  text: {
    color: '#000000',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '18px',
    width: '222px'
  }
})

const DashboardStudent = () => {
  const navigate = useNavigate()

  // Styles grouped for readability
  const styles = {
    logo: {
      left: '6%',
      position: 'absolute',
      transform: 'translate(-50%, 0)',
      width: '200px'
    },
    stackContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'space-between',
      justifyContent: 'center',
      height: '100%',
      gap: '100px'
    },
    cardContent: {
      marginTop: '20px',
      marginBottom: '20px',
      marginLeft: '2px'
    },
    button: {
      borderRadius: 20,
      background: colors.PRIMARY,
      fontWeight: 600,
      padding: '5px 30px',
      marginLeft: '55px'
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar style={{ backgroundColor: colors.PRIMARY }} position="absolute">
          <Toolbar sx={{ pr: '24px' }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '36px'
              }}
            />
            <img src={'/assets/LinkerFull.png'} alt="Logo Linker" style={styles.logo} />
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', backgroundColor: '#FFFFFF', height: 'calc(107vh - 64px)' }}>
          {/* Content Left */}
          <Box sx={{ width: '50%', textAlign: 'left' }}>
            <Stack mt={15} style={{ marginLeft: '50px' }} textAlign="left">
              <div style={styles.stackContainer}>
                {/* Main Heading */}
                <Typography variant="h4" sx={{ fontSize: '5rem', fontWeight: 600 }}>
                  <span style={{ color: colors.PRIMARY }}>Linker</span>, la nouvelle plateforme{' '}
                  <span style={{ color: colors.PRIMARY }}>étudiante</span>
                </Typography>

                {/* Subtext */}
                <Typography variant="h6" sx={{ fontSize: '2rem', fontWeight: 600 }}>
                  Linker est la première plateforme de freelance pluridisciplinaire destinée aux étudiants pour la réalisation de missions ponctuelles.
                </Typography>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {/* Company Card */}
                  <Card sx={{ width: 380, marginRight: '100px' }}>
                    <CardContent>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img src={'/assets/logo-1.png'} alt="Logo Company" style={{ width: '48px', height: 'auto', marginRight: '15px' }} />
                        <Typography variant="h5" component="div" sx={{ fontSize: '2rem', fontWeight: 600 }}>
                          Espace <span style={{ color: colors.PRIMARY }}>Entreprise</span>
                        </Typography>
                      </div>
                      <Typography variant="body2" style={styles.cardContent} sx={{ fontSize: '1.15rem' }}>
                        Besoin d&apos;une maine d&apos;oeuvre de qualité ?
                      </Typography>
                      <Button style={styles.button} variant="contained" onClick={() => navigate(ROUTES.COMPANY_LOGIN_PAGE)}>
                        Connexion
                      </Button>
                    </CardContent>
                  </Card>
                  {/* Student Card */}
                  <Card sx={{ width: 380 }}>
                    <CardContent>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img src={'/assets/logo-2.png'} alt="Logo Student" style={{ width: '48px', height: 'auto', marginRight: '15px' }} />
                        <Typography variant="h5" component="div" sx={{ fontSize: '2rem', fontWeight: 600 }}>
                          Espace <span style={{ color: colors.PRIMARY }}>Étudiant</span>
                        </Typography>
                      </div>
                      <Typography variant="body2" style={styles.cardContent} sx={{ fontSize: '1.15rem' }}>
                        À la recherche de votre prochain défi ?
                      </Typography>
                      <Button style={styles.button} variant="contained" onClick={() => navigate(ROUTES.STUDENT_LOGIN_PAGE)}>
                        Connexion
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Stack>
          </Box>

          {/* Content Right */}
          <Box sx={{ backgroundImage: `url(${'/assets/Landing.png'})`, backgroundSize: '100% 100%', width: '50%' }} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default DashboardStudent
