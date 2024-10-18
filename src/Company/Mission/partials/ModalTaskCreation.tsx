/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent, useState, useEffect } from 'react'
import '../../../CSS/ModalTaskCreation.scss'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import { FormControl, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from '@mui/material'
import ClassicButton from '../../../Component/ClassicButton'
import MissionApi from '../../../API/MissionApi'
import { type Members } from '../../../Typage/Type'

const tasks = [
  {
    name: 'Concevoir la mise en page de la page d\'accueil',
    description: 'Créer une mise en page réactive pour la page d\'accueil, incluant l\'en-tête, le pied de page et les sections principales de contenu.',
    price: 200
  },
  {
    name: 'Développer le formulaire de contact',
    description: 'Implémenter un formulaire de contact avec validation et intégration email.',
    price: 150
  },
  {
    name: 'Créer la page "À propos de nous"',
    description: 'Rédiger et concevoir la page "À propos de nous" avec les informations de l\'entreprise et les biographies de l\'équipe.',
    price: 100
  },
  {
    name: 'Optimiser les images',
    description: 'Compresser et optimiser les images pour des temps de chargement plus rapides sans sacrifier la qualité.',
    price: 80
  },
  {
    name: 'Optimisation SEO',
    description: 'Mettre en place les pratiques SEO de base, y compris les méta-tags, les mots-clés et le plan du site.',
    price: 120
  },
  {
    name: 'Tester le site sur plusieurs appareils',
    description: 'Assurer le bon fonctionnement du site sur différents navigateurs et appareils.',
    price: 90
  },
  {
    name: 'Configurer Google Analytics',
    description: 'Intégrer Google Analytics pour suivre le trafic du site et le comportement des utilisateurs.',
    price: 70
  },
  {
    name: 'Rédiger la politique de confidentialité',
    description: 'Élaborer une page de politique de confidentialité conforme aux réglementations.',
    price: 60
  },
  {
    name: 'Déployer le site web',
    description: 'Déployer le site sur un serveur d\'hébergement et configurer les paramètres du domaine.',
    price: 150
  },
  {
    name: 'Créer une favicon',
    description: 'Concevoir et implémenter une favicon pour le site web.',
    price: 30
  }
]

interface Props {
  open: boolean
  missionId: number
  members?: Members[]
  isStudent?: boolean
  onClose: () => void
  onValidation: () => void
}

function ModalTaskCreation (props: Props): JSX.Element {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>(0)
  const maxLengthDesc = 300
  const maxLengthName = 100

  const [errorName, setErrorName] = useState(false)
  const [errorDesc, setErrorDesc] = useState(false)
  const [errorPrice, setErrorPrice] = useState(false)

  const [student, setStudent] = useState('')
  const [lastTaskIndex, setLastTaskIndex] = useState<number | null>(null)

  const handleChange = (event: SelectChangeEvent): void => {
    setStudent(event.target.value)
  }

  useEffect(() => {
    if (props.open) {
      // La modal a été ouverte
      // Sélectionne une tâche aléatoire différente de la précédente
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * tasks.length)
      } while (randomIndex === lastTaskIndex && tasks.length > 1)

      const task = tasks[randomIndex]
      setName(task.name)
      setDescription(task.description)
      setPrice(task.price)
      setLastTaskIndex(randomIndex)

      // Réinitialise les états d'erreur
      setErrorName(false)
      setErrorDesc(false)
      setErrorPrice(false)

      // Réinitialise la sélection de l'étudiant
      setStudent('')
    }
  }, [props.open])

  const checkError = (): void => {
    setErrorName(name.length === 0)
    setErrorDesc(description.length === 0)
    setErrorPrice(price <= 0)
  }

  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    const newName = event.target.value
    setName(newName)
    setErrorName(newName.length === 0)
  }

  const handleDesc = (event: ChangeEvent<HTMLInputElement>): void => {
    const newDesc = event.target.value
    setDescription(newDesc)
    setErrorDesc(newDesc.length === 0)
  }

  const handlePrice = (event: ChangeEvent<HTMLInputElement>): void => {
    const parsedNumber = parseFloat(event.target.value)
    const newPrice = isNaN(parsedNumber) ? 0 : parsedNumber
    setPrice(newPrice)
    setErrorPrice(newPrice <= 0)
  }

  const handleValidation = async (): Promise<void> => {
    checkError()

    if (name.length > 0 && description.length > 0 && price > 0) {
      const data = {
        name,
        description,
        amount: price,
        studentId: student === null ? -1 : parseInt(student),
        skills: ''
      }
      if (props.isStudent !== null && props.isStudent !== undefined && props.isStudent) {
        await MissionApi.createTaskAsStudent(localStorage.getItem('jwtToken') as string, props.missionId, data)
      } else {
        await MissionApi.createTask(localStorage.getItem('jwtToken') as string, props.missionId, data)
      }
      setName('')
      setDescription('')
      setPrice(0)
      props.onValidation()
    }
  }

  return (
    <Modal open={props.open} onClose={props.onClose} >
        <div className='cpn-modal-task'>
            <div className='cpn-modal-task__title'>
                { t('company.detailed_mission.task.modal_title')}
            </div>
            <div className='cpn-modal-task__section'>
              <TextField
                value={name}
                onChange={handleName}
                variant='outlined'
                id="standard-required"
                label={t('company.detailed_mission.task.name')}
                inputProps={{ maxLength: maxLengthName }}
                error={errorName}
                helperText={errorName ? 'Veuillez entrer un nom pour votre tâche.' : false}
              />
              <TextField
                value={description}
                onChange={handleDesc}
                variant='outlined'
                id="outlined-multiline-static fullWidth"
                label={t('company.detailed_mission.task.description')}
                inputProps={{ maxLength: maxLengthDesc }}
                maxRows={4}
                fullWidth
                multiline
                error={errorDesc}
                helperText={errorDesc ? 'Veuillez entrer une description pour votre tâche.' : false}
              />
              <TextField
                value={price}
                onChange={handlePrice}
                variant='outlined'
                id="outlined-number"
                label={t('company.detailed_mission.task.price')}
                type='number'
                inputProps={{ maxLengthDesc }}
                InputLabelProps={{
                  shrink: true
                }}
                error={errorPrice}
                helperText={errorPrice ? 'Veuillez entrer un prix pour votre tâche.' : false}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Attribution</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={student}
                  label="Attribution"
                  onChange={handleChange}
                  >
                    { props.members !== undefined
                      ? props.members.map((member, index) => (
                          <MenuItem key={index} value={member.id}> {member.firstName} {member.lastName} </MenuItem>
                      ))
                      : null
                    }
                  <MenuItem value={'-1'}> Aucun </MenuItem>
                </Select>
              </FormControl>
              <div className='cpn-modal-task__button-section'>
                <ClassicButton title='Annuler' cancelled onClick={props.onClose}/>
                <ClassicButton title='Valider' onClick={handleValidation} />
              </div>
            </div>
        </div>
    </Modal>
  )
}

export default ModalTaskCreation
