import React, { useState, type ChangeEvent } from 'react'
import '../../../CSS/BaseButton.scss'
import '../../../CSS/StudentDocumentContent.scss'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import DropZone from '../../../Component/DropZone'
import BaseButton from '../../../Component/BaseButton'

function CompanyDocumentContent (): JSX.Element {
  const { t } = useTranslation()
  // faire une query ici pour recupérer les documents renseigner
  const [data, setData] = useState({
    cni: false,
    siret: false,
    kbis: false
  })

  const [cniFile, setcniFile] = useState<any>([])
  const [kbisFile, setKbisFile] = useState<any>([])
  const [siret, setSiret] = useState('')

  const handleSiretChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSiret(event.target.value)
  }

  const handleCniFile = (value: any): any => {
    setcniFile(value)
  }

  const handleKbisFile = (value: any): any => {
    setKbisFile(value)
  }

  const resetSiret = (): void => {
    setSiret('')
    setData(prevState => ({ ...prevState, siret: false }))
  }

  const resetCniFile = (): void => {
    setcniFile([])
    setData(prevState => ({ ...prevState, cni: false }))
  }

  const resetKbisFile = (): void => {
    setKbisFile([])
    setData(prevState => ({ ...prevState, kbis: false }))
  }

  const postFile = (): any => {
    // faire une query axios pour post les documents

    const documentsDto = {
      siret,
      cni: cniFile,
      kbis: kbisFile
    }

    setData({
      cni: true,
      siret: true,
      kbis: true
    })
    return documentsDto
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <h2 className='std-document-card__title'> { t('student.dashboard.doc') } </h2>
      <div className='std-document-card__content'>
        {
          data.siret
            ? <div className='std-document-card__line'>
                Vous avez bien renseigné votre SIRET
                <div className='std-document-card__button'>
                  <button className='base-button__little' onClick={resetSiret}>
                    Remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__textfield-container'>
                Veuillez renseigner votre SIRET
                <TextField onChange={handleSiretChange} id="siret" label="SIRET" variant="standard" />
              </div>
        }
        {
          data.cni
            ? <div className='std-document-card__line'>
            Vous avez bien renseigné votre CNI
            <div className='std-document-card__button'>
              <button className='base-button__little' onClick={resetCniFile}>
                Remplacer
              </button>
            </div>
          </div>
            : <div className='std-document-card__dropzone'>
              <p>Veuillez renseigner votre CNI:</p>
              { cniFile.length > 0 ? <div className='std-document-card__dropzone-filename'> { cniFile[0].path } </div> : <DropZone onObjectChange={handleCniFile}/> }
            </div>
        }
        {
          data.kbis
            ? <div className='std-document-card__line'>
            Vous avez bien renseigné votre extrait KBIS
            <div className='std-document-card__button' onClick={resetKbisFile}>
              <button className='base-button__little'>
                Remplacer
              </button>
            </div>
          </div>
            : <div className='std-document-card__dropzone'>
                <p>Veuillez renseigner votre extrait KBIS:</p>
                { kbisFile.length > 0 ? <div className='std-document-card__dropzone-filename'> { kbisFile[0].path } </div> : <DropZone onObjectChange={handleKbisFile}/> }
              </div>
        }
        { !data.cni && !data.siret && !data.kbis
          ? <div className='std-document-card__button'>
              <BaseButton onClick={postFile} title={t('validate')} />
            </div>
          : null
        }
        </div>
      </div>
    </div>
  )
}

export default CompanyDocumentContent
