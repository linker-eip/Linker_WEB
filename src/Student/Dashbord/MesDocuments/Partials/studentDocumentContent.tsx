import React from 'react'
import '../../../../CSS/BaseButton.scss'
import '../../../../CSS/StudentDocumentContent.scss'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'

function StudentDocuentContent (): JSX.Element {
  const { t } = useTranslation()
  // faire une query ici pour recupérer les documents renseigner
  const data = {
    cni: false,
    siren: false,
    urssaf: false,
    rib: false
  }

  return (
    <div className='std-document-content'>
      <div className='std-document-card'>
        <h2 className='std-document-card__title'> { t('student.dashboard.doc') } </h2>
      <div className='std-document-card__content'>
        {
          data.cni ? <div> Vous avez bien renseignez votre cni </div> : <div> Veuillez renseigner votre CNI </div>
        }
        {
          data.siren
            ? <div className='std-document-card__line'>
                Vous avez bien renseignez votre siren
                <div className='std-document-card__button'>
                  <button className='base-button__little'>
                    remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__textfield-container'>
                Veuillez renseigner votre siren
                <TextField id="siren" label="Siren" variant="standard" />
              </div>
        }
        {
          data.urssaf && <div> Vous avez bien renseignez votre attestation de vigilence URSSAF </div>
        }
        {
          data.rib
            ? <div className='std-document-card__line'>
                Vous avez bien renseignez votre RIB
                <div className='std-document-card__button'>
                  <button className='base-button__little'>
                    remplacer
                  </button>
                </div>
              </div>
            : <div className='std-document-card__textfield-container'>
                Veuillez renseigner votre RIB
                <TextField id="siren" label="RIB" variant="standard" />
              </div>
        }
        </div>
      </div>
    </div>
  )
}

export default StudentDocuentContent
