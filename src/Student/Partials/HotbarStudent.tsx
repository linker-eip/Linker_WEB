import React from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/Hotbar.scss'
import * as ROUTES from '../../Router/routes'

function HotbarStudent (): JSX.Element {
  return (
        <div className='hotbar-container'>
          <p className='hotbar-container__logo'> logo la ici a la base </p>
          <p className='hotbar-container__title'> Je suis un Étudiant</p>
          <Link to={ROUTES.LANDING_PAGE}>
            <button className='hotbar-container__button'> Retour </button>
          </Link>
        </div>
  )
}

export default HotbarStudent
