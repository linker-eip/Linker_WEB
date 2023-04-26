import React from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/Hotbar.scss'
import * as ROUTES from '../../Router/routes'
import { useTranslation } from 'react-i18next'

function HotbarStudent (): JSX.Element {
  const { t } = useTranslation()
  return (
        <div className='hotbar-container'>
          <img src="/assets/logo.svg" alt='logo'></img>
          <p className='hotbar-container__title'>{t('title')}</p>
          <Link to={ROUTES.LANDING_PAGE}>
            <button className='hotbar-container__button'> {t('button')} </button>
          </Link>
        </div>
  )
}

export default HotbarStudent
