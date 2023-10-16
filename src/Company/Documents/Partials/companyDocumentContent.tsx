import React, { useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'

import DropZone from '../../../Component/DropZone'
import BaseButton from '../../../Component/BaseButton'

import '../../../CSS/BaseButton.scss'
import '../../../CSS/StudentDocumentContent.scss'

interface DocumentProps {
  isSet: boolean
  label: string
  data: any
  handleReset: () => void
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void
  handleFileChange?: (value: any) => void
}

const Document: React.FC<DocumentProps> = ({ isSet, label, data, handleReset, handleChange, handleFileChange }) => {
  if (isSet) {
    return (
      <div className='std-document-card__line'>
        Vous avez bien renseigné votre {label}
        <div className='std-document-card__button'>
          <button className='base-button__little' onClick={handleReset}>
            Remplacer
          </button>
        </div>
      </div>
    )
  }

  if (handleChange != null) {
    return (
      <div className='std-document-card__textfield-container'>
        Veuillez renseigner votre {label}
        <TextField onChange={handleChange} id={label.toLowerCase()} label={label} variant="standard" />
      </div>
    )
  }

  return (
    <div className='std-document-card__dropzone'>
      <p>Veuillez renseigner votre {label}:</p>
      { data.length > 0 ? <div className='std-document-card__dropzone-filename'> { data[0].path } </div> : <DropZone onObjectChange={handleFileChange}/> }
    </div>
  )
}

function CompanyDocumentContent (): JSX.Element {
  const { t } = useTranslation()

  const [cniFile, setCniFile] = useState<any>([])
  const [kbisFile, setKbisFile] = useState<any>([])
  const [siret, setSiret] = useState('')

  const handleSiretChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSiret(event.target.value)
  }

  const resetSiret = (): void => {
    setSiret('')
  }

  const resetCniFile = (): void => {
    setCniFile([])
  }

  const resetKbisFile = (): void => {
    setKbisFile([])
  }

  const postFile = (): any => {
    // TODO: Faire une query axios pour post les documents.

    const documentsDto = {
      siret,
      cni: cniFile,
      kbis: kbisFile
    }

    return documentsDto
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <h2 className='std-document-card__title'> { t('student.dashboard.doc') } </h2>
        <div className='std-document-card__content'>
          <Document isSet={siret !== ''} label="SIRET" data={siret} handleReset={resetSiret} handleChange={handleSiretChange} />
          <Document isSet={cniFile.length > 0} label="CNI" data={cniFile} handleReset={resetCniFile} handleFileChange={setCniFile} />
          <Document isSet={kbisFile.length > 0} label="KBIS" data={kbisFile} handleReset={resetKbisFile} handleFileChange={setKbisFile} />

          { cniFile.length === 0 && siret === '' && kbisFile.length === 0
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
