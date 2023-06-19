import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
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
}))

const mdTheme = createTheme({
  palette: {
    primary: {
      main: colors.PRIMARY
    },
    secondary: {
      main: colors.SECONDARY
    }
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

function DashboardStudent () {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar style={{ backgroundColor: colors.PRIMARY }} position="absolute">
          <Toolbar
            sx={{
              pr: '24px'
            }}
          >
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
            ></Typography>
            <img
              src={'/assets/LinkerFull.png'}
              alt="Logo Linker"
              style={{
                left: '6%',
                position: 'absolute',
                transform: 'translate(-50%, 0)',
                width: '200px',
                height: 'auto'
              }}
            />
            <Button
              variant="contained"
              target="_blank"
              style={{
                borderRadius: 20,
                background: 'white',
                fontWeight: 600,
                padding: '5px 30px',
                marginRight: '20px',
                color: colors.PRIMARY
              }}
            >
              Connexion
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            height: 'calc(107vh - 64px)'
          }}
        >
          <Box
            sx={{
              width: '50%',
              textAlign: 'left'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <Stack style={{ marginLeft: '50px' }} textAlign="left">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'space-between',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '100px'
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '5rem',
                      fontWeight: 600
                    }}
                  >
                    <span style={{ color: colors.PRIMARY }}>Linker</span>, la
                    nouvelle plateforme{' '}
                    <span style={{ color: colors.PRIMARY }}>étudiante</span>
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '2rem',
                      fontWeight: 600
                    }}
                  >
                    Linker est la première plateforme de freelance
                    pluridisciplinaire destinée aux étudiants pour la
                    réalisation de missions ponctuelles.
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Card
                      sx={{
                        width: 380,
                        marginRight: '100px'
                      }}
                    >
                      <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <img
                            src={'/assets/logo-1.png'}
                            alt="Logo Company"
                            style={{
                              width: '48px',
                              height: 'auto',
                              marginRight: '15px'
                            }}
                          />
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ fontSize: '2rem', fontWeight: 600 }}
                          >
                            Espace{' '}
                            <span style={{ color: colors.PRIMARY }}>
                              Entreprise
                            </span>
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          style={{
                            marginTop: '20px',
                            marginBottom: '20px',
                            marginLeft: '2px'
                          }}
                          sx={{ fontSize: '1.15rem' }}
                        >
                          Besoin d&apos;une maine d&apos;oeuvre de qualité ?
                        </Typography>
                        <Button
                          variant="contained"
                          target="_blank"
                          style={{
                            borderRadius: 20,
                            background: colors.PRIMARY,
                            fontWeight: 600,
                            padding: '5px 30px',
                            marginLeft: '55px'
                          }}
                        >
                          S&apos;inscrire sur Linker
                        </Button>
                      </CardContent>
                    </Card>
                    <Card style={{ display: 'flex' }} sx={{ width: 380 }}>
                      <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <img
                            src={'/assets/logo-2.png'}
                            alt="Logo Company"
                            style={{
                              width: '48px',
                              height: 'auto',
                              marginRight: '15px'
                            }}
                          />
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ fontSize: '2rem', fontWeight: 600 }}
                          >
                            Espace{' '}
                            <span style={{ color: colors.PRIMARY }}>
                              Étudiant
                            </span>
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          style={{
                            marginTop: '20px',
                            marginBottom: '20px',
                            marginLeft: '55px'
                          }}
                          sx={{ fontSize: '1.15rem' }}
                        >
                          À la recherche de missions ?
                        </Typography>
                        <Button
                          variant="contained"
                          target="_blank"
                          style={{
                            borderRadius: 20,
                            background: colors.PRIMARY,
                            fontWeight: 600,
                            padding: '5px 30px',
                            marginLeft: '55px'
                          }}
                        >
                          S&apos;inscrire sur Linker
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: `url(${'/assets/Landing.png'})`,
              backgroundSize: '100% 100%',
              width: '50%'
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default DashboardStudent
