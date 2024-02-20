/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState, type ChangeEvent } from 'react'
import '../../../../CSS/StudentProfileCompetence.scss'
import { useTranslation } from 'react-i18next'
// import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import ProfileApi from '../../../../API/ProfileApi'
import type { StudentProfileInfo, SkillsListInfo } from '../../../../Typage/ProfileType'
import DropZone from '../../../../Component/DropZone'
import ClassicButton from '../../../../Component/ClassicButton'
import SkillCard from './SkillCard'

interface Props {
  data: StudentProfileInfo
  skills: SkillsListInfo
  update: () => void
}

function StudentProfileCompetence (props: Props): JSX.Element {
  const [skillName, setSkillName] = useState<string>()
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [AvatarImage, setAvatarImage] = useState<any>(undefined)
  const handleSkillClose = (): void => {
    setOpen(false)
  }
  const [dataSkill] = useState<string[]>(props.data.skills.Data)
  const [designSkill] = useState<string[]>(props.data.skills['Design & Produit'])
  const [devSkill] = useState<string[]>(props.data.skills.Development)
  const [noCodeSkill] = useState<string[]>(props.data.skills['No-Code'])
  const [marketSkill] = useState<string[]>(props.data.skills['Marketing & Sales'])

  const handleAvatarImage = (event: ChangeEvent<HTMLInputElement>): void => {
    setAvatarImage(event)
  }

  const handleEditMode = (): void => {
    setIsEdit(!isEdit)
  }

  const handleSkillName = (event: ChangeEvent<HTMLInputElement>): void => {
    setSkillName(event.target.value)
  }

  const callApi = async (): Promise<void> => {
    const file = new FormData()
    file.append('file', AvatarImage[0])
    const returnValue = await ProfileApi.uploadFile(
      localStorage.getItem('jwtToken') as string,
      file
    )
    const skills = new FormData()
    skills.append('skills[0][name]', skillName ?? '')
    skills.append('skills[0][logo]', String(returnValue))
    setSkillName('')
  }

  const handleNewSkill = (): void => {
    handleEditMode()
    callApi()
    handleSkillClose()
  }

  const handleDataSkill = (skill: string): void => {
    dataSkill?.push(skill)
  }

  const handleDesignSkill = (skill: string): void => {
    designSkill?.push(skill)
  }

  const handleDevSkill = (skill: string): void => {
    devSkill?.push(skill)
  }

  const handleMarketSkill = (skill: string): void => {
    marketSkill?.push(skill)
  }

  const handleNoCodeSkill = (skill: string): void => {
    noCodeSkill?.push(skill)
  }

  const handleValidSkill = async (): Promise<void> => {
    const skills = {
      skills: {
        Data: dataSkill,
        'Design & Produit': designSkill,
        Development: devSkill,
        'Marketing & Sales': marketSkill,
        'No-code': noCodeSkill
      }
    }
    const response = await ProfileApi.updateProfileSkill(
      localStorage.getItem('jwtToken') as string,
      skills
    )
    if (response !== undefined) {
      handleEditMode()
      props.update()
    }
  }

  const { t } = useTranslation()
  return (
    <div className="std-profile-comp">
      <div className="std-profile-comp__columns">
        <div className="std-profile-comp__title-container">
          <h1 className="std-profile-comp__title">
            {' '}
            {t('student.profile.skills.title')}{' '}
          </h1>
        </div>
        <div className="std-profile-comp__container">
          <div className="std-profile-comp__skill-list">
            <div className="std-profile-comp__skills">
              {props.data.skills.Data.map((item, index) => (
                <SkillCard key={index} data={item} selected />
              ))}
              {props.data.skills['Design & Produit'].map((item, index) => (
                <SkillCard key={index} data={item} selected />
              ))}
              {props.data.skills.Development.map((item, index) => (
                <SkillCard key={index} data={item} selected />
              ))}
              {props.data.skills['Marketing & Sales'].map((item, index) => (
                <SkillCard key={index} data={item} selected />
              ))}
            </div>
            {isEdit
              ? <div className="std-profile-comp__sep">Ajoute une compétence</div>
              : null}
            <div className="std-profile-comp__skills">
              {isEdit
                ? props.skills.skills.Data.map((item, index) => (
                    <SkillCard key={index} data={item} onClick={() => handleDataSkill(item)} />
                ))
                : null}
              {isEdit
                ? props.skills.skills['Design & Produit'].map((item, index) => (
                    <SkillCard key={index} data={item} onClick={() => handleDesignSkill(item)} />
                ))
                : null}
              {isEdit
                ? props.skills.skills.Development.map((item, index) => (
                    <SkillCard key={index} data={item} onClick={() => handleDevSkill(item)} />
                ))
                : null}
              {isEdit
                ? props.skills.skills['Marketing & Sales'].map(
                  (item, index) => <SkillCard key={index} data={item} onClick={() => handleMarketSkill(item)} />
                )
                : null}
              {isEdit
                ? props.skills.skills['No-code'].map((item, index) => (
                    <SkillCard key={index} data={item} onClick={() => handleNoCodeSkill(item)} />
                ))
                : null}
            </div>
            {isEdit
              ? <ClassicButton title='Valider' onClick={handleValidSkill} />
              : null
            }
          </div>
        </div>
      </div>
      {!isEdit
        ? <div onClick={handleEditMode}>
          <img className="std-profile-comp__edit" src="/assets/NewEdit.svg" />
        </div>
        : (
        <div onClick={handleEditMode}>
          <CloseIcon className="std-profile-comp__edit" />
        </div>
          )
        }
      <Modal open={open} onClose={handleSkillClose}>
        <div className="std-profile-comp__modal">
          <div className="std-profile-comp__modal-title">
            Ajoute ta compétence
          </div>
          <div className="std-profile-comp__content">
            <DropZone onObjectChange={handleAvatarImage} />
            {AvatarImage !== undefined
              ? <div className="std-profile-comp__filename">
                <img className="std-profile-comp__img" src="/assets/file.png" />
                <p> {AvatarImage[0].path} </p>
              </div>
              : null
            }
            <div className="std-profile-comp__textfield">
              <TextField
                value={skillName}
                onChange={handleSkillName}
                variant="standard"
                id="standard-required"
                label="Nom de la compétence"
              />
            </div>
            <ClassicButton title="Envoyer" onClick={handleNewSkill} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default StudentProfileCompetence
