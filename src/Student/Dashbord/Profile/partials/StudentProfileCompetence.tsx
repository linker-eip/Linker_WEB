/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import '../../../../CSS/StudentProfileCompetence.scss'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import ProfileApi from '../../../../API/ProfileApi'
import type { StudentProfileInfo, SkillsListInfo } from '../../../../Typage/ProfileType'
import ClassicButton from '../../../../Component/ClassicButton'
import SkillCard from './SkillCard'

interface Props {
  data: StudentProfileInfo
  skills: SkillsListInfo
  update: () => void
}

function StudentProfileCompetence (props: Props): JSX.Element {
  const [isEdit, setIsEdit] = useState(false)
  const [dataSkill, setData] = useState<string[]>([...props.data.skills.Data])
  const [designSkill, setDesign] = useState<string[]>([...props.data.skills['Design & Produit']])
  const [devSkill, setDev] = useState<string[]>([...props.data.skills.Development])
  const [noCodeSkill, setNoCode] = useState<string[]>([...props.data.skills['No-code']])
  const [marketSkill, setMarket] = useState<string[]>([...props.data.skills['Marketing & Sales']])

  const [tmpDataSkill, setTmpData] = useState<string[]>([...props.skills.skills.Data.filter(item => !props.data.skills.Data.includes(item))])
  const [tmpDesignSkill, setTmpDesign] = useState<string[]>([...props.skills.skills['Design & Produit'].filter(item => !props.data.skills['Design & Produit'].includes(item))])
  const [tmpDevSkill, setTmpDev] = useState<string[]>([...props.skills.skills.Development.filter(item => !props.data.skills.Development.includes(item))])
  const [tmpNoCodeSkill, setTmpNoCode] = useState<string[]>([...props.skills.skills['No-code'].filter(item => !props.data.skills['No-code'].includes(item))])
  const [tmpMarketSkill, setTmpMarket] = useState<string[]>([...props.skills.skills['Marketing & Sales'].filter(item => !props.data.skills['Marketing & Sales'].includes(item))])

  const handleRemoveTmpDataItem = (item: string): void => {
    setTmpData(tmpDataSkill.filter(elements => elements !== item))
  }

  const handleRemoveTmpDesignItem = (item: string): void => {
    setTmpDesign(tmpDesignSkill.filter(elements => elements !== item))
  }

  const handleRemoveTmpDevItem = (item: string): void => {
    setTmpDev(tmpDevSkill.filter(elements => elements !== item))
  }

  const handleRemoveTmpNoCodeItem = (item: string): void => {
    setTmpNoCode(tmpNoCodeSkill.filter(elements => elements !== item))
  }

  const handleRemoveTmpMarketItem = (item: string): void => {
    setTmpMarket(tmpMarketSkill.filter(elements => elements !== item))
  }

  const handleCloseEditMode = (): void => {
    setIsEdit(false)
  }

  const handleEditMode = (): void => {
    if (isEdit) {
      setTmpData([...props.skills.skills.Data.filter(item => !props.data.skills.Data.includes(item))])
      setTmpDesign([...props.skills.skills['Design & Produit'].filter(item => !props.data.skills['Design & Produit'].includes(item))])
      setTmpDev([...props.skills.skills.Development.filter(item => !props.data.skills.Development.includes(item))])
      setTmpNoCode([...props.skills.skills['No-code'].filter(item => !props.data.skills['No-code'].includes(item))])
      setTmpMarket([...props.skills.skills['Marketing & Sales'].filter(item => !props.data.skills['Marketing & Sales'].includes(item))])
      setData([...props.data.skills.Data])
      setDev([...props.data.skills.Development])
      setDesign([...props.data.skills['Design & Produit']])
      setMarket([...props.data.skills['Marketing & Sales']])
      setNoCode([...props.data.skills['No-code']])
    }
    setIsEdit(!isEdit)
  }

  const handleDataSkill = (skill: string): void => {
    dataSkill?.push(skill)
    handleRemoveTmpDataItem(skill)
  }

  const handleDesignSkill = (skill: string): void => {
    designSkill?.push(skill)
    handleRemoveTmpDesignItem(skill)
  }

  const handleDevSkill = (skill: string): void => {
    devSkill?.push(skill)
    handleRemoveTmpDevItem(skill)
  }

  const handleMarketSkill = (skill: string): void => {
    marketSkill?.push(skill)

    handleRemoveTmpMarketItem(skill)
  }

  const handleNoCodeSkill = (skill: string): void => {
    noCodeSkill?.push(skill)
    handleRemoveTmpNoCodeItem(skill)
  }

  const handleRemoveDataSkill = (skill: string): void => {
    if (dataSkill.length === 1) {
      dataSkill.pop()
    }
    setData(dataSkill.filter(item => item !== skill))
  }

  const handleRemoveDesignSkill = (skill: string): void => {
    if (designSkill.length === 1) {
      designSkill.pop()
    }
    setDesign(designSkill.filter(item => item !== skill))
  }

  const handleRemoveDevSkill = (skill: string): void => {
    if (devSkill.length === 1) {
      devSkill.pop()
    } else {
      setDev(devSkill.filter(item => item !== skill))
    }
  }

  const handleRemoveMarketSkill = (skill: string): void => {
    if (marketSkill.length === 1) {
      marketSkill.pop()
    }
    setMarket(marketSkill.filter(item => item !== skill))
  }

  const handleRemoveNoCodeSkill = (skill: string): void => {
    if (noCodeSkill.length === 1) {
      console.log(noCodeSkill, noCodeSkill.length)
      noCodeSkill.pop()
    } else {
      setNoCode(noCodeSkill.filter(item => item !== skill))
    }
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
      handleCloseEditMode()
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
            {isEdit
              ? <div className="std-profile-comp__skills">
                {dataSkill.map((item, index) => (
                  <SkillCard key={index} data={item} removed onClick={() => handleRemoveDataSkill(item)} />
                ))}
                {designSkill.map((item, index) => (
                  <SkillCard key={index} data={item} removed onClick={() => handleRemoveDesignSkill(item)} />
                ))}
                {devSkill.map((item, index) => (
                  <SkillCard key={index} data={item} removed onClick={() => handleRemoveDevSkill(item)}/>
                ))}
                {marketSkill.map((item, index) => (
                  <SkillCard key={index} data={item} removed onClick={() => handleRemoveMarketSkill(item)}/>
                ))}
                {noCodeSkill.map((item, index) => (
                  <SkillCard key={index} data={item} removed onClick={() => handleRemoveNoCodeSkill(item)}/>
                ))}
              </div>
              : <div className="std-profile-comp__skills">
                {dataSkill.map((item, index) => (
                  <SkillCard key={index} data={item} selected />
                ))}
                {designSkill.map((item, index) => (
                  <SkillCard key={index} data={item} selected />
                ))}
                {devSkill.map((item, index) => (
                  <SkillCard key={index} data={item} selected />
                ))}
                {marketSkill.map((item, index) => (
                  <SkillCard key={index} data={item} selected />
                ))}
                {noCodeSkill.map((item, index) => (
                  <SkillCard key={index} data={item} selected />
                ))}
              </div>
            }
            {isEdit
              ? <div className="std-profile-comp__sep">Ajoute une compétence</div>
              : null}
            <div className="std-profile-comp__skills">
              {isEdit
                ? tmpDataSkill.map((item, index) => (
                  <SkillCard key={index} data={item} onClick={() => handleDataSkill(item)} />
                ))
                : null}
              {isEdit
                ? tmpDesignSkill.map((item, index) => (
                  <SkillCard key={index} data={item} onClick={() => handleDesignSkill(item)} />
                ))
                : null}
              {isEdit
                ? tmpDevSkill.map((item, index) => (
                  <SkillCard key={index} data={item} onClick={() => handleDevSkill(item)} />
                ))
                : null}
              {isEdit
                ? tmpMarketSkill.map(
                  (item, index) => <SkillCard key={index} data={item} onClick={() => handleMarketSkill(item)} />
                )
                : null}
              {isEdit
                ? tmpNoCodeSkill.map((item, index) => (
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
    </div>
  )
}

export default StudentProfileCompetence
