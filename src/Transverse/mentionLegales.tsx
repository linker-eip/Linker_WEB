import React from 'react'
import HotbarDashboard from '../Student/Dashbord/Partials/HotbarDashboard'
import '../CSS/MentionLegales.scss'

function MentionLegales (): JSX.Element {
  return (
    <div className='std-bord-container'>
      <HotbarDashboard hideName hideNotif> Mention Légales </HotbarDashboard>
      <div className='mention-legales'>
        <div className='mention-legales__title'>
          Mentions Légales
        </div>
        <div className='mention-legales__subtitle'>
          1. Éditeur du Site :
        </div>
        <div className='mention-legales__text'> {'Nom de l\'entreprise : Linker'} </div>
        <div className='mention-legales__text'> {'Forme juridique : Non défini'} </div>
        <div className='mention-legales__text'> {'Adresse du siège social : Epitech Paris'} </div>
        <div className='mention-legales__text'> {'Numéro de téléphone : +33 6 51 56 91 21'} </div>
        <div className='mention-legales__duo-text'>
          <div className='mention-legales__text'> {'Adresse e-mail:'} </div>
          <div className='mention-legales__text-colored'> {'contact@linker-app.fr'} </div>
        </div>
        <div className='mention-legales__text'> {'Numéro d\'identification : Non défini'} </div>
      </div>
    </div>
  )
}

export default MentionLegales
