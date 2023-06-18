import React, { useState, type ChangeEvent } from 'react'
import '../../../../CSS/BaseButton.scss'
import '../../../../CSS/StudentDocumentContent.scss'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import DropZone from '../../../../Component/DropZone'
import BaseButton from '../../../../Component/BaseButton'

function StudentDocuentContent (): JSX.Element {
  const { t } = useTranslation()
  // faire une query ici pour recupérer les documents renseigner
  const [data, setData] = useState({
    cni: false,
    siren: false,
    urssaf: false,
    rib: false
  })

  const [cniFile, setcniFile] = useState<any>([])
  const [urssafFile, setUrssafFile] = useState<any>([])
  const [siren, setSiren] = useState('')
  const [rib, setRib] = useState('')

  const handleSirenChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSiren(event.target.value)
  }

  const handleRibChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRib(event.target.value)
  }

  const handleCniFile = (value: any): any => {
    setcniFile(value)
  }

  const handleUrssafFile = (value: any): any => {
    setUrssafFile(value)
  }

  const postFile = (): any => {
    // faire une query axios pour post les documents

    const documentsDto = {
      rib,
      siren,
      cni: cniFile,
      urssaf: urssafFile
    }

    setData({
      cni: true,
      siren: true,
      urssaf: true,
      rib: true
    })
    return documentsDto
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <h2 className='std-document-card__title'> { t('student.dashboard.doc') } </h2>
      <div className='std-document-card__content'>
        {
          data.cni
            ? <div> Vous avez bien renseigné votre cni. </div>
            : <div className='std-document-card__dropzone'>
              <p>Veuillez renseigner votre CNI:</p>
              { cniFile.length > 0 ? <div className='std-document-card__dropzone-filename'> { cniFile[0].path } </div> : <DropZone onObjectChange={handleCniFile}/> }
            </div>
        }
        {
          data.siren
            ? <div className='std-document-card__line'>
                Vous avez bien renseigné votre siren
                <div className='std-document-card__button'>
                  <button className='base-button__little'>
                    remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__textfield-container'>
                Veuillez renseigner votre siren
                <TextField onChange={handleSirenChange} id="siren" label="Siren" variant="standard" />
              </div>
        }
        {
          data.urssaf
            ? <div> Vous avez bien renseigné votre attestation de vigilence URSSAF </div>
            : <div className='std-document-card__dropzone'>
                <p>Veuillez renseigner votre attestation de vigilence URSSAF:</p>
                { urssafFile.length > 0 ? <div className='std-document-card__dropzone-filename'> { urssafFile[0].path } </div> : <DropZone onObjectChange={handleUrssafFile}/> }
              </div>
        }
        {
          data.rib
            ? <div className='std-document-card__line'>
                Vous avez bien renseigné votre RIB
                <div className='std-document-card__button'>
                  <button className='base-button__little'>
                    remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__textfield-container'>
                Veuillez renseigner votre RIB
                <TextField onChange={handleRibChange} id="rib" label="RIB" variant="standard" />
              </div>
        }
        { !data.cni && !data.siren && !data.rib && !data.urssaf
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

export default StudentDocuentContent
