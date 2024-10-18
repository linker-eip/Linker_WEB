import React, { useState, useEffect } from 'react'
import '../../../../CSS/CompanyMissionPotential.scss'
import { useTranslation } from 'react-i18next'
import MissionCardPotential from './MissionCardPotential'
import ClassicButton from '../../../../Component/ClassicButton'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface MissionPotentialItems {
  id: number
  name: string
  status: string
  description: string
  companyId: number
  startOfMission: Date
  endOfMission: Date
  amount: number
  skills: string
}

interface NewMissionData {
  name: string
  description: string
  amount: number
  startOfMission: Date
  endOfMission: Date
  skills: string
}

function CompanyMissionsPotential (): JSX.Element {
  const { t } = useTranslation()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL as string}/api/mission`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async response => await response.json())
      .then(data => {
        const pendingMissions = data.filter((item: any) => item.status === 'PENDING').map((item: any) => ({
          id: item.id,
          name: item.name,
          status: item.status,
          description: item.description,
          companyId: item.companyId,
          startOfMission: item.startOfMission,
          endOfMission: item.endOfMission,
          amount: item.amount,
          skills: item.skills
        }))
        setData(pendingMissions)
      })
      .catch(error => {
        alert(`Erreur lors de la récupération des données: ${String(error)}`)
      })
  }, [])

  const [data, setData] = useState<MissionPotentialItems[]>([])

  const [openCreate, setOpenCreate] = useState(false)

  const [newMissionData, setNewMissionData] = useState<NewMissionData>({
    name: 'Site vitrine',
    description: 'Site vitrine pour une entreprise de vente de produits bio',
    amount: 1800,
    startOfMission: new Date(),
    endOfMission: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    skills: 'React'
  })

  const handleCreate = (): void => {
    const payload = {
      name: newMissionData.name,
      description: newMissionData.description,
      startOfMission: newMissionData.startOfMission,
      endOfMission: newMissionData.endOfMission,
      amount: newMissionData.amount,
      skills: newMissionData.skills
    }

    fetch(`${process.env.REACT_APP_API_URL as string}/api/mission`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken') as string}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setOpenCreate(false)
        window.location.reload()
      })
      .catch((error) => {
        alert(`Erreur lors de la création de la mission: ${String(error)}`)
      })
  }

  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = data.filter(mission =>
    mission.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [fieldValidity, setFieldValidity] = useState({
    nameValid: true,
    descriptionValid: true,
    amountValid: true,
    startOfMissionValid: true,
    endOfMissionValid: true,
    skillsValid: true
  })

  useEffect(() => {
    const isValid = {
      nameValid: newMissionData.name.trim() !== '',
      descriptionValid: newMissionData.description.trim() !== '',
      amountValid: newMissionData.amount > 0,
      startOfMissionValid: newMissionData.startOfMission instanceof Date && !isNaN(newMissionData.startOfMission.getTime()),
      endOfMissionValid: newMissionData.endOfMission instanceof Date && !isNaN(newMissionData.endOfMission.getTime()) && newMissionData.endOfMission >= newMissionData.startOfMission,
      skillsValid: newMissionData.skills.trim() !== ''
    }

    setFieldValidity(isValid)
  }, [newMissionData])

  const isFormValid = (): boolean => {
    return Object.values(fieldValidity).every(value => value)
  }

  return (
    <div className='company-mission-potential'>
      <div className='company-mission-potential__mission-create'>
          <p className='company-mission-potential__mission-status'>
            { t('company.mission.potential.potential_mission', { nbrMission: data.length }) }
          </p>
        <ClassicButton title='Créer une mission' onClick={() => { setOpenCreate(true) }} />
      </div>
      { data.length !== 0 &&
        <TextField
          fullWidth
          id="search-bar"
          type="search"
          variant="outlined"
          placeholder="Recherche par titre de la mission"
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
            width: '50%',
            margin: '20px 0',
            marginTop: 1,
            marginBottom: 1,
            borderRadius: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px'
            }
          }}
        />
      }
      { data.length === 0 && filteredData.length === 0
        ? <p className='company-mission-potential__no-mission'>
            { t('company.mission.potential.no_mission') }
          </p>
        : filteredData.map((item, index) => (
          <MissionCardPotential data={item} key={index} potential />
        ))
      }
      {/* MODALE POUR CREER */}
      <Dialog open={openCreate} onClose={() => { setOpenCreate(false) }}>
        <DialogTitle sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>Créer une nouvelle mission</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Titre"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            onChange={(e) => {
              setNewMissionData({ ...newMissionData, name: e.target.value })
              setFieldValidity({ ...fieldValidity, nameValid: true })
            }}
            value={newMissionData.name}
            error={!fieldValidity.nameValid}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            onChange={(e) => {
              setNewMissionData({ ...newMissionData, description: e.target.value })
              setFieldValidity({ ...fieldValidity, descriptionValid: true })
            }}
            value={newMissionData.description}
            error={!fieldValidity.descriptionValid}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Prix"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            onChange={(e) => {
              const parsedAmount = parseInt(e.target.value, 10)
              setNewMissionData({
                ...newMissionData,
                amount: isNaN(parsedAmount) ? 0 : parsedAmount
              })
              setFieldValidity({
                ...fieldValidity,
                amountValid: !isNaN(parsedAmount) && parsedAmount > 0
              })
            }}
            value={newMissionData.amount}
            error={!fieldValidity.amountValid}
          />
          <TextField
            type="date"
            fullWidth
            margin="dense"
            label="Date de début"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              setNewMissionData({ ...newMissionData, startOfMission: new Date(e.target.value) })
              setFieldValidity({ ...fieldValidity, startOfMissionValid: true })
            }}
            value={newMissionData.startOfMission.toISOString().split('T')[0]}
            error={!fieldValidity.startOfMissionValid}
            sx={{ marginTop: '16px' }}
          />
          <TextField
            type="date"
            fullWidth
            margin="dense"
            label="Date de fin"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              setNewMissionData({ ...newMissionData, endOfMission: new Date(e.target.value) })
              setFieldValidity({ ...fieldValidity, endOfMissionValid: true })
            }}
            value={newMissionData.endOfMission.toISOString().split('T')[0]}
            error={!fieldValidity.endOfMissionValid}
            sx={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Compétences associées"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            onChange={(e) => {
              setNewMissionData({ ...newMissionData, skills: e.target.value })
              setFieldValidity({ ...fieldValidity, skillsValid: true })
            }}
            value={newMissionData.skills}
            error={!fieldValidity.skillsValid}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => { setOpenCreate(false) }}
            color="primary"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              if (isFormValid()) {
                handleCreate()
                setOpenCreate(false)
              }
            }}
            color="primary"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            disabled={!isFormValid()}
          >
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CompanyMissionsPotential
