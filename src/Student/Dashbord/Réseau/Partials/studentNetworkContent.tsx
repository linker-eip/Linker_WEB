import React, { useState } from 'react'

import '../../../../CSS/Hotbar.scss'

import SearchIcon from '@mui/icons-material/Search'
import HandymanIcon from '@mui/icons-material/Handyman'
import StarRateIcon from '@mui/icons-material/StarRate'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

import ClassicButton from '../../../../Component/ClassicButton'

import { TextField, InputAdornment, Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

function StudentNetworkContent (): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    skills: '',
    tjmMin: '',
    tjmMax: '',
    noteMin: '',
    noteMax: '',
    isActive: false,
    hasGroup: false
  })

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked
    })
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
            placeholder="Rechercher un étudiant"
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
              placeholder="Localisation"
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
              placeholder="Compétences"
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
              placeholder="TJM Minimum"
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
              placeholder="TJM Maximum"
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
              placeholder="Note Minimale"
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
              placeholder="Note Maximale"
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
          <Grid item xs={6} md={3}>
            <FormGroup
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.isActive}
                    onChange={handleCheckboxChange}
                    name="isActive"
                    color="primary"
                  />
                }
                label="Actif?"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormGroup
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.hasGroup}
                    onChange={handleCheckboxChange}
                    name="hasGroup"
                    color="primary"
                  />
                }
                label="En groupe?"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6} md={3} mt={2} mb={1}>
            <ClassicButton title="Rechercher" />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default StudentNetworkContent
