/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../Router/routes'

import '../../../../CSS/Hotbar.scss'

import SearchIcon from '@mui/icons-material/Search'
import HandymanIcon from '@mui/icons-material/Handyman'
import StarRateIcon from '@mui/icons-material/StarRate'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import EuroIcon from '@mui/icons-material/Euro'
import DescriptionIcon from '@mui/icons-material/Description'

import ClassicButton from '../../../../Component/ClassicButton'

import {
  TextField, InputAdornment, Grid, Card, CardContent, CardMedia,
  Typography, Box, CircularProgress
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface NestedSkills {
  Development: string[]
  NoCode: string[]
  DesignProduct: string[]
  Data: string[]
  MarketingSales: string[]
}

interface Skills {
  skills: NestedSkills
}

interface FiltersResultDto {
  id: string
  firstName: string
  lastName: string
  picture: string | null
  description: string
  location: string
  skills: Skills
  note: number | null
  tjm: number
  isActive: boolean
  hasGroup: boolean
}

interface FiltersSearchDto {
  location: string
  skills: string
  tjmMin: string
  tjmMax: string
  noteMin: string
  noteMax: string
}

function StudentNetworkContent (): JSX.Element {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<FiltersResultDto[]>([])
  const [filters, setFilters] = useState<FiltersSearchDto>({
    location: '',
    skills: '',
    tjmMin: '',
    tjmMax: '',
    noteMin: '',
    noteMax: ''
  })
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = async (): Promise<void> => {
    setSearchPerformed(true)

    const params = {
      searchString: searchTerm,
      location: filters.location,
      skills: filters.skills,
      tjmMin: filters.tjmMin,
      tjmMax: filters.tjmMax,
      noteMin: filters.noteMin,
      noteMax: filters.noteMax
    }

    const queryString = new URLSearchParams(params as any).toString()

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL as string}/api/student/searchNetwork?${queryString}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  const handleClick = (userId: string): void => {
    if (userId !== null && userId !== undefined && userId !== '') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      navigate(`${ROUTES.STUDENT_PRIVATE_MESSAGE.replace(':userId', userId)}`)
    } else {
      console.error('Student ID is undefined or invalid')
    }
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <div>
          <TextField
            fullWidth
            id="search-bar"
            type="search"
            variant="outlined"
            placeholder={t('network.find') ?? ''}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{
              width: '100%',
              margin: '20px 0',
              marginTop: 1,
              marginBottom: 1,
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px'
              }
            }}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              type="search"
              name="location"
              variant="outlined"
              placeholder={t('network.loc') ?? ''}
              value={filters.location}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoomOutlinedIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                margin: '20px 0',
                marginTop: 1,
                marginBottom: 1,
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              type="search"
              name="skills"
              variant="outlined"
              placeholder={t('network.skills') ?? ''}
              value={filters.skills}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HandymanIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                margin: '20px 0',
                marginTop: 1,
                marginBottom: 1,
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              type="number"
              name="tjmMin"
              variant="outlined"
              placeholder={t('network.tjm_min') ?? ''}
              value={filters.tjmMin}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TrendingDownIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                margin: '20px 0',
                marginTop: 1,
                marginBottom: 1,
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              type="number"
              name="tjmMax"
              variant="outlined"
              placeholder={t('network.tjm_max') ?? ''}
              value={filters.tjmMax}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TrendingUpIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                margin: '20px 0',
                marginTop: 1,
                marginBottom: 1,
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              type="number"
              name="noteMin"
              variant="outlined"
              placeholder={t('network.grade_min') ?? ''}
              value={filters.noteMin}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarBorderIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                margin: '20px 0',
                marginTop: 1,
                marginBottom: 1,
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              type="number"
              name="noteMax"
              variant="outlined"
              placeholder={t('network.grade_max') ?? ''}
              value={filters.noteMax}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarRateIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                margin: '20px 0',
                marginTop: 1,
                marginBottom: 1,
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px'
                }
              }}
            />
          </Grid>
          <Grid item xs={6} mt={2} mb={1} display="flex" justifyContent="flex-end">
            <ClassicButton title={t('network.search')} onClick={() => { handleSearch() }} />
          </Grid>
        </Grid>

        <Grid container spacing={4} mt={2}>
          {searchPerformed && searchResults.length === 0 ? (
            <Grid item xs={12}>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100%'>
                <CircularProgress size={30} />
              </Box>
            </Grid>
          ) : (
            searchResults.map((result) => (
              <Grid item xs={12} sm={6} md={4} key={result.id}>
                <Card sx={{ borderRadius: '20px' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={result.picture ?? '/assets/no-profile-picture.jpg'}
                    alt={`${result.firstName} ${result.lastName}`}
                  />
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {result.firstName} {result.lastName}
                      </Typography>
                      <ClassicButton
                        title={`Contacter ${result.firstName}`}
                        onClick={() => { handleClick(result.id) }}
                      />
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <DescriptionIcon fontSize="small" sx={{ marginRight: '8px' }} />
                      <Typography variant="body2" color="text.secondary">
                        {result.description ? result.description : 'Description indisponible'}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOnIcon fontSize="small" sx={{ marginRight: '8px' }} />
                      <Typography variant="body2" color="text.secondary">
                        {result.location ? result.location : 'Localisation indisponible'}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <StarIcon fontSize="small" sx={{ marginRight: '8px' }} />
                      <Typography variant="body2" color="text.secondary">
                        Note: {result.note ?? 'N/A'}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <EuroIcon fontSize="small" sx={{ marginRight: '8px' }} />
                      <Typography variant="body2" color="text.secondary">
                        Taux Journalier Moyen: {result.tjm}€
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <HandymanIcon fontSize="small" sx={{ marginRight: '8px' }} />
                      <Typography variant="body2" color="text.secondary">
                        {result.skills.skills.Development.length > 0 ? (
                          <div key="Development">
                            {result.skills.skills.Development.join(', ')}
                          </div>
                        ) : (
                          "Aucune compétences"
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  )
}

export default StudentNetworkContent
