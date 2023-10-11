import React, { useState, type ChangeEvent } from 'react'
import '../../../../CSS/BaseButton.scss'
import '../../../../CSS/StudentDocumentContent.scss'
import { useTranslation } from 'react-i18next'
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
  const [siren, setSiren] = useState<any>([])
  const [rib, setRib] = useState<any>([])

  const downloadFile = (file: any): void => {
    const url = URL.createObjectURL(new Blob(file, { type: 'image/jpeg' }))
    const link = document.createElement('a')
    link.href = url
    link.download = file[0].path
    link.click()
  }

  const resetCni = (cni = data.cni, siren = data.siren, urssaf = data.urssaf, rib = data.rib): void => {
    setData({
      cni,
      siren,
      urssaf,
      rib
    })
  }

  const handleSirenChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSiren(event)
    setData({
      cni: data.cni,
      siren: true,
      urssaf: data.urssaf,
      rib: data.rib
    })
  }

  const handleRibChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRib(event)
    setData({
      cni: data.cni,
      siren: data.siren,
      urssaf: data.urssaf,
      rib: true
    })
  }

  const handleCniFile = (event: ChangeEvent<HTMLInputElement>): void => {
    setcniFile(event)
    setData({
      cni: true,
      siren: data.siren,
      urssaf: data.urssaf,
      rib: data.rib
    })
  }

  const handleUrssafFile = (event: ChangeEvent<HTMLInputElement>): void => {
    setUrssafFile(event)
    setData({
      cni: data.cni,
      siren: data.siren,
      urssaf: true,
      rib: data.rib
    })
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
            ? <div className='std-document-card__line'>
                <div>
                  Vous avez bien renseigné votre cni
                  { cniFile.length > 0 ? <div className='std-document-card__dropzone-filename' onClick={() => { downloadFile(cniFile) }}> { cniFile[0].path } </div> : '' }
                </div>
              <div className='std-document-card__button'>
              <button className='base-button__little' onClick={() => { resetCni(false) }}>
                remplacer
              </button>
            </div>
          </div>
            : <div className='std-document-card__dropzone'>
              <p>Veuillez renseigner votre CNI:</p>
              <DropZone onObjectChange={handleCniFile}/>
            </div>
        }
        {
          data.siren
            ? <div className='std-document-card__line'>
                <div>
                  Vous avez bien renseigné votre siren
                  { siren.length > 0 ? <div className='std-document-card__dropzone-filename' onClick={() => { downloadFile(siren) }}> { siren[0].path } </div> : '' }
                </div>
                <div className='std-document-card__button'>
                  <button className='base-button__little' onClick={() => { resetCni(data.cni, false) }}>
                    remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__dropzone'>
            <p>Veuillez renseigner votre siren:</p>
            <DropZone onObjectChange={handleSirenChange}/>
          </div>
        }
        {
          data.urssaf
            ? <div className='std-document-card__line'>
                <div>
                  Vous avez bien renseigné votre attestation de vigilence URSSAF
                  { urssafFile.length > 0 ? <div className='std-document-card__dropzone-filename' onClick={() => { downloadFile(urssafFile) }}> { urssafFile[0].path } </div> : '' }
                </div>
                <div className='std-document-card__button'>
                  <button className='base-button__little' onClick={() => { resetCni(data.cni, data.siren, false) }}>
                    remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__dropzone'>
                <p>Veuillez renseigner votre attestation de vigilence URSSAF:</p>
                  <DropZone onObjectChange={handleUrssafFile}/>
              </div>
        }
        {
          data.rib
            ? <div className='std-document-card__line'>
                <div>
                  Vous avez bien renseigné votre RIB
                  { rib.length > 0 ? <div className='std-document-card__dropzone-filename' onClick={() => { downloadFile(rib) }}> { rib[0].path } </div> : '' }
                </div>
                <div className='std-document-card__button'>
                  <button className='base-button__little' onClick={() => { resetCni(data.cni, data.siren, data.urssaf, false) }}>
                    remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__dropzone'>
              <p>Veuillez renseigner votre RIB:</p>
              <DropZone onObjectChange={handleRibChange}/>
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
