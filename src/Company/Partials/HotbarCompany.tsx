import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Styles.
import '../../CSS/Hotbar.scss'

// Constants.
import * as ROUTES from '../../Router/routes'

function HotbarCompany (): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className='hotbar-container'>
      <img src="/assets/logo.svg" alt="logo" className="hotbar-container__logo" />
      <p className='hotbar-container__title'>{t('company.title')}</p>
      <Link to={ROUTES.LANDING_PAGE} className='hotbar-container__link'>
        <button className='hotbar-container__button'>{t('button')}</button>
      </Link>
    </div>
  )
}

export default HotbarCompany
