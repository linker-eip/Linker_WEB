import React, { useState, useEffect } from 'react'
import '../../../../CSS/CompanyMissionPotential.scss'
import { useTranslation } from 'react-i18next'
import PendingMissionCard from './PendingMissionCard'
import ClassicButton from '../../../../Component/ClassicButton'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material'

interface PendingMissionItems {
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
    fetch('https://dev.linker-app.fr/api/mission', {
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

  const [data, setData] = useState<PendingMissionItems[]>([])

  const [openCreate, setOpenCreate] = useState(false)

  const [newMissionData, setNewMissionData] = useState<NewMissionData>({
    name: '',
    description: '',
    amount: 0,
    startOfMission: new Date(),
    endOfMission: new Date(),
    skills: ''
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

    fetch('https://dev.linker-app.fr/api/mission', {
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

  const isFormValid = (): boolean => {
    const textFieldsFilled = newMissionData.name.trim() !== '' &&
      newMissionData.description.trim() !== '' &&
      newMissionData.skills.trim() !== ''

    const amountValid = newMissionData.amount > 0

    const datesValid = newMissionData.startOfMission instanceof Date &&
      newMissionData.endOfMission instanceof Date &&
      !isNaN(newMissionData.startOfMission.getTime()) &&
      !isNaN(newMissionData.endOfMission.getTime()) &&
      newMissionData.endOfMission >= newMissionData.startOfMission

    return textFieldsFilled && amountValid && datesValid
  }

  return (
    <div className='company-mission-potential'>
      <div className='company-mission-potential__mission-create'>
          <p className='company-mission-potential__mission-status'>
            { t('company.mission.potential.potential_mission', { nbrMission: data.length }) }
          </p>
        <ClassicButton title='Créer une mission' onClick={() => { setOpenCreate(true) }} />
      </div>
      { data.length === 0
        ? <p className='company-mission-potential__no-mission'>
            { t('company.mission.potential.no_mission') }
          </p>
        : data.map((item, index) => (
          <PendingMissionCard data={item} key={index} potential />
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
            onChange={(e) => { setNewMissionData({ ...newMissionData, name: e.target.value }) }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            onChange={(e) => { setNewMissionData({ ...newMissionData, description: e.target.value }) }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Prix"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            onChange={(e) => { setNewMissionData({ ...newMissionData, amount: parseInt(e.target.value) }) }}
          />
          <TextField
            type="date"
            fullWidth
            margin="dense"
            label="Date de début"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => { setNewMissionData({ ...newMissionData, startOfMission: new Date(e.target.value) }) }}
            sx={{ marginTop: '16px' }}
          />
          <TextField
            type="date"
            fullWidth
            margin="dense"
            label="Date de fin"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => { setNewMissionData({ ...newMissionData, endOfMission: new Date(e.target.value) }) }}
            sx={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Compétences associées"
            sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
            onChange={(e) => { setNewMissionData({ ...newMissionData, skills: e.target.value }) }}
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
