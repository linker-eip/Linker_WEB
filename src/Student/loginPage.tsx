import React from 'react'
import HotbarStudent from './Partials/HotbarStudent'
import '../CSS/LoginPage.scss'
import { Link } from 'react-router-dom'
import * as ROUTES from '../Router/routes'

function LoginPage (): JSX.Element {
  return (
      <div className='login-page-container'>
        <HotbarStudent/>
        <div className='login-page-container__info'>
          <div className='login-page-container__title'>
            <p className='login-page-container__title--login'>Me connecter</p>
            <p className='login-page-container__title--sep'>ou</p>
            <Link to={ROUTES.REGISTER_PAGE} className='login-page-container__title--register'>
              <p >Créer un profil</p>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default LoginPage
