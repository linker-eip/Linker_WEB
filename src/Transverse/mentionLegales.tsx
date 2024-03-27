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
          1. Éditeur du Site:
        </div>
        <div className='mention-legales__section'>
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
        <div className='mention-legales__subtitle'>
          2. Directeur de la Publication:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> Nom du directeur de la publication: Jeremy Calvo </div>
          <div className='mention-legales__duo-text'>
            <div className='mention-legales__text'> Contact: </div>
            <div className='mention-legales__text-colored'> jeremy.calvo@epitech.eu </div>
          </div>
        </div>
        <div className='mention-legales__subtitle'>
          3. Hébergement:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> {'Nom de l\'hébergeur: Non défini'} </div>
          <div className='mention-legales__text'> Adresse : Non définie </div>
          <div className='mention-legales__text'> Numéro de téléphone : Non défini </div>
        </div>
        <div className='mention-legales__subtitle'>
          4. Propriété Intellectuelle:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> {'Le site et son contenu (textes, images, vidéos, etc.) sont la propriété exclusive de Linker.'} </div>
          <div className='mention-legales__text'> Toute reproduction ou utilisation sans autorisation préalable est strictement interdite. </div>
        </div>
        <div className='mention-legales__subtitle'>
          5. Collecte de Données Personnelles:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> {'Linker collecte des données personnelles dans le respect de la législation en vigueur.'} </div>
          <div className='mention-legales__text'> {'Pour plus d\'informations sur la collecte, le traitement et la protection de vos données, veuillez consulter notre Politique de Confidentialité.'} </div>
        </div>
        <div className='mention-legales__subtitle'>
          6. Cookies:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> {'Le site utilise des cookies. Pour en savoir plus sur l\'utilisation des cookies et la manière de les gérer, veuillez consulter notre Politique de Cookies.'} </div>
        </div>
        <div className='mention-legales__subtitle'>
          7. Responsabilité:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> {'Linker ne peut être tenu responsable de tout dommage direct ou indirect résultant de l\'utilisation du site.'} </div>
        </div>
        <div className='mention-legales__subtitle'>
          8. Liens Externes:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> {'Le site peut contenir des liens vers des sites externes. Linker n\'est pas responsable du contenu de ces sites.'} </div>
        </div>
        <div className='mention-legales__subtitle'>
          9. Droit Applicable et Juridiction :
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__text'> {'Les présentes mentions légales sont régies par le droit applicable à votre juridiction.'} </div>
          <div className='mention-legales__text'> {'En cas de litige, les tribunaux compétents sont ceux de Marseille.'} </div>
        </div>
        <div className='mention-legales__subtitle'>
          10. Contact:
        </div>
        <div className='mention-legales__section'>
          <div className='mention-legales__duo-text'>
            <div className='mention-legales__text'> {'Pour toute question ou demande d\'information concernant les mentions légales, veuillez nous contacter à l\'adresse suivante:'} </div>
            <div className='mention-legales__text-colored'> {'contact@linker-app.fr.'} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentionLegales