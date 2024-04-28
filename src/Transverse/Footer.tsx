import React from 'react'
import '../CSS/Footer.scss'
import * as ROUTES from '../Router/routes'
import { useTranslation } from 'react-i18next'

function Footer (): JSX.Element {
  const { t } = useTranslation()

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const redirectToInstagram = (): void => {
    window.location.href = 'https://www.instagram.com/'
  }

  const redirectToTwitter = (): void => {
    window.location.href = 'https://twitter.com/'
  }

  const redirectToFacebook = (): void => {
    window.location.href = 'https://www.facebook.com/'
  }

  const redirectToLinkedIn = (): void => {
    window.location.href = 'https://www.linkedin.com/feed/'
  }

  return (
    <div className='footer'>
      <div className='footer__container'>
        <div className='footer__section'>
          <img src='/assets/linker_logo.svg' className='footer__logo' />
          <div className='footer__content'>
            <div className='footer__text-1'> {t('footer.need_help')} </div>
            <div className='footer__text-1'> {t('footer.contact')} </div>
          </div>
          <div className='footer__content'>
            <div className='footer__text-1'> {t('footer.networks')} </div>
            <div className='footer__row'>
              <img onClick={redirectToLinkedIn} className='footer__social' src='/assets/linkedin.svg' />
              <img onClick={redirectToFacebook} className='footer__social' src='/assets/facebook.svg' />
              <img onClick={redirectToInstagram} className='footer__social' src='/assets/instagram.svg' />
              <img onClick={redirectToTwitter} className='footer__social' src='/assets/twitter.svg' />
            </div>
          </div>
          <div className='footer__content'>
            <div className='footer__text-1'> {t('footer.download')}</div>
            <div className='footer__row'>
              <img className='footer__app' src='/assets/apple_app.svg' />
              <img className='footer__app' src='/assets/google_app.svg' />
            </div>
          </div>
          <div className='footer__content'>
            <div onClick={scrollToTop} className='footer__arrow'>
              <img className='footer__arrow-up' src='/assets/arrow_up.svg' />
            </div>
          </div>
        </div>
        <div className='footer__row'>
          <a href={ROUTES.MENTION_LEGALES} className='footer__link'>
            Mention legales
          </a>
          <div className='footer__text-2'>
            © 2023-2024, Linker
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
