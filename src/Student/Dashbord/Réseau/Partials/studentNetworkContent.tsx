import React, { useState } from 'react'

import '../../../../CSS/Hotbar.scss'

import SearchIcon from '@mui/icons-material/Search'

import { TextField, InputAdornment } from '@mui/material'

function StudentNetworkContent (): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')

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
      </div>
    </div>
  )
}

export default StudentNetworkContent
