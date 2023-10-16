import React, { useState, type ChangeEvent } from 'react'
import '../../../../CSS/BaseButton.scss'
import '../../../../CSS/StudentDocumentContent.scss'
import { useTranslation } from 'react-i18next'
import DropZone from '../../../../Component/DropZone'
import BaseButton from '../../../../Component/BaseButton'

type DocumentType = 'cni' | 'siren' | 'urssaf' | 'rib'

interface DocumentData {
  file: any[]
  isSet: boolean
}

interface DocumentsState {
  cni: DocumentData
  siren: DocumentData
  urssaf: DocumentData
  rib: DocumentData
}

function StudentDocumentContent (): JSX.Element {
  const { t } = useTranslation()

  const initialDocumentsState: DocumentsState = {
    cni: { file: [], isSet: false },
    siren: { file: [], isSet: false },
    urssaf: { file: [], isSet: false },
    rib: { file: [], isSet: false }
  }

  const [documents, setDocuments] = useState<DocumentsState>(initialDocumentsState)

  const downloadFile = (file: any): void => {
    const url = URL.createObjectURL(new Blob(file, { type: 'image/jpeg' }))
    const link = document.createElement('a')
    link.href = url
    link.download = file[0].path
    link.click()
  }

  const handleDocumentChange = (type: DocumentType) => (event: ChangeEvent<HTMLInputElement>): void => {
    setDocuments(prev => ({
      ...prev,
      [type]: {
        file: event,
        isSet: true
      }
    }))
  }

  const postFile = (): any => {
    // faire une query axios pour post les documents
    const documentsDto = {
      rib: documents.rib.file,
      siren: documents.siren.file,
      cni: documents.cni.file,
      urssaf: documents.urssaf.file
    }

    setDocuments({
      cni: { ...documents.cni, isSet: true },
      siren: { ...documents.siren, isSet: true },
      urssaf: { ...documents.urssaf, isSet: true },
      rib: { ...documents.rib, isSet: true }
    })

    return documentsDto
  }

  const renderDocumentSection = (type: DocumentType, label: string): JSX.Element => {
    const documentData = documents[type]

    return (
      documentData.isSet
        ? <div className='std-document-card__line'>
            <div>
              {t(`Vous avez bien renseigné votre ${label}`)}
              {documentData.file.length > 0 &&
                <div className='std-document-card__dropzone-filename' onClick={() => { downloadFile(documentData.file) }}>
                  {documentData.file[0].path}
                </div>
              }
            </div>
            <div className='std-document-card__button'>
              <button className='base-button__little' onClick={() => { setDocuments({ ...documents, [type]: { ...documentData, isSet: false } }) }}>
                {t('remplacer')}
              </button>
            </div>
          </div>
        : <div className='std-document-card__dropzone'>
            <p>{t(`Veuillez renseigner votre ${label}:`)}</p>
            <DropZone onObjectChange={handleDocumentChange(type)} />
          </div>
    )
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <h2 className='std-document-card__title'>{t('student.dashboard.doc')}</h2>
        <div className='std-document-card__content'>
          {renderDocumentSection('cni', 'CNI')}
          {renderDocumentSection('siren', 'siren')}
          {renderDocumentSection('urssaf', 'attestation de vigilence URSSAF')}
          {renderDocumentSection('rib', 'RIB')}

          {Object.values(documents).every((doc: { isSet: boolean }) => !doc.isSet) &&
            <div className='std-document-card__button'>
              <BaseButton onClick={postFile} title={t('validate')} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default StudentDocumentContent
